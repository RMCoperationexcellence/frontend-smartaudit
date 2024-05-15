import{r as i,S as U,g as R,a as w,s as z,c as h,u as N,b as M,_ as m,j as y,d as P,e as k,D as b}from"./index-DGcQd1Yb.js";function H(...e){return e.reduce((o,t)=>t==null?o:function(...a){o.apply(this,a),t.apply(this,a)},()=>{})}function J(e,o=166){let t;function n(...a){const l=()=>{e.apply(this,a)};clearTimeout(t),t=setTimeout(l,o)}return n.clear=()=>{clearTimeout(t)},n}function K(e,o){var t,n;return i.isValidElement(e)&&o.indexOf((t=e.type.muiName)!=null?t:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function V(e){return e&&e.ownerDocument||document}function Q(e){return V(e).defaultView||window}let I=0;function j(e){const[o,t]=i.useState(e),n=e||o;return i.useEffect(()=>{o==null&&(I+=1,t(`mui-${I}`))},[o]),n}const _=U.useId;function X(e){if(_!==void 0){const o=_();return e??o}return j(e)}function Y({controlled:e,default:o,name:t,state:n="value"}){const{current:a}=i.useRef(e!==void 0),[l,u]=i.useState(o),r=a?e:l,d=i.useCallback(s=>{a||u(s)},[]);return[r,d]}const C=e=>{let o;return e<1?o=5.11916*e**2:o=4.5*Math.log(e+1)+2,(o/100).toFixed(2)};function E(e){return R("MuiSvgIcon",e)}w("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const A=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],q=e=>{const{color:o,fontSize:t,classes:n}=e,a={root:["root",o!=="inherit"&&`color${h(o)}`,`fontSize${h(t)}`]};return k(a,E,n)},B=z("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.color!=="inherit"&&o[`color${h(t.color)}`],o[`fontSize${h(t.fontSize)}`]]}})(({theme:e,ownerState:o})=>{var t,n,a,l,u,r,d,s,v,c,f,g,p;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:o.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(a=e.transitions)==null||(a=a.duration)==null?void 0:a.shorter}),fontSize:{inherit:"inherit",small:((l=e.typography)==null||(u=l.pxToRem)==null?void 0:u.call(l,20))||"1.25rem",medium:((r=e.typography)==null||(d=r.pxToRem)==null?void 0:d.call(r,24))||"1.5rem",large:((s=e.typography)==null||(v=s.pxToRem)==null?void 0:v.call(s,35))||"2.1875rem"}[o.fontSize],color:(c=(f=(e.vars||e).palette)==null||(f=f[o.color])==null?void 0:f.main)!=null?c:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.disabled,inherit:void 0}[o.color]}}),S=i.forwardRef(function(o,t){const n=N({props:o,name:"MuiSvgIcon"}),{children:a,className:l,color:u="inherit",component:r="svg",fontSize:d="medium",htmlColor:s,inheritViewBox:v=!1,titleAccess:c,viewBox:f="0 0 24 24"}=n,g=M(n,A),p=i.isValidElement(a)&&a.type==="svg",$=m({},n,{color:u,component:r,fontSize:d,instanceFontSize:o.fontSize,inheritViewBox:v,viewBox:f,hasSvgAsChild:p}),x={};v||(x.viewBox=f);const T=q($);return y.jsxs(B,m({as:r,className:P(T.root,l),focusable:"false",color:s,"aria-hidden":c?void 0:!0,role:c?"img":void 0,ref:t},x,g,p&&a.props,{ownerState:$,children:[p?a.props.children:a,c?y.jsx("title",{children:c}):null]}))});S.muiName="SvgIcon";function Z(e,o){function t(n,a){return y.jsx(S,m({"data-testid":`${o}Icon`,ref:a},n,{children:e}))}return t.muiName=S.muiName,i.memo(i.forwardRef(t))}function D(e){return R("MuiPaper",e)}w("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const F=["className","component","elevation","square","variant"],L=e=>{const{square:o,elevation:t,variant:n,classes:a}=e,l={root:["root",n,!o&&"rounded",n==="elevation"&&`elevation${t}`]};return k(l,D,a)},W=z("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o[t.variant],!t.square&&o.rounded,t.variant==="elevation"&&o[`elevation${t.elevation}`]]}})(({theme:e,ownerState:o})=>{var t;return m({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!o.square&&{borderRadius:e.shape.borderRadius},o.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},o.variant==="elevation"&&m({boxShadow:(e.vars||e).shadows[o.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${b("#fff",C(o.elevation))}, ${b("#fff",C(o.elevation))})`},e.vars&&{backgroundImage:(t=e.vars.overlays)==null?void 0:t[o.elevation]}))}),O=i.forwardRef(function(o,t){const n=N({props:o,name:"MuiPaper"}),{className:a,component:l="div",elevation:u=1,square:r=!1,variant:d="elevation"}=n,s=M(n,F),v=m({},n,{component:l,elevation:u,square:r,variant:d}),c=L(v);return y.jsx(W,m({as:l,ownerState:v,className:P(c.root,a),ref:t},s))});export{O as P,Q as a,H as b,Z as c,J as d,Y as e,K as i,V as o,X as u};
