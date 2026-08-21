import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '@services/apiClient.js';
import { ROUTES } from '@config/routes.js';

const MODULES={
  bookings:{title:'Visit calendar',intro:'Every property visit, confirmation and reschedule in one timeline.',endpoint:'/bookings'},
  messages:{title:'Conversations',intro:'Secure property conversations with buyers, owners and agents.',endpoint:'/conversations'},
  offers:{title:'Offer room',intro:'Track negotiations from first offer to acceptance.',endpoint:'/offers'},
  documents:{title:'Document vault',intro:'Property documents and verification status.',endpoint:'/documents'},
  notifications:{title:'Activity centre',intro:'The latest changes across your workspace.',endpoint:'/notifications'},
  admin:{title:'Platform intelligence',intro:'Live marketplace performance and governance signals.',endpoint:'/admin/analytics'},
  projects:{title:'Project inventory',intro:'Development projects, unit mix and availability.',endpoint:'/projects'},
  leads:{title:'Lead pipeline',intro:'Qualified prospects, follow-ups and deal stages.',endpoint:'/leads'},
  leases:{title:'Lease operations',intro:'Tenancies, rent terms and upcoming renewals.',endpoint:'/leases'},
  maintenance:{title:'Maintenance queue',intro:'Operational tickets from open request to resolution.',endpoint:'/maintenance'},
};
const value=(item,key)=>{if(key==='bookings')return `${item.propertyId?.title||'Property visit'} · ${new Date(item.scheduledFor).toLocaleString()}`;if(key==='messages')return `${item.propertyId?.title||'Conversation'} · ${item.messages?.at(-1)?.body||'No messages'}`;if(key==='offers')return `${item.propertyId?.title||'Property'} · ${item.currency} ${Number(item.amount).toLocaleString('en-IN')}`;if(key==='documents')return `${item.name} · ${item.category}`;if(key==='notifications')return item.body;if(key==='projects')return `${item.city}, ${item.locality} · ${item.units?.length||0} units`;if(key==='leads')return `${item.email||item.phone||'No contact'} · score ${item.score}`;if(key==='leases')return `${item.propertyId?.title||'Property'} · ₹${Number(item.monthlyRent).toLocaleString('en-IN')}/month`;if(key==='maintenance')return `${item.priority} priority · ${item.propertyId?.title||'Property'}`;return null;};

export function WorkspacePage({ moduleKey }) {
  const module=MODULES[moduleKey];const[data,setData]=useState(null);const[error,setError]=useState('');
  useEffect(()=>{let active=true;setData(null);apiClient(module.endpoint).then(payload=>{if(active)setData(payload.data);}).catch(requestError=>{if(active)setError(requestError.message);});return()=>{active=false;};},[module.endpoint]);
  const items=useMemo(()=>Array.isArray(data)?data:[],[data]);
  return <main className="workspace-page"><header><div><p className="arbor-label">Authenticated module</p><h1>{module.title}</h1><p>{module.intro}</p></div><Link to={ROUTES.DASHBOARD}>← Dashboard</Link></header>
    {error&&<p className="workspace-error" role="alert">{error}</p>}
    {data===null&&!error&&<p className="workspace-empty">Loading live workspace…</p>}
    {moduleKey==='admin'&&data&&<section className="workspace-admin">{Object.entries(data).filter(([,entry])=>typeof entry!=='object').map(([key,entry])=><article key={key}><small>{key.replaceAll(/([A-Z])/g,' $1')}</small><strong>{typeof entry==='number'?entry.toLocaleString('en-IN'):entry}</strong></article>)}</section>}
    {data!==null&&moduleKey!=='admin'&&<section className="workspace-list">{items.length?items.map((item,index)=><article key={item._id||index}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{item.title||item.status||module.title}</h2><p>{value(item,moduleKey)}</p></div><small>{item.status||(item.readAt?'Read':'Active')}</small></article>):<p className="workspace-empty">No activity yet. New records will appear here automatically.</p>}</section>}
  </main>;
}
