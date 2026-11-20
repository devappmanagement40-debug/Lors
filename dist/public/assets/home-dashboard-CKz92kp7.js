import{a as z,u as D,r as g,c as F,j as e,D as T,m as E,s as _,n as I,p as B,q as u,o as A,w,h as L}from"./index-DlA0O5zH.js";import{u as O}from"./useMutation-DgBY07vS.js";import{a as S}from"./countries-BOdUi1TA.js";/* empty css                            */const P="/assets/IMG_48242f4b-4e3a-41ca-b657-a4eb22c8ed4c_1795172039329-NWzzGi46.jpg",W=[{id:"demo-1",phone:"991****845",kind:"Withdraw",amount:5e3},{id:"demo-2",phone:"994****643",kind:"Withdraw",amount:6e3},{id:"demo-3",phone:"939****364",kind:"Withdraw",amount:5100},{id:"demo-4",phone:"921****362",kind:"Recharge",amount:4e4},{id:"demo-5",phone:"939****364",kind:"Recharge",amount:15e3},{id:"demo-6",phone:"975****451",kind:"Withdraw",amount:33400},{id:"demo-7",phone:"919****844",kind:"Recharge",amount:15e3},{id:"demo-8",phone:"981****014",kind:"Withdraw",amount:5e3},{id:"demo-9",phone:"917****945",kind:"Recharge",amount:4e4}];function j(o){const s=Number(o??0);return Number.isFinite(s)?s:0}function k(o){return o.toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2})}function N(o){const s=S(0,o).replace(/[\d.,\s]/g,"")||"FCFA";return/^(XOF|XAF|FCFA)$/i.test(s)?"FCFA":s}function Y(o){return`${o.toLocaleString("fr-FR",{maximumFractionDigits:0})} CDF`}const M=68,x=8,X="scotgold-wheel-button-position";function C(){const o=Math.min(window.innerWidth,512),s=Math.round((window.innerWidth-o)/2);return{minLeft:s+x,maxLeft:Math.max(s+x,s+o-M-x),minTop:x,maxTop:Math.max(x,window.innerHeight-M-68-28)}}function f(o){const s=C();return{left:Math.min(s.maxLeft,Math.max(s.minLeft,o.left)),top:Math.min(s.maxTop,Math.max(s.minTop,o.top))}}function q(o){const s=C(),r={left:s.maxLeft,top:s.maxTop};try{const d=localStorage.getItem(o);if(!d)return r;const l=JSON.parse(d);return typeof l.left!="number"||typeof l.top!="number"?r:f({left:l.left,top:l.top})}catch{return r}}function U({storageKey:o,onOpen:s}){const[r,d]=g.useState(()=>q(o)),l=g.useRef(null),p=g.useRef(!1);g.useEffect(()=>{const t=()=>d(a=>f(a));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const h=t=>{d(t);try{localStorage.setItem(o,JSON.stringify(t))}catch{}},c=t=>{!t.isPrimary||t.pointerType==="mouse"&&t.button!==0||(p.current=!1,l.current={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,startLeft:t.currentTarget.getBoundingClientRect().left,startTop:t.currentTarget.getBoundingClientRect().top,moved:!1},t.currentTarget.setPointerCapture(t.pointerId))},m=t=>{const a=l.current;if(!a||a.pointerId!==t.pointerId)return;const i=t.clientX-a.startX,n=t.clientY-a.startY;!a.moved&&Math.hypot(i,n)<6||(a.moved=!0,d(f({left:a.startLeft+i,top:a.startTop+n})))},b=(t,a=!1)=>{const i=l.current;if(!i||i.pointerId!==t.pointerId)return;const n=t.clientX-i.startX,y=t.clientY-i.startY;if(i.moved||Math.hypot(n,y)>=6){const R=f({left:i.startLeft+n,top:i.startTop+y});h(R),p.current=!a}l.current=null},v=t=>{const a=t.shiftKey?32:16,n={ArrowLeft:{left:-a,top:0},ArrowRight:{left:a,top:0},ArrowUp:{left:0,top:-a},ArrowDown:{left:0,top:a}}[t.key];n&&(t.preventDefault(),h(f({left:r.left+n.left,top:r.top+n.top})))};return e.jsx("button",{type:"button",className:"scotgold-wheel-fab",style:{left:r.left,top:r.top},"aria-label":"Ouvrir la roue de la fortune. Faites glisser pour déplacer le bouton.",title:"Roue de la fortune — faites glisser pour déplacer","data-testid":"fortune-wheel-floating-button",onClick:()=>{if(p.current){p.current=!1;return}s()},onPointerDown:c,onPointerMove:m,onPointerUp:t=>b(t),onPointerCancel:t=>b(t,!0),onKeyDown:v,children:e.jsx("img",{src:"/scotgold-home/fortune-wheel-floating-icon.png",alt:"",draggable:!1})})}function Q(){const{user:o,refreshUser:s}=z(),[,r]=D(),[d,l]=g.useState(!1),[p,h]=g.useState(null),c=F({queryKey:["/api/daily-checkin/status"],enabled:d&&!!o,staleTime:0}),m=O({mutationFn:async()=>(await L("POST","/api/daily-checkin/claim",{})).json(),onSuccess:i=>{h(`Votre bonus de ${i.amount} ${N(o?.country||"")} a été crédité sur votre solde.`),s(),w.invalidateQueries({queryKey:["/api/daily-checkin/status"]}),w.invalidateQueries({queryKey:["/api/transactions"]})},onError:i=>{h(i.status===409?"Vous avez déjà récupéré votre bonus pour aujourd'hui. Revenez demain.":i.message||"Impossible de récupérer le bonus. Réessayez."),w.invalidateQueries({queryKey:["/api/daily-checkin/status"]})}});if(g.useEffect(()=>{if(!o)return;const i=window.setInterval(()=>{s()},6e4);return()=>window.clearInterval(i)},[o?.id,s]),!o)return null;const b=o.country,v=j(o.balance),t=j(o.totalEarnings),a=N(b);return e.jsxs("main",{className:"scotgold-home-page",children:[e.jsxs("div",{className:"scotgold-home-screen",children:[e.jsxs("header",{className:"scotgold-home-intro","aria-label":"Scotgold Resources Ltd.",children:[e.jsx("img",{className:"scotgold-home-gold-background",src:P,alt:"","aria-hidden":"true"}),e.jsxs("svg",{className:"scotgold-home-streaks",viewBox:"0 0 512 342",preserveAspectRatio:"none","aria-hidden":"true",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"scotgold-streak",x1:"0",x2:"0",y1:"0",y2:"1",children:[e.jsx("stop",{offset:"0",stopColor:"#c89c52",stopOpacity:".38"}),e.jsx("stop",{offset:"1",stopColor:"#c89c52",stopOpacity:"0"})]}),e.jsx("filter",{id:"scotgold-glow",x:"-100%",y:"-5%",width:"300%",height:"120%",children:e.jsx("feGaussianBlur",{stdDeviation:"1.2"})})]}),e.jsxs("g",{stroke:"url(#scotgold-streak)",strokeWidth:"1",children:[e.jsx("path",{d:"M244 0v102"}),e.jsx("path",{d:"M258 0v141"}),e.jsx("path",{d:"M274 0v68"}),e.jsx("path",{d:"M294 0v39"}),e.jsx("path",{d:"M341 0v108"}),e.jsx("path",{d:"M357 0v181"}),e.jsx("path",{d:"M374 0v47"}),e.jsx("path",{d:"M391 0v107"}),e.jsx("path",{d:"M418 0v224"}),e.jsx("path",{d:"M444 0v93"}),e.jsx("path",{d:"M468 0v55"})]}),e.jsxs("g",{stroke:"#e5c27d",strokeOpacity:".28",strokeWidth:"2",filter:"url(#scotgold-glow)",children:[e.jsx("path",{d:"M258 0v141"}),e.jsx("path",{d:"M357 0v181"}),e.jsx("path",{d:"M418 0v224"})]})]}),e.jsx("img",{className:"scotgold-home-wordmark",src:"/scotgold-home/wordmark.png",alt:"Scotgold Resources Ltd."})]}),e.jsxs("div",{className:"scotgold-home-content",children:[e.jsxs("section",{className:"scotgold-balance-card","aria-label":"Solde et revenus",children:[e.jsx("svg",{className:"scotgold-balance-lines",viewBox:"0 0 478 163",preserveAspectRatio:"none","aria-hidden":"true",children:e.jsxs("g",{fill:"none",stroke:"#fff4ca",strokeOpacity:".22",strokeWidth:"1",children:[e.jsx("path",{d:"M-20 145C76 105 96 53 173 15s114-49 180-27 76 19 145-5"}),e.jsx("path",{d:"M-14 161C91 119 107 77 190 31s111-46 174-23 85 17 140-5"}),e.jsx("path",{d:"M-18 125C72 91 101 31 166 7s118-36 185-16 92 26 154-1"}),e.jsx("path",{d:"M-22 101C82 71 108 26 183-2s124-14 185 2 91 19 138-3"}),e.jsx("path",{d:"M-24 85C71 57 100 20 176-8s123-8 192 12 93 12 140-7"}),e.jsx("path",{d:"M-20 153C73 114 106 89 186 73s143-18 216 3 74 23 108 18"}),e.jsx("path",{d:"M-18 142C81 112 110 101 188 86s143-16 213 5 78 24 113 21"}),e.jsx("path",{d:"M-22 133C74 106 106 114 188 98s143-13 216 7 78 26 112 25"}),e.jsx("path",{d:"M-24 119C81 99 113 121 190 109s143-10 216 10 78 23 110 25"}),e.jsx("path",{d:"M-21 109C78 93 113 128 192 120s144-6 217 14 75 20 106 24"}),e.jsx("path",{d:"M-12 157C102 137 146 145 221 130s123-7 191 12 84 16 104 19"})]})}),e.jsxs("div",{className:"scotgold-balance-column",children:[e.jsx("span",{className:"scotgold-currency",children:a}),e.jsx("strong",{className:"scotgold-balance-value",children:k(v)}),e.jsxs("span",{className:"scotgold-balance-label",children:[e.jsx("img",{src:"/scotgold-home/assets.png",alt:""}),"Solde"]})]}),e.jsxs("div",{className:"scotgold-balance-column",children:[e.jsx("span",{className:"scotgold-currency",children:a}),e.jsx("strong",{className:"scotgold-balance-value",children:k(t)}),e.jsxs("span",{className:"scotgold-balance-label",children:[e.jsx("img",{src:"/scotgold-home/income.png",alt:""}),"Mes revenus"]})]})]}),e.jsxs("section",{className:"scotgold-quick-actions","aria-label":"Actions rapides",children:[e.jsxs("button",{type:"button",className:"scotgold-action",onClick:()=>r("/deposit"),children:[e.jsx("img",{src:"/scotgold-home/recharge.png",alt:""}),e.jsx("span",{children:"Recharger"})]}),e.jsxs("button",{type:"button",className:"scotgold-action",onClick:()=>r("/withdrawal"),children:[e.jsx("img",{src:"/scotgold-home/withdraw.png",alt:""}),e.jsx("span",{children:"Retrait"})]}),e.jsxs("button",{type:"button",className:"scotgold-action","aria-haspopup":"dialog","aria-expanded":d,onClick:()=>{h(null),l(!0)},children:[e.jsx("img",{src:"/scotgold-home/checkin.png",alt:""}),e.jsx("span",{children:"Présence"})]}),e.jsxs("button",{type:"button",className:"scotgold-action",onClick:()=>r("/service"),children:[e.jsx("img",{src:"/scotgold-home/service.png",alt:""}),e.jsx("span",{children:"Service client"})]})]}),e.jsxs("section",{className:"scotgold-activity-panel","aria-label":"Exemples fictifs de transactions",children:[e.jsxs("h1",{className:"scotgold-activity-heading",children:[e.jsx("span",{"aria-hidden":"true"}),e.jsx("span",{children:"User Investment List"}),e.jsx("span",{className:"scotgold-activity-demo",children:"Du lourd"})]}),e.jsx("div",{className:"scotgold-activity-viewport",children:e.jsx("div",{className:"scotgold-activity-track",children:[0,1].map(i=>e.jsx("div",{className:"scotgold-activity-set","aria-hidden":i===1,children:W.map(n=>e.jsxs("div",{className:"scotgold-activity-row",children:[e.jsx("span",{className:"scotgold-activity-phone",children:n.phone}),e.jsx("span",{className:"scotgold-activity-type",children:n.kind}),e.jsx("span",{className:"scotgold-activity-amount",children:Y(n.amount)})]},`${i}-${n.id}`))},i))})})]})]})]}),e.jsx(U,{storageKey:X,onOpen:()=>r("/checkin")}),e.jsx(T,{open:d,onOpenChange:i=>{l(i),i&&h(null)},children:e.jsxs(E,{children:[e.jsx(_,{className:"fortune-wheel-modal-backdrop"}),e.jsxs(I,{className:"fortune-wheel-modal daily-checkin-bonus-modal","aria-labelledby":"daily-checkin-title","aria-describedby":"daily-checkin-message",style:{position:"fixed",zIndex:1001,top:"50%",left:"50%",transform:"translate(-50%, -50%)",outline:"none"},children:[e.jsxs("div",{className:"fortune-wheel-modal__content","aria-live":"polite",children:[e.jsx(B,{asChild:!0,children:e.jsx("h2",{id:"daily-checkin-title",children:"Bonus de connexion"})}),p?e.jsx(u,{id:"daily-checkin-message",className:"fortune-wheel-modal__message",children:p}):c.isFetching?e.jsx(u,{id:"daily-checkin-message",className:"fortune-wheel-modal__message",children:"Vérification de votre bonus…"}):c.isError?e.jsx(u,{id:"daily-checkin-message",className:"fortune-wheel-modal__message",children:"Impossible de vérifier votre bonus."}):c.data?.claimedToday?e.jsx(u,{id:"daily-checkin-message",className:"fortune-wheel-modal__message",children:"Vous avez déjà récupéré votre bonus pour aujourd'hui. Revenez demain."}):e.jsxs(e.Fragment,{children:[e.jsxs(u,{id:"daily-checkin-message",className:"fortune-wheel-modal__message",children:["Bonus de connexion disponible : 50 ",a,"."]}),e.jsx("p",{className:"fortune-wheel-modal__detail",children:"Vous pouvez récupérer ce bonus une fois par jour."})]})]}),e.jsx("div",{className:"fortune-wheel-modal__footer",children:c.isError&&!p?e.jsx("button",{type:"button",onClick:()=>{c.refetch()},autoFocus:!0,children:"RÉESSAYER"}):p||c.data?.claimedToday?e.jsx(A,{asChild:!0,children:e.jsx("button",{type:"button",autoFocus:!0,children:"D’ACCORD"})}):e.jsx("button",{type:"button",onClick:()=>m.mutate(),disabled:m.isPending||c.isFetching||!c.data,autoFocus:!c.isFetching,children:c.isFetching?"VÉRIFICATION…":m.isPending?"RÉCUPÉRATION…":`RÉCUPÉRER 50 ${a}`})})]})]})}),e.jsx("style",{children:`
        .scotgold-home-page,
        .scotgold-home-page *,
        .scotgold-home-page *::before,
        .scotgold-home-page *::after {
          box-sizing: border-box;
        }
        .scotgold-home-page {
          min-height: 100dvh;
          overflow-x: clip;
          background: #050506;
          color: #f3f3f3;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-tap-highlight-color: transparent;
        }
        .scotgold-home-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          padding-bottom: calc(92px + env(safe-area-inset-bottom, 0px));
          background: #050506;
        }
        .scotgold-home-intro {
          position: relative;
          height: min(66.8vw, 342px);
          min-height: 0;
          overflow: hidden;
          padding: min(7.4vw, 38px) min(3.3vw, 17px) 0;
          background: #050506;
        }
        .scotgold-home-gold-background {
          position: absolute;
          z-index: 0;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 48%;
          opacity: .62;
        }
        .scotgold-home-intro::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          content: "";
          background: linear-gradient(
            180deg,
            rgba(5, 5, 6, .38) 0%,
            rgba(5, 5, 6, .46) 42%,
            #050506 100%
          );
          pointer-events: none;
        }
        .scotgold-home-streaks {
          position: absolute;
          z-index: 2;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .scotgold-home-wordmark {
          position: relative;
          z-index: 3;
          display: block;
          width: min(38.3vw, 196px);
          height: min(13.1vw, 67px);
          object-fit: contain;
          background: #fff;
        }
        .scotgold-home-content {
          padding: 0 clamp(13px, 3.3vw, 17px);
        }
        .scotgold-balance-card {
          position: relative;
          display: grid;
          width: 100%;
          aspect-ratio: 2.94 / 1;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          overflow: hidden;
          border-radius: 14px;
          background: linear-gradient(107deg, #efc13d 0%, #ffd979 100%);
          color: #16130d;
          box-shadow: 0 2px 10px rgba(255, 206, 82, .08);
        }
        .scotgold-balance-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .scotgold-balance-column {
          position: relative;
          z-index: 1;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          padding: min(7.6vw, 39px) 0 0;
        }
        .scotgold-currency {
          font-size: 14px;
          font-weight: 400;
          line-height: 17px;
        }
        .scotgold-balance-value {
          margin-top: 18px;
          font-size: clamp(21px, 5.5vw, 28px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -.04em;
        }
        .scotgold-balance-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: clamp(13px, 3.2vw, 16px);
          line-height: 20px;
          white-space: nowrap;
        }
        .scotgold-balance-label img {
          display: block;
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .scotgold-quick-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px min(3.5vw, 18px);
          margin-top: 15px;
        }
        .scotgold-action {
          display: flex;
          min-width: 0;
          aspect-ratio: 1.83 / 1;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 9px;
          overflow: hidden;
          border: 0;
          border-radius: 14px;
          padding: 12px clamp(12px, 3vw, 15px) 10px;
          background: #242426;
          color: #e5cb68;
          cursor: pointer;
          font: inherit;
          text-align: left;
          transition: transform .14s ease, filter .14s ease;
        }
        .scotgold-action:nth-child(even) { background: #303033; }
        .scotgold-action img {
          display: block;
          width: min(13.3vw, 68px);
          height: min(13.3vw, 68px);
          flex: 0 0 auto;
          object-fit: contain;
        }
        .scotgold-action span {
          display: block;
          max-width: 100%;
          overflow: hidden;
          font-size: clamp(12px, 3.125vw, 16px);
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scotgold-action:hover { filter: brightness(1.06); }
        .scotgold-action:active { transform: scale(.985); }
        .scotgold-action:focus-visible {
          outline: 2px solid #f2d56f;
          outline-offset: 2px;
        }
        .scotgold-wheel-fab {
          position: fixed;
          z-index: 60;
          display: grid;
          width: 68px;
          height: 68px;
          place-items: center;
          overflow: hidden;
          border: 2px solid #e7c34f;
          border-radius: 50%;
          padding: 2px;
          background: #153b7a;
          box-shadow: 0 5px 18px rgba(0, 0, 0, .5), 0 0 0 3px rgba(231, 195, 79, .16);
          cursor: grab;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .scotgold-wheel-fab img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          pointer-events: none;
          animation: scotgold-wheel-fab-spin 6s linear infinite;
          transform-origin: center;
        }
        @keyframes scotgold-wheel-fab-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scotgold-wheel-fab img { animation: none; }
        }
        .scotgold-wheel-fab:active { cursor: grabbing; }
        .scotgold-wheel-fab:focus-visible {
          outline: 3px solid #fff2b8;
          outline-offset: 3px;
        }
        .scotgold-activity-panel {
          display: flex;
          height: clamp(300px, 76vw, 390px);
          flex-direction: column;
          overflow: hidden;
          margin-top: 15px;
          border-radius: 14px;
          background: #303033;
          color: #e6e6e6;
        }
        .scotgold-activity-heading {
          display: flex;
          min-height: 57px;
          flex: 0 0 57px;
          align-items: center;
          gap: 7px;
          margin: 0;
          border-bottom: 1px solid #4c4c4e;
          padding: 0 12px;
          color: #e8e8ea;
          font-size: clamp(16px, 3.9vw, 18px);
          font-weight: 500;
          line-height: 1.2;
        }
        .scotgold-activity-demo {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          border: 1px solid rgba(231, 198, 79, .55);
          border-radius: 999px;
          padding: 3px 7px;
          color: #e7c64f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .06em;
          line-height: 1;
          white-space: nowrap;
        }
        .scotgold-activity-heading > span:first-child {
          display: block;
          width: 5px;
          height: 16px;
          flex: 0 0 5px;
          border-radius: 3px;
          background: #e7c75f;
        }
        .scotgold-activity-heading > span:nth-child(2) {
          min-width: 0;
          flex: 1 1 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scotgold-activity-viewport {
          min-height: 0;
          flex: 1 1 auto;
          overflow: hidden;
          overscroll-behavior: contain;
        }
        .scotgold-activity-track {
          display: flex;
          flex-direction: column;
          animation: scotgold-activity-scroll 36s linear infinite;
          will-change: transform;
        }
        .scotgold-activity-set { flex: 0 0 auto; padding: 0 12px 4px; }
        .scotgold-activity-row {
          display: grid;
          height: 38px;
          min-height: 38px;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
          align-items: center;
          gap: 8px;
          color: #e0e0e2;
          font-size: 16px;
          line-height: 1.2;
        }
        .scotgold-activity-phone,
        .scotgold-activity-type {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scotgold-activity-amount {
          overflow: hidden;
          color: #e7c64f;
          font-size: 15px;
          text-align: right;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @keyframes scotgold-activity-scroll { to { transform: translateY(-50%); } }
        @media (max-width: 360px) {
          .scotgold-balance-column { padding-top: 18px; }
          .scotgold-balance-value { margin-top: 8px; }
          .scotgold-balance-label { margin-top: 5px; }
          .scotgold-balance-label img { width: 20px; height: 20px; }
          .scotgold-activity-row { font-size: 14px; }
          .scotgold-activity-amount { font-size: 13px; }
          .scotgold-activity-panel { height: clamp(280px, 76vw, 350px); }
          .scotgold-activity-heading { font-size: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scotgold-activity-viewport { overflow-y: auto; }
          .scotgold-activity-track { animation: none; }
          .scotgold-activity-set[aria-hidden="true"] { display: none; }
          .scotgold-home-page *, .scotgold-home-page *::before, .scotgold-home-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `})]})}export{Q as default};
