import{b as m,r as e}from"./chunks/index.d220c1a5.js";var l,f,u=m.exports;f=u.createRoot,l=u.hydrateRoot;const a=({value:t,name:r})=>t?e.exports.createElement("astro-slot",{name:r,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}}):null;a.shouldComponentUpdate=()=>!1;function x(t){for(const r in t)if(r.startsWith("__reactContainer"))return r}const h=t=>(r,n,{default:o,...p},{client:d})=>{if(!t.hasAttribute("ssr"))return;for(const[c,y]of Object.entries(p))n[c]=e.exports.createElement(a,{value:y,name:c});const s=e.exports.createElement(r,n,o!=null?e.exports.createElement(a,{value:o}):o),i=x(t);return i&&delete t[i],d==="only"?e.exports.startTransition(()=>{f(t).render(s)}):e.exports.startTransition(()=>{l(t,s)})};export{h as default};
