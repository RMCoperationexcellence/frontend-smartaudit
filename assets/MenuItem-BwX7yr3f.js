import{a as p,g as j,s as F,f as N,_ as n,D as d,r as c,u as P,b as G,j as C,d as I,e as _}from"./index-DGcQd1Yb.js";import{L as $}from"./Select-CfYx1lhb.js";import{c as D,d as E,u as S}from"./Button-Jide-vPS.js";const M=p("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),O=p("MuiListItemIcon",["root","alignItemsFlexStart"]),R=p("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function U(e){return j("MuiMenuItem",e)}const r=p("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),H=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],W=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.divider&&t.divider,!s.disableGutters&&t.gutters]},z=e=>{const{disabled:t,dense:s,divider:a,disableGutters:l,selected:u,classes:o}=e,i=_({root:["root",s&&"dense",t&&"disabled",!l&&"gutters",a&&"divider",u&&"selected"]},U,o);return n({},o,i)},A=F(D,{shouldForwardProp:e=>N(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:W})(({theme:e,ownerState:t})=>n({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${r.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${r.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${r.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${r.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${r.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${M.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${M.inset}`]:{marginLeft:52},[`& .${R.root}`]:{marginTop:0,marginBottom:0},[`& .${R.inset}`]:{paddingLeft:36},[`& .${O.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&n({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${O.root} svg`]:{fontSize:"1.25rem"}}))),K=c.forwardRef(function(t,s){const a=P({props:t,name:"MuiMenuItem"}),{autoFocus:l=!1,component:u="li",dense:o=!1,divider:f=!1,disableGutters:i=!1,focusVisibleClassName:k,role:L="menuitem",tabIndex:v,className:V}=a,w=G(a,H),m=c.useContext($),y=c.useMemo(()=>({dense:o||m.dense||!1,disableGutters:i}),[m.dense,o,i]),g=c.useRef(null);E(()=>{l&&g.current&&g.current.focus()},[l]);const B=n({},a,{dense:y.dense,divider:f,disableGutters:i}),b=z(a),T=S(g,s);let x;return a.disabled||(x=v!==void 0?v:-1),C.jsx($.Provider,{value:y,children:C.jsx(A,n({ref:T,role:L,tabIndex:x,component:u,focusVisibleClassName:I(b.focusVisible,k),className:I(b.root,V)},w,{ownerState:B,classes:b}))})});export{K as M};
