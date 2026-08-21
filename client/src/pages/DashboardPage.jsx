import { useAuth } from '../auth/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/routes.js';
import { apiClient } from '@services/apiClient.js';

const DATA = {
  BUYER:['Your property journey','Shortlists, visits and negotiations in one calm workspace.','Explore homes',['Saved homes','Upcoming visits','Active conversations']],
  SELLER:['Owner command centre','Manage listings, buyer interest and offers with full visibility.','Create listing',['Live listings','New inquiries','Open offers']],
  AGENT:['Agent deal desk','Move clients from first conversation to closed transaction.','Add property',['Active clients','Visits this week','Deal pipeline']],
  BUILDER:['Builder portfolio','Control projects, inventory, teams and demand across developments.','Add project',['Projects','Units available','Qualified leads']],
  PROPERTY_MANAGER:['Property operations','Keep occupancy, maintenance and tenant workflows moving.','Add property',['Managed units','Open tickets','Occupancy']],
  MODERATOR:['Trust & safety queue','Review listings and reports before they affect the marketplace.','Open review queue',['Pending review','Reports','Resolved today']],
  ADMIN:['Platform operations','Marketplace health, users and approvals from one control plane.','Review approvals',['Active users','Pending listings','Bookings today']],
  SUPER_ADMIN:['Executive control plane','System-wide governance, security and performance intelligence.','System health',['Platform users','Monthly volume','Incidents']],
};
const METRIC_KEYS={BUYER:['savedHomes','upcomingVisits','conversations'],SELLER:['listings','inquiries','activeOffers'],AGENT:['leads','upcomingVisits','activeOffers'],BUILDER:['projects','availableUnits','leads'],PROPERTY_MANAGER:['activeLeases','openTickets','upcomingVisits'],MODERATOR:['reviewQueue','unreadNotifications','documents'],ADMIN:['activeUsers','reviewQueue','upcomingVisits'],SUPER_ADMIN:['activeUsers','publishedListings','unreadNotifications']};
export function DashboardPage() {
  const { user, logout } = useAuth(); const data = DATA[user.role] || DATA.BUYER;
  const[summary,setSummary]=useState(null);
  useEffect(()=>{let active=true;apiClient('/dashboard/summary').then(payload=>active&&setSummary(payload.data)).catch(()=>active&&setSummary({}));return()=>{active=false;};},[]);
  const metricKeys=METRIC_KEYS[user.role]||METRIC_KEYS.BUYER;
  return <main className="role-dashboard">
    <header className="dashboard-hero"><div><p className="arbor-label">{user.role.replaceAll('_',' ')} workspace</p><h1>{data[0]}</h1><p>{data[1]}</p></div><div className="dashboard-identity"><span>{user.name?.[0]?.toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div><button type="button" onClick={logout}>Sign out</button></div></header>
    <section className="dashboard-next"><div><small>Recommended next action</small><strong>{data[2]}</strong></div><button type="button">Continue <span>↗</span></button></section>
    <section className="dashboard-metrics">{data[3].map((label,index)=><article key={label}><small>{label}</small><strong>{summary?.[metricKeys[index]]??'—'}</strong><i /></article>)}</section>
    <nav className="dashboard-module-nav" aria-label="Workspace modules"><Link to={ROUTES.BOOKINGS}>Bookings</Link><Link to={ROUTES.MESSAGES}>Messages</Link><Link to={ROUTES.OFFERS}>Offers</Link><Link to={ROUTES.DOCUMENTS}>Documents</Link><Link to={ROUTES.NOTIFICATIONS}>Notifications</Link>{['BUILDER','ADMIN','SUPER_ADMIN'].includes(user.role)&&<Link to={ROUTES.PROJECTS}>Projects</Link>}{['AGENT','BUILDER','ADMIN','SUPER_ADMIN'].includes(user.role)&&<Link to={ROUTES.LEADS}>Leads</Link>}{['PROPERTY_MANAGER','ADMIN','SUPER_ADMIN'].includes(user.role)&&<><Link to={ROUTES.LEASES}>Leases</Link><Link to={ROUTES.MAINTENANCE}>Maintenance</Link></>}{['ADMIN','SUPER_ADMIN'].includes(user.role)&&<Link to={ROUTES.ADMIN}>Admin intelligence</Link>}</nav>
    <section className="dashboard-sections">{[['Visit schedule',ROUTES.BOOKINGS],['Recent conversations',ROUTES.MESSAGES],['Offer performance',ROUTES.OFFERS]].map(([section,path],index)=><article key={section}><span>0{index+1}</span><h2>{section}</h2><p>Open the live module to manage current workspace activity.</p><Link to={path}>Open module →</Link></article>)}</section>
  </main>;
}
