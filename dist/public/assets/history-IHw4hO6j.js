import{a as S,r as M,c as p,g as q,j as r,L as B}from"./index-DlA0O5zH.js";import{u as P}from"./use-viewport-background-D92h2MsF.js";import{g as K}from"./countries-BOdUi1TA.js";import{E as O}from"./empty-state-CTDAEone.js";import{g as u}from"./transaction-order-number-CpffoTUi.js";import{w as Y}from"./home1_1793173083402-C5jEIYFo.js";import{C as H}from"./chevron-left-XRZLB2Wc.js";import{L as V}from"./loader-circle-DIRxpiAI.js";import{c as k}from"./createLucideIcon-aUr7ylgJ.js";const G=k("ArrowDownLeft",[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]]);const U=k("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]),j=e=>{const i=new Date(e);if(Number.isNaN(i.getTime()))return"Date indisponible";const a=n=>String(n).padStart(2,"0");return`${a(i.getDate())}-${a(i.getMonth()+1)}-${i.getFullYear()} ${a(i.getHours())}:${a(i.getMinutes())}:${a(i.getSeconds())}`},W=(e,i)=>{switch(e){case"completed":case"approved":return{label:i==="withdrawal"?"Transfert terminé":i==="deposit"?"Dépôt terminé":"Crédité",tone:"is-success"};case"rejected":case"failed":case"canceled":case"cancelled":return{label:i==="withdrawal"?"Transfert échoué":i==="deposit"?"Dépôt échoué":"Échec",tone:"is-failure"};case"processing":return{label:"En cours",tone:"is-pending"};default:return{label:"En attente",tone:"is-pending"}}},x=new Set(["signup_bonus","gift_code","checkin","check_in","daily_checkin","wheel_prize","wheel_product_prize"]),N=e=>{const i=e.type.toLowerCase(),a=e.description?.toLowerCase()||"";return x.has(i)?!0:i!=="bonus"&&i!=="daily_bonus"?!1:/inscription|quotidien|check.?in|pointage|connexion/.test(a)},X=e=>{const i=e.description?.trim()||"",a=i.toLowerCase();return/inscription/.test(a)||e.type==="signup_bonus"?"Bonus d'inscription":/cadeau/.test(a)||e.type==="gift_code"?"Code cadeau":/roue de la fortune/.test(a)||e.type==="wheel_prize"?"Gain de la roue de la fortune":e.type==="wheel_product_prize"?i||"Produit gagné à la roue":/quotidien|check.?in|pointage|connexion/.test(a)||x.has(e.type.toLowerCase())?"Récompenses de connexion":i||"Récompense"},Q=new Set(["earning","commission","deposit_commission"]),J=e=>Q.has(e.type.toLowerCase())||N(e),Z=e=>{switch(e.type.toLowerCase()){case"earning":return"Gains d’un produit";case"commission":case"deposit_commission":return"Commission de parrainage";case"purchase":return"Achat d’un produit";case"withdrawal_refund":return"Remboursement de retrait";case"deposit":return"Dépôt";default:return N(e)?X(e):"Mouvement du solde"}};function ee({entry:e,currency:i}){const a=m=>{const l=Number(m||0);return(Number.isFinite(l)?l:0).toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2})},n=e.status?W(e.status,e.kind):null,y=["approved","completed"].includes(e.status?.toLowerCase()||""),s=n&&!y?`${j(e.createdAt)} · ${n.label}`:j(e.createdAt),c=Math.abs(Number(e.amount)||0),d=e.direction==="negative"?"− ":e.direction==="positive"?"+ ":"",h=e.direction==="negative"?"débit":e.direction==="positive"?"crédit":"montant demandé",g=e.displayAmount||`${d}${a(c)} ${i}`;return r.jsxs("article",{className:"history-entry","data-testid":e.testId,"data-order-number":e.orderNumber,"aria-label":`${e.title}, ${s}, ${e.displayAmount||`${h} ${a(c)} ${i}`}, numéro de commande ${e.orderNumber}`,title:`Numéro de commande ${e.orderNumber}`,children:[r.jsx("span",{className:"history-entry-icon","aria-hidden":"true",children:e.icon==="income"?r.jsx(G,{size:24}):r.jsx(U,{size:24})}),r.jsxs("div",{className:"history-entry-copy",children:[r.jsx("strong",{className:"history-entry-title",children:e.title}),r.jsx("time",{className:"history-entry-date",children:s})]}),r.jsx("strong",{className:`history-entry-amount is-${e.direction}`,children:g})]})}function le(){P("#000");const{user:e}=S(),[i,a]=M.useState("all"),{data:n=[]}=p({queryKey:["/api/countries"]}),s=(e?K(e.country,n):null)?.currency||"FCFA",c=/^(XOF|XAF|FCFA)$/i.test(s)?"FCFA":s,d=q(e?.country||"",c),h=t=>{const o=Number(t);return(Number.isFinite(o)?o:0).toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2})},{data:g=[],isLoading:m,isError:l}=p({queryKey:["/api/deposits/history"],enabled:!!e&&i==="all"}),{data:A=[],isLoading:L,isError:C}=p({queryKey:["/api/withdrawals/history"],enabled:!!e&&i==="all"}),{data:$=[],isLoading:b,isError:w}=p({queryKey:["/api/transactions"],enabled:!!e});if(!e)return null;const R=[...g].sort((t,o)=>new Date(o.createdAt).getTime()-new Date(t.createdAt).getTime()),D=[...A].sort((t,o)=>new Date(o.createdAt).getTime()-new Date(t.createdAt).getTime()),v=$.filter(t=>!["deposit","withdrawal_refund"].includes(t.type.toLowerCase())).map(t=>{const o=Number(t.amount||0),f=t.type.toLowerCase();return{id:`transaction-${t.id}`,title:Z(t),createdAt:t.createdAt,amount:Math.abs(Number.isFinite(o)?o:0),direction:o<0?"negative":"positive",icon:o<0?"transfer":"income",orderNumber:u("earning",t.id),kind:"earning",isIncome:J(t),displayAmount:f==="wheel_product_prize"?"Produit attribué":void 0,testId:f==="bonus"||x.has(f)?`free-earning-item-${t.id}`:`transaction-item-${t.id}`}}),T=R.map(t=>{const o=["approved","completed"].includes(t.status.toLowerCase());return{id:`deposit-${t.id}`,title:o?"Dépôt":"Dépôt demandé",createdAt:t.createdAt,amount:t.amount,direction:o?"positive":"neutral",icon:"transfer",orderNumber:u("deposit",t.id),kind:"deposit",status:t.status,isIncome:!1,testId:`deposit-item-${t.id}`}}),_=D.map(t=>{const o=["rejected","failed","canceled","cancelled"].includes(t.status.toLowerCase());return{id:`withdrawal-${t.id}`,title:o?"Retrait remboursé":"Retrait",createdAt:t.createdAt,amount:t.amount,direction:o?"positive":"negative",icon:"transfer",orderNumber:u("withdrawal",t.id),kind:"withdrawal",status:t.status,isIncome:!1,testId:`withdrawal-item-${t.id}`}}),F=[...v,...T,..._].sort((t,o)=>new Date(o.createdAt).getTime()-new Date(t.createdAt).getTime()),z=i==="income"?v.filter(t=>t.isIncome):F,I=i==="all"?b||m||L:b,E=i==="all"?w||l||C:w;return r.jsxs("main",{className:"history-page",children:[r.jsx("style",{children:`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: clip;
          background: #fff;
          color: #171717;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #fff;
        }
        .history-header {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          height: 52px;
          align-items: center;
          padding: 0 18px;
          background: #24232f;
          color: #fff;
        }
        .history-back {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: #fff;
          cursor: pointer;
        }
        .history-back svg {
          width: 25px;
          height: 25px;
          stroke-width: 1.9;
        }
        .history-title {
          position: absolute;
          right: 48px;
          left: 48px;
          margin: 0;
          color: #fff;
          font-size: 22px;
          font-weight: 400;
          line-height: 1;
          text-align: center;
        }
        .history-balance-card {
          display: flex;
          height: clamp(180px, 41.2vw, 211px);
          flex-direction: column;
          margin: 32px 4% 38px;
          padding: 30px 20px 25px;
          border-radius: 20px;
          background: #24232f;
          color: #fff;
        }
        .history-balance-label {
          color: #d6d4dc;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.25;
        }
        .history-balance-grid {
          display: grid;
          flex: 1;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 12px;
          margin-top: 14px;
        }
        .history-balance-item {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        .history-balance-value {
          display: flex;
          align-items: baseline;
          justify-content: center;
          margin: 0;
          color: #fff;
          font-size: clamp(20px, 5.6vw, 30px);
          font-weight: 700;
          line-height: 1.1;
          overflow-wrap: anywhere;
          text-align: center;
        }
        .history-tabs {
          position: sticky;
          top: 52px;
          z-index: 40;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          align-items: center;
          min-height: 62px;
          margin: 0;
          padding: 9px 4%;
          border-bottom: 1px solid #eeeeef;
          background: #fff;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 10px;
          padding: 5px 6px;
          background: #f3f3f5;
          color: #5f5f64;
          font-size: clamp(11px, 2.8vw, 14px);
          font-weight: 600;
          line-height: 1.15;
          text-align: center;
          white-space: normal;
          cursor: pointer;
          transition: background-color .16s ease, color .16s ease, transform .12s ease;
        }
        .history-tab.active {
          background: #24232f;
          color: #fff;
          font-weight: 700;
        }
        .history-tab:active { transform: scale(.98); }
        .history-tab:focus-visible,
        .history-back:focus-visible {
          outline: 3px solid #c1c0c9;
          outline-offset: 2px;
        }
        .history-content {
          min-height: calc(100dvh - 390px);
          padding: 0 4% 40px;
        }
        .history-list {
          display: grid;
          gap: 0;
        }
        .reward-row {
          padding: 21px 0 18px;
          border-bottom: 1px solid #ededed;
          color: #111;
        }
        .reward-row-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .reward-row-title {
          max-width: 60%;
          color: #686868;
          font-size: clamp(18px, 4.2vw, 22px);
          font-weight: 700;
          line-height: 1.55;
        }
        .reward-row-date {
          flex: 0 0 auto;
          padding-top: 4px;
          color: #a1a1a1;
          font-size: clamp(12px, 3.1vw, 16px);
          line-height: 1.35;
          white-space: nowrap;
        }
        .reward-row-values {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 13px;
          color: #111;
          font-size: clamp(16px, 3.9vw, 20px);
          line-height: 1.35;
        }
        .reward-row-values strong,
        .reward-row-values span {
          font-weight: 700;
        }
        .history-card {
          width: 100%;
          border: 0;
          border-bottom: 1px solid #ededed;
          border-radius: 0;
          display: flex;
          min-height: 100px;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px 0;
          background: #fff;
          box-shadow: none;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #777;
          font-size: 14px;
          line-height: 1.35;
        }
        .history-row > span {
          min-width: 0;
          flex: 1;
        }
        .history-row strong {
          min-width: 0;
          max-width: 65%;
          color: #171717;
          font-size: 14px;
          font-weight: 600;
          text-align: right;
          overflow-wrap: anywhere;
        }
        .history-row-meta { color: #999; font-size: 13px; }
        .history-row-meta strong {
          color: #999;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
        }
        .history-row-main {
          color: #171717;
          font-size: 15px;
        }
        .history-row-main > span {
          color: #171717;
          font-weight: 500;
          overflow-wrap: anywhere;
        }
        .history-row .history-amount {
          color: #171717;
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
        }
        .history-row-reference,
        .history-row-fees {
          color: #777;
          font-size: 13px;
        }
        .history-row .history-value {
          color: #555;
          font-size: 13px;
          font-weight: 700;
        }
        .history-row .history-status {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          white-space: nowrap;
        }
        .history-status.is-success { color: #777; }
        .history-status.is-failure { color: #bc3434; }
        .history-status.is-pending { color: #9a6b0a; }
        .history-empty {
          display: flex;
          min-height: 300px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #768078;
          font-size: 14px;
        }
        .history-load-error {
          padding: 32px 16px;
          color: #9c3434;
          text-align: center;
          font-size: 14px;
        }
        @media (max-width: 370px) {
          .history-title { font-size: 17px; }
          .history-tabs { gap: 5px; padding-right: 3%; padding-left: 3%; }
          .history-tab { font-size: 11px; }
          .history-content { padding-right: 3%; padding-left: 3%; }
          .history-balance-card { margin-right: 3%; margin-left: 3%; padding-right: 14px; padding-left: 14px; }
          .history-balance-grid { gap: 14px; }
          .history-balance-label { font-size: 13px; }
          .history-balance-value { font-size: 18px; }
          .history-card { padding-right: 0; padding-left: 0; }
          .history-row { gap: 8px; font-size: 12px; }
          .history-row strong { font-size: 11px; }
          .history-row-meta,
          .history-row-meta strong { font-size: 10px; }
          .history-row .history-amount { font-size: 13px; }
          .history-row .history-value { font-size: 11px; }
          .reward-row-heading { gap: 6px; }
          .reward-row-title { max-width: 56%; font-size: 16px; }
          .reward-row-date { font-size: 10px; }
          .reward-row-values { font-size: 13px; }
        }

        .history-page {
          min-height: 100dvh;
          overflow-x: hidden;
          background: #000;
          color: #f2f1ee;
          font-family: Arial, sans-serif;
          -webkit-tap-highlight-color: transparent;
        }
        .history-screen {
          position: relative;
          isolation: isolate;
          width: min(100%, 432px);
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          background: #000;
        }
        .history-screen::before {
          position: absolute;
          z-index: 0;
          top: 0;
          right: 0;
          left: 0;
          height: 280px;
          background:
            repeating-linear-gradient(90deg, transparent 0 27px, rgba(231, 209, 170, .08) 28px 29px, transparent 30px 54px),
            repeating-linear-gradient(90deg, transparent 0 8px, rgba(231, 209, 170, .1) 9px, transparent 10px 17px),
            radial-gradient(ellipse at 76% 0%, rgba(124, 87, 41, .45), transparent 46%),
            linear-gradient(180deg, #171108 0%, #080705 73%, transparent 100%);
          pointer-events: none;
          content: "";
        }
        .history-screen > * {
          position: relative;
          z-index: 1;
        }
        .history-header {
          position: relative;
          top: auto;
          z-index: 1;
          display: flex;
          height: 64px;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: transparent;
          color: #f4f1eb;
        }
        .history-back {
          position: absolute;
          top: 0;
          left: 7px;
          display: grid;
          width: 40px;
          height: 100%;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: #f4f1eb;
          cursor: pointer;
        }
        .history-back svg {
          width: 26px;
          height: 26px;
          stroke-width: 1.8;
        }
        .history-title {
          position: absolute;
          top: 50%;
          right: 48px;
          left: 48px;
          margin: 0;
          transform: translateY(-50%);
          color: #f5f2eb;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.15;
          text-align: center;
        }
        .history-balance-card {
          display: flex;
          height: 105px;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          border: 0;
          border-radius: 10px;
          padding: 8px 14px;
          background: linear-gradient(105deg, #dfb432 0%, #ffdc79 100%);
          color: #18140d;
        }
        .history-balance-grid {
          display: flex;
          width: 100%;
          height: 100%;
          grid-template-columns: 1fr;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin: 0;
        }
        .history-balance-item {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-align: center;
        }
        .history-balance-value {
          display: block;
          margin: 0;
          color: #17130c;
          font-size: clamp(24px, 6vw, 28px);
          font-weight: 700;
          line-height: 1.1;
          overflow-wrap: anywhere;
          white-space: nowrap;
        }
        .history-balance-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #262014;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
        }
        .history-balance-label img {
          display: block;
          width: 18px;
          height: 18px;
          object-fit: contain;
        }
        .history-tabs {
          position: static;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          align-items: center;
          min-height: 0;
          margin: 14px 10px 0;
          padding: 0;
          border: 0;
          background: transparent;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          min-height: 45px;
          align-items: center;
          justify-content: center;
          border: 1px solid #393735;
          border-radius: 10px;
          padding: 0 8px;
          background: #000;
          color: #f0efed;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
          text-align: center;
          white-space: nowrap;
          cursor: pointer;
          transition: filter .14s ease, transform .12s ease, background-color .14s ease;
        }
        .history-tab.active {
          border-color: transparent;
          background: linear-gradient(105deg, #dfb432 0%, #ffdc79 100%);
          color: #17130c;
          font-weight: 500;
        }
        .history-tab:hover {
          filter: brightness(1.06);
        }
        .history-tab:active {
          transform: scale(.985);
        }
        .history-tab:focus-visible,
        .history-back:focus-visible {
          outline: 2px solid #f0d16c;
          outline-offset: 2px;
        }
        .history-content {
          min-height: calc(100dvh - 228px);
          padding: 14px 10px 36px;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .history-entry {
          display: flex;
          width: 100%;
          min-height: 80px;
          align-items: center;
          gap: 11px;
          overflow: hidden;
          border: 1px solid #363330;
          border-radius: 10px;
          padding: 12px 13px;
          background: linear-gradient(140deg, #222 0%, #1b1b1b 100%);
          box-shadow: 0 3px 9px rgba(0, 0, 0, .18);
        }
        .history-entry-icon {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          place-items: center;
          color: #e7c76f;
        }
        .history-entry-copy {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }
        .history-entry-title {
          overflow: hidden;
          color: #e6e5e3;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .history-entry-date {
          overflow: hidden;
          color: #979797;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .history-entry-amount {
          flex: 0 0 auto;
          color: #f2d47c;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
          text-align: right;
          white-space: nowrap;
        }
        .history-entry-amount.is-negative {
          color: #f2d47c;
        }
        .history-entry-amount.is-neutral {
          color: #d8d5cf;
        }
        .history-empty {
          display: flex;
          min-height: 240px;
          align-items: center;
          justify-content: flex-start;
          gap: 0;
          padding-top: 2px;
          color: #d2d0cd;
          font-size: 15px;
          text-align: center;
        }
        .history-empty .shared-empty-state-image {
          width: min(180px, 70%);
          height: 138px;
          opacity: .48;
        }
        .history-load-error {
          margin: 18px 0 0;
          color: #f2c4c4;
          text-align: center;
          font-size: 14px;
        }
        @media (max-width: 370px) {
          .history-title { font-size: 18px; }
          .history-tabs { gap: 8px; }
          .history-tab { min-height: 43px; font-size: 15px; }
          .history-content { padding-right: 9px; padding-left: 9px; }
          .history-entry { gap: 8px; padding-right: 10px; padding-left: 10px; }
          .history-entry-title { font-size: 14px; }
          .history-entry-date { font-size: 12px; }
          .history-entry-amount { font-size: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .history-tab { transition: none; }
        }
        .history-tabs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 45px;
          align-items: stretch;
        }
        .history-tabs > .history-tab {
          width: 100%;
          height: 45px;
          min-height: 45px;
          align-self: stretch;
          justify-self: stretch;
          margin: 0;
        }
        .history-tabs > .history-tab:not(.active) {
          border-color: #5a503b;
          background: #262626;
          color: #f2d47c;
        }
        .history-screen nav.history-tabs {
          position: relative !important;
          top: auto !important;
          z-index: 5 !important;
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        .history-screen nav.history-tabs > button.history-tab {
          display: flex !important;
          width: 100% !important;
          height: 45px !important;
          min-height: 45px !important;
          visibility: visible !important;
          opacity: 1 !important;
          border: 1px solid #5a503b !important;
          background: #262626 !important;
          color: #f2d47c !important;
          font-size: 16px !important;
        }
        .history-screen nav.history-tabs > button.history-tab.active {
          border-color: transparent !important;
          background: linear-gradient(105deg, #dfb432 0%, #ffdc79 100%) !important;
          color: #17130c !important;
          font-weight: 700 !important;
        }
      `}),r.jsxs("div",{className:"history-screen",children:[r.jsxs("header",{className:"history-header",children:[r.jsx(B,{href:"/account",children:r.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:r.jsx(H,{"aria-hidden":"true"})})}),r.jsx("h1",{className:"history-title",children:"Mon relevé"})]}),r.jsx("section",{className:"history-balance-card","aria-label":"Solde du compte",children:r.jsx("div",{className:"history-balance-grid",children:r.jsxs("div",{className:"history-balance-item",children:[r.jsxs("strong",{className:"history-balance-value",children:[h(e.balance||"0")," ",d]}),r.jsxs("span",{className:"history-balance-label",children:[r.jsx("img",{src:Y,alt:"","aria-hidden":"true"}),"Solde actuel"]})]})})}),r.jsxs("nav",{className:"history-tabs","aria-label":"Filtrer les mouvements",children:[r.jsx("button",{type:"button",className:`history-tab ${i==="all"?"active":""}`,onClick:()=>a("all"),"aria-pressed":i==="all","data-testid":"tab-all",children:"Tout"}),r.jsx("button",{type:"button",className:`history-tab ${i==="income"?"active":""}`,onClick:()=>a("income"),"aria-pressed":i==="income","data-testid":"tab-income",children:"Revenus"})]}),r.jsx("section",{className:"history-content","aria-live":"polite",children:I?r.jsx("div",{className:"history-empty",children:r.jsx(V,{className:"animate-spin"})}):E?r.jsx("p",{className:"history-load-error",children:"Impossible de charger cet historique. Réessayez plus tard."}):z.length>0?r.jsx("div",{className:"history-list",children:z.map(t=>r.jsx(ee,{entry:t,currency:d},t.id))}):r.jsx(O,{className:"history-empty",children:r.jsx("span",{children:"Aucun relevé pour le moment."})})})]})]})}export{le as default};
