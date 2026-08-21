/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient, setApiAccessToken } from '@services/apiClient.js';

const AuthContext=createContext(null);
export function AuthProvider({children}){
  const[user,setUser]=useState(null);const[loading,setLoading]=useState(true);
  const accept=useCallback((payload)=>{setApiAccessToken(payload.data.accessToken);setUser(payload.data.user);return payload.data.user;},[]);
  const refresh=useCallback(async()=>{try{return accept(await apiClient('/auth/refresh',{method:'POST'}));}catch{setApiAccessToken(null);setUser(null);return null;}},[accept]);
  useEffect(()=>{refresh().finally(()=>setLoading(false));},[refresh]);
  const login=useCallback(async(values)=>accept(await apiClient('/auth/login',{method:'POST',body:JSON.stringify(values)})),[accept]);
  const register=useCallback(async(values)=>accept(await apiClient('/auth/register',{method:'POST',body:JSON.stringify(values)})),[accept]);
  const logout=useCallback(async()=>{try{await apiClient('/auth/logout',{method:'POST'});}finally{setApiAccessToken(null);setUser(null);}},[]);
  const closeSession=useCallback(()=>{setApiAccessToken(null);setUser(null);},[]);
  const changePassword=useCallback(async(values)=>{const response=await apiClient('/auth/password',{method:'PATCH',body:JSON.stringify(values)});closeSession();return response;},[closeSession]);
  const logoutAll=useCallback(async()=>{try{return await apiClient('/auth/logout-all',{method:'POST'});}finally{closeSession();}},[closeSession]);
  const value=useMemo(()=>({user,loading,login,register,logout,logoutAll,changePassword,refresh}),[user,loading,login,register,logout,logoutAll,changePassword,refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>{const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value;};
