import{h as m,r as s,i as p,j as e}from"./index-DGcQd1Yb.js";import{M as d}from"./MainLayout-nclP9TnZ.js";import{T as u,B as f}from"./Button-Jide-vPS.js";import{S as x}from"./Select-CfYx1lhb.js";import{M as g}from"./MenuItem-BwX7yr3f.js";import"./ArrowBack-CVzw8aht.js";import"./Paper-Ceux5gxC.js";import"./Box-CxGi9oDE.js";const y="http://localhost:3001",P=async()=>{try{return(await m.get(`${y}/plantList`)).data}catch(a){throw console.error("Failed to fetch plant list:",a),a}};function E(){const[a,r]=s.useState([]),[n,o]=s.useState(""),i=p(),c=async()=>{try{const t=await P();r(t)}catch(t){console.error("Error fetching plants:",t)}};s.useEffect(()=>{c()},[]);const l=t=>{o(t.target.value)},h=async()=>{n&&(await localStorage.setItem("PLANT_NO",n),await i("/menu "))};return e.jsx(d,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"50px"},children:[e.jsx(u,{variant:"h4",children:"เลือกโรงงาน"}),e.jsx(x,{value:n,onChange:l,sx:{width:300,margin:2},children:a.map(t=>e.jsx(g,{value:t.PLANT_NO,children:t.NAME},t.PLANT_NO))}),n&&e.jsx(f,{onClick:h,sx:{width:225,margin:2},variant:"contained",children:"ยืนยัน"})]})})}export{E as default};
