import{a as Gt,b as Vt,f as Bt,u as Kt,r as s,c as F,g as Wt,j as e,H as _t,L as D,h as w}from"./index-DlA0O5zH.js";import{u as N}from"./useMutation-DgBY07vS.js";import{P as Ht,a as Xe}from"./phone-D2A0H9OW.js";import{w as Qt}from"./home1_1793173083402-C5jEIYFo.js";import{E as ye}from"./empty-state-CTDAEone.js";import{C as g}from"./chevron-left-XRZLB2Wc.js";import{c as we}from"./createLucideIcon-aUr7ylgJ.js";import{C as Yt}from"./chevron-down-Bpz9OTxF.js";import{L as f}from"./loader-circle-DIRxpiAI.js";import{X as Jt}from"./x-DiUNf1OM.js";import{C as Zt}from"./check-CPazE5om.js";import{P as X}from"./phone-PQtYqSyc.js";import{E as M,I as Xt,Z as er}from"./zap-Br3kjBgm.js";import{R as ee}from"./refresh-cw-CFRlHq9h.js";const te=we("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const tr=we("Earth",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",key:"1tzkfa"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"14pb5j"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);const rr=we("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),et="#367C2B",sr="#25591C",x=`linear-gradient(112deg, ${et} 0%, ${sr} 100%)`;function Pr(){const{user:p,refreshUser:re}=Gt(),{toast:i}=Vt(),I=Bt(),[,ve]=Kt(),je=s.useRef(null),[c,a]=s.useState("amount"),[d,tt]=s.useState(null),[nr,ar]=s.useState(null),[o,v]=s.useState(""),[j,Ne]=s.useState(""),[$,L]=s.useState(!1),rt=s.useRef(null),G=s.useRef(null),[se,Ce]=s.useState(p?.phone||""),[k,ke]=s.useState(""),[st,Se]=s.useState(""),[Pe,ze]=s.useState(""),[Ee,Me]=s.useState(""),[S,nt]=s.useState(p?.country||""),[ne,at]=s.useState(""),[b,O]=s.useState(null),[V,B]=s.useState(null),[ae,K]=s.useState(""),[it,ie]=s.useState(""),[oe,ce]=s.useState(""),[Ie,ot]=s.useState(""),[ir,ct]=s.useState(""),[lt,dt]=s.useState(""),[Le,R]=s.useState(""),[Oe,y]=s.useState(!1),[pt,ut]=s.useState(p?.country||""),[W,mt]=s.useState(""),[T,Re]=s.useState(""),[A,_]=s.useState(null),[le,Te]=s.useState(""),[de,Ae]=s.useState(""),[or,Ue]=s.useState(""),[xt,ht]=s.useState(""),[cr,H]=s.useState(""),[qe,U]=s.useState(!1),l=j,{data:Fe=[],isLoading:gt}=F({queryKey:["/api/countries"]}),ft=Fe.find(t=>t.code===l&&t.isActive),u=Wt(l,ft?.currency),{data:m}=F({queryKey:["/api/settings"]}),pe=parseInt(m?.minDeposit||"4000");m?.sendavapayEnabled,m?.sendavapayChannelName;const bt=m?.westpayEnabled==="true",Q=m?.westpayChannelName||"WestPay",yt=m?.westpayCountries||"",wt=bt&&yt.split(",").map(t=>t.trim().toUpperCase()).includes(l.toUpperCase()),vt=(m?.ppayprosPayinCountries??"").split(",").map(t=>t.trim().toUpperCase()),De=Ht.includes(l.toUpperCase())&&vt.includes(l.toUpperCase())&&m?.ppayprosPayinEnabled==="true"&&(l.toUpperCase()!=="CI"||m?.ppayprosPayinCiConfirmed==="true"),jt=m?.inpayEnabled==="true",Nt=m?.inpayChannelName||"InPay",Ct=m?.inpayCountries||"",$e=jt&&Ct.split(",").map(t=>t.trim().toUpperCase()).includes(l.toUpperCase()),kt=m?.ashtechEnabled==="true",Ge=m?.ashtechChannelName||"AshtechPay",ue=m?.ashtechCountries||"",St=ue.split(",").map(t=>t.trim().toUpperCase()).includes(l.toUpperCase()),Pt=kt&&St,P=Fe.filter(t=>t.isActive),q=P.find(t=>t.code===j),Ve=ue?ue.split(",").map(t=>t.trim().toUpperCase()).filter(Boolean):null;s.useEffect(()=>{if(!$)return;const t=document.activeElement instanceof HTMLElement?document.activeElement:null,r=document.body,n=document.documentElement,h=r.style.overflow,J=n.style.overflow,Ft=r.style.overscrollBehavior,Dt=n.style.overscrollBehavior,$t=window.requestAnimationFrame(()=>G.current?.focus());r.style.overflow="hidden",n.style.overflow="hidden",r.style.overscrollBehavior="none",n.style.overscrollBehavior="none";const Ye=C=>{if(C.key==="Escape"){C.preventDefault(),L(!1);return}if(C.key!=="Tab")return;const Z=Array.from(G.current?.querySelectorAll("button:not([disabled])")||[]);if(!Z.length)return;const Je=Z[0],Ze=Z[Z.length-1];C.shiftKey&&(document.activeElement===Je||document.activeElement===G.current)?(C.preventDefault(),Ze.focus()):!C.shiftKey&&document.activeElement===Ze&&(C.preventDefault(),Je.focus())};return document.addEventListener("keydown",Ye),()=>{window.cancelAnimationFrame($t),document.removeEventListener("keydown",Ye),r.style.overflow=h,n.style.overflow=J,r.style.overscrollBehavior=Ft,n.style.overscrollBehavior=Dt,t?.focus()}},[$]);const{data:lr=[],isLoading:dr}=F({queryKey:["/api/payment-numbers",l],queryFn:async()=>{const t=await fetch(`/api/payment-numbers?country=${l}`,{credentials:"include"});if(!t.ok)throw new Error("Erreur");return t.json()},enabled:!!l}),{data:zt,isLoading:Et}=F({queryKey:["/api/sendavapay/operators",S],queryFn:async()=>{const t=await fetch(`/api/sendavapay/operators/${S}`,{credentials:"include"});if(!t.ok)throw new Error("Erreur");return t.json()},enabled:c==="sv-operator"&&!!S}),Be=(zt?.data||[]).filter(t=>t.status==="online"),{data:Mt=[],isLoading:It,isError:Ke,refetch:Lt}=F({queryKey:["/api/ashtechpay/countries"],queryFn:async()=>{const t=await fetch("/api/ashtechpay/countries",{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les opérateurs");return t.json()},enabled:c==="ashtech-operator"&&Pt}),Y=Mt.filter(t=>P.some(r=>r.code.toUpperCase()===t.code.toUpperCase())&&(!Ve||Ve.includes(t.code.toUpperCase()))),We=Y.find(t=>t.code.trim().toUpperCase()===pt.trim().toUpperCase())||Y[0],_e=We?.code||"",He=We?.operators||[];s.useEffect(()=>{if(c!=="sv-waiting"||!V||!Oe)return;const t=setInterval(async()=>{try{const n=await(await fetch(`/api/deposits/${V}/sendavapay-status`,{credentials:"include"})).json();R(n.status),n.status==="approved"?(clearInterval(t),y(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),re(),I.invalidateQueries({queryKey:["/api/deposits/history"]}),a("amount"),v(""),O(null),B(null),K(""),ie(""),ce(""),R("")):n.status==="rejected"&&(clearInterval(t),y(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),a("sv-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,V,Oe]),s.useEffect(()=>{if(c!=="ashtech-waiting"||!A||!qe)return;const t=setInterval(async()=>{try{const n=await(await fetch(`/api/deposits/${A}/ashtechpay-status`,{credentials:"include"})).json();H(n.status),n.status==="approved"?(clearInterval(t),U(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),re(),I.invalidateQueries({queryKey:["/api/deposits/history"]}),a("amount"),v(""),_(null),H("")):n.status==="rejected"&&(clearInterval(t),U(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),a("ashtech-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,A,qe]);const Ot=t=>{const r=t.target.files?.[0];if(!r)return;if(r.size>5*1024*1024){i({title:"Fichier trop grand",description:"Maximum 5 Mo",variant:"destructive"});return}Se(r.name);const n=new FileReader;n.onload=h=>ke(h.target?.result),n.readAsDataURL(r)},me=N({mutationFn:async()=>{if(!d)throw new Error("Aucun numéro sélectionné");const t=await w("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:se,paymentMethod:d.operatorName,country:l,paymentNumberId:d.id,channelName:d.paymentLink?`${d.operatorName} - Lien de paiement`:`${d.operatorName} - ${d.phone}`,screenshot:k||null,paymentMessage:Pe||null,reference:Ee||null});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur")}return t.json()},onSuccess:t=>{i(t.telegramNotificationSent===!1?{title:"Dépôt enregistré",description:"La notification à l’administration n’a pas abouti. Ne relancez pas le paiement ; contactez l’administration avec votre référence.",variant:"destructive"}:{title:"Demande envoyée !",description:"Votre dépôt est en attente de validation"}),I.invalidateQueries({queryKey:["/api/deposits/history"]}),re(),a("amount"),tt(null),v(""),Ce(p?.phone||""),ke(""),Se(""),ze(""),Me("")},onError:t=>i({title:"Erreur",description:t.message,variant:"destructive"})}),[pr,Rt]=s.useState(null),[ur,Tt]=s.useState("");s.useEffect(()=>{const t=new URLSearchParams(window.location.search),r=t.get("wp_status"),n=t.get("wp_depositId");r&&(Tt(r),n&&Rt(parseInt(n)),window.history.replaceState({},"","/deposit"),r==="success"&&(i({title:"Paiement en cours de confirmation",description:"Votre dépôt sera crédité dès confirmation WestPay."}),I.invalidateQueries({queryKey:["/api/deposits/history"]})))},[]),s.useEffect(()=>{new URLSearchParams(window.location.search).get("ppaypros_status")==="returned"&&(window.history.replaceState({},"","/deposit"),i({title:"Retour du paiement reçu",description:"Le solde sera crédité uniquement après confirmation du paiement."}),I.invalidateQueries({queryKey:["/api/deposits/history"]}))},[]);const z=N({mutationFn:async()=>{const t=await w("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:p?.phone||"",paymentMethod:"WestPay",country:l,useWestpay:!0});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur WestPay")}return t.json()},onSuccess:t=>{t.westpayUrl&&(window.location.href=t.westpayUrl)},onError:t=>i({title:"Erreur WestPay",description:t.message,variant:"destructive"})}),xe=N({mutationFn:async()=>{const t=l.trim().toUpperCase();if(p?.country?.trim().toUpperCase()!==t)throw new Error("Le pays choisi doit correspondre au pays enregistré sur votre compte.");const r=Xe(p?.phone,t);if(!r){const h={BJ:"Le numéro béninois enregistré sur votre compte est invalide. Les 8 chiffres locaux sont complétés avec 01.",TG:"Le numéro togolais enregistré sur votre compte doit contenir 8 chiffres.",CI:"Le numéro ivoirien enregistré sur votre compte doit commencer par 0 et contenir 10 chiffres.",CM:"Le numéro camerounais enregistré sur votre compte doit contenir 9 ou 10 chiffres.",BF:"Le numéro burkinabè enregistré sur votre compte est invalide."};throw new Error(h[t]||"Le numéro enregistré sur votre compte est invalide.")}const n=await w("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:r,paymentMethod:"PPayPros",country:l,usePpaypros:!0});if(!n.ok){const h=await n.json(),J=String(h.message||"");throw new Error(/ppaypros/i.test(J)?"Impossible de préparer le paiement. Réessayez ou contactez le service client.":J||"Impossible de préparer le paiement.")}return n.json()},onSuccess:t=>{t.ppayprosUrl?window.location.assign(t.ppayprosUrl):i({title:"Lien de paiement indisponible",description:"Aucun lien de paiement n'a été renvoyé.",variant:"destructive"})},onError:t=>{const r=/signature verification failed/i.test(String(t.message||"")),n=/ppaypros/i.test(String(t.message||""));i({title:r?"Paiement refusé":"Erreur de paiement",description:r?"Une erreur de configuration a empêché le paiement. Réessayez plus tard ou contactez le service client.":n?"Impossible de préparer le paiement. Réessayez ou contactez le service client.":t.message,variant:"destructive"})}}),he=N({mutationFn:async()=>{const t=await w("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:p?.phone||"",paymentMethod:"InPay",country:l,useInpay:!0});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur InPay")}return t.json()},onSuccess:t=>{t.inpayUrl&&(window.location.href=t.inpayUrl)},onError:t=>i({title:`Erreur ${Nt}`,description:t.message,variant:"destructive"})}),E=N({mutationFn:async t=>{if(!T||!W.trim())throw new Error("Sélectionnez un opérateur et saisissez votre numéro");const r=await w("POST","/api/ashtechpay/collect",{amount:Number(o),country:_e,operator:T,phone:W.trim(),depositId:A||void 0,otp:t||void 0});if(!r.ok){const n=await r.json();throw new Error(n.message||"Erreur AshtechPay")}return r.json()},onSuccess:t=>{_(t.depositId),Ue(t.message||""),Ae(t.ussdCode||""),t.waveUrl?(ht(t.waveUrl),a("ashtech-redirect")):t.requiresOtp?a("ashtech-otp"):(U(!0),H(t.status||"pending"),a("ashtech-waiting"))},onError:t=>{if(t.data?.requiresOtp){_(t.data.depositId||A),Ae(t.data.ussdCode||""),Ue(t.message||"Composez le code indiqué puis saisissez le code OTP."),Te(""),a("ashtech-otp");return}i({title:`Erreur ${Ge}`,description:t.message,variant:"destructive"})}}),ge=N({mutationFn:async()=>{if(!b)throw new Error("Sélectionnez un opérateur");const t=await w("POST","/api/sendavapay/create",{amount:Number(o),country:S,operatorId:b.id,operatorName:b.name,payerPhone:ne});if(!t.ok){const h=await t.json();throw new Error(h.message||"Erreur création paiement")}const r=await t.json();B(r.depositId),K(r.paymentToken);const n=await w("POST","/api/sendavapay/initiate",{paymentToken:r.paymentToken,payerCountry:S,operatorId:b.id,depositId:r.depositId,payerPhone:ne});if(!n.ok){const h=await n.json();throw new Error(h.message||"Erreur initiation paiement")}return n.json()},onSuccess:t=>{const r=b?.name?.toLowerCase().includes("wave");t.requiresRedirect&&t.redirectUrl&&r?(dt(t.redirectUrl),a("sv-redirect")):t.requiresRedirect&&!r?(y(!0),a("sv-waiting")):t.requiresOtp&&t.otpToken?(ie(t.otpToken),ot(t.ussdCode||""),ct(t.message||""),a("sv-otp")):t.success?(y(!0),a("sv-waiting")):i({title:"Erreur",description:t.error||t.message||"Erreur paiement",variant:"destructive"})},onError:t=>i({title:"Erreur",description:t.message,variant:"destructive"})}),fe=N({mutationFn:async()=>{if(!ae)throw new Error("Token de paiement manquant");const t=await w("POST","/api/sendavapay/retry",{paymentToken:ae,depositId:V});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur retry")}return t.json()},onSuccess:()=>{ce(""),ie(""),R(""),y(!1),a("sv-operator"),i({title:"Prêt à réessayer",description:"Sélectionnez un opérateur et relancez le paiement."})},onError:t=>i({title:"Erreur retry",description:t.message,variant:"destructive"})}),be=N({mutationFn:async()=>{const t=await w("POST","/api/sendavapay/submit-otp",{otpToken:it,otp:oe});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur OTP")}return t.json()},onSuccess:()=>{y(!0),a("sv-waiting")},onError:t=>i({title:"Erreur OTP",description:t.message,variant:"destructive"})}),At=()=>{if(!o||Number(o)<pe){i({title:"Montant invalide",description:`Le minimum est de ${pe.toLocaleString()} ${u}`,variant:"destructive"});return}if($e&&(!Number.isInteger(Number(o))||Number(o)%5!==0)){i({title:"Montant InPay invalide",description:"Utilisez un montant entier multiple de 5 : 300, 305, 310…",variant:"destructive"});return}if(De&&!Number.isInteger(Number(o))){i({title:"Montant invalide",description:"Ce paiement accepte uniquement un montant entier en FCFA.",variant:"destructive"});return}Qe()},Qe=()=>{if(!j){i({title:"Pays requis",description:"Sélectionnez le pays du paiement.",variant:"destructive"});return}if(De){if(p?.country?.toUpperCase()!==l.toUpperCase()){i({title:"Pays du compte différent",description:"Le paiement utilise le numéro enregistré pour le pays du compte.",variant:"destructive"});return}if(!Xe(p?.phone,l)){i({title:"Numéro du compte invalide",description:"Vérifiez que le numéro enregistré respecte le format demandé pour ce pays.",variant:"destructive"});return}xe.mutate();return}if($e){he.mutate();return}if(wt){z.mutate();return}ve(`/robotpay?amount=${encodeURIComponent(Number(o))}&country=${encodeURIComponent(j)}`)},Ut=t=>{const r=t.toLowerCase();return r.includes("tmoney")||r.includes("t-money")?"/operators/tmoney.png":r.includes("moov")?"/operators/moov.jpg":r.includes("orange")?"/operators/orange.png":r.includes("mtn")?"/operators/mtn.png":r.includes("airtel")?"/operators/airtel.png":r.includes("wave")?"/operators/wave.png":null},qt=()=>{if(!se.trim()){i({title:"Numéro requis",description:"Entrez le numéro depuis lequel vous avez payé",variant:"destructive"});return}if(!k){i({title:"Capture requise",description:"Veuillez joindre la capture d'écran du paiement",variant:"destructive"});return}me.mutate()};return p?c==="amount"?e.jsxs("main",{className:"recharge-reference min-h-screen bg-[#f7f6f3]",children:[e.jsx("style",{children:`
        .recharge-reference {
          color: #202124;
          font-family: Inter, Arial, sans-serif;
        }
        .recharge-reference .recharge-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100vh;
          margin: 0 auto;
          overflow: hidden;
          padding-bottom: 28px;
          background: #f7f6f3;
        }
        .recharge-reference .recharge-topbar {
          position: relative;
          display: flex;
          height: 44px;
          align-items: center;
          justify-content: flex-start;
          background: transparent;
          color: white;
        }
        .recharge-reference .recharge-back {
          position: absolute;
          top: 2px;
          left: 15px;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: white;
        }
        .recharge-reference .recharge-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 500;
        }
        .recharge-reference .brand-mark {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }
        .recharge-reference .history-button {
          position: absolute;
          top: 8px;
          right: 14px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
        }
        .recharge-reference .recharge-hero {
          position: relative;
          display: flex;
          height: 124px;
          align-items: center;
          margin: 16px 18px 0;
          padding: 0 18px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,.8);
          border-radius: 24px 24px 0 0;
          background: ${x};
          color: white;
        }
        .recharge-reference .minimum-label {
          position: relative;
          z-index: 1;
          max-width: 75%;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
        }
        .recharge-reference .gift-illustration {
          position: absolute;
          right: 12px;
          bottom: -8px;
          font-size: 76px;
          line-height: 1;
          filter: drop-shadow(0 3px 2px rgba(0,0,0,.18));
          pointer-events: none;
        }
        .recharge-reference .balance-card {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: 96px;
          align-items: center;
          justify-content: center;
          margin: -23px 18px 20px;
          border-radius: 24px;
          background: white;
          box-shadow: 0 2px 8px rgba(24,37,49,.04);
          color: #777;
          font-size: 17px;
        }
        .recharge-reference .balance-value {
          margin-left: 7px;
          color: #df8a12;
          font-size: 22px;
          font-weight: 700;
        }
        .recharge-reference .amount-panel {
          margin: 0 18px 18px;
          padding: 12px 14px;
          border-radius: 15px;
          background: white;
        }
        .recharge-reference .amount-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 2px 0 8px;
          border-bottom: 1px solid #dedede;
          color: #292929;
          font-size: 17px;
          font-weight: 500;
        }
        .recharge-reference .amount-heading-icon {
          display: block;
          flex: 0 0 auto;
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: invert(1) grayscale(1) contrast(1.2);
        }
        .recharge-reference .preset-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px 8px;
          margin-top: 10px;
        }
        .recharge-reference .preset {
          min-width: 0;
          height: 46px;
          border: 1px solid #a8a8a8;
          border-radius: 7px;
          background: white;
          color: #343434;
          font-size: 18px;
          font-weight: 500;
        }
        .recharge-reference .preset.active {
          border-color: ${et};
          background: ${x};
          color: white;
          box-shadow: 0 2px 4px rgba(0,84,145,.15);
        }
        .recharge-reference .amount-input {
          display: flex;
          height: 48px;
          align-items: center;
          overflow: hidden;
          margin-top: 10px;
          border: 1px solid #c9c9c9;
          border-radius: 5px;
          background: white;
        }
        .recharge-reference .amount-input input {
          width: 100%;
          height: 100%;
          min-width: 0;
          padding: 0 12px;
          border: 0;
          outline: 0;
          color: #30323b;
          background: transparent;
          font-size: 17px;
        }
        .recharge-reference .amount-input input::placeholder { color: #777; opacity: 1; }
        .recharge-reference .currency-prefix {
          flex: 0 0 auto;
          padding: 0 10px 0 13px;
          color: #30323b;
          font-size: 18px;
        }
        .recharge-reference .country-panel {
          margin: 0 18px 16px;
          padding: 14px;
          border-radius: 15px;
          background: white;
        }
        .recharge-reference .country-label {
          display: block;
          margin-bottom: 8px;
          color: #292929;
          font-size: 15px;
          font-weight: 600;
        }
        .recharge-reference .country-select {
          width: 100%;
          height: 48px;
          padding: 0 12px;
          border: 1px solid #c9c9c9;
          border-radius: 6px;
          background: white;
          color: #30323b;
          font-size: 15px;
        }
        .recharge-reference .continue {
          display: flex;
          width: calc(100% - 36px);
          height: 60px;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 0;
          border-radius: 32px;
          background: ${x};
          color: white;
          font-size: 21px;
          font-weight: 500;
          box-shadow: 0 3px 5px rgba(233,168,0,.35);
        }
        .recharge-reference .continue:disabled {
          cursor: not-allowed;
          opacity: .55;
        }
        .recharge-reference .instructions {
          margin: 0 18px;
          padding: 17px 14px 14px;
          border-radius: 15px;
          background: white;
          color: #292929;
        }
        .recharge-reference .instructions-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 700;
        }
        .recharge-reference .instruction {
          margin: 0 0 10px;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.45;
        }
        .recharge-reference .instruction:last-child { margin-bottom: 0; }
        .recharge-reference .instruction-number { font-weight: 500; }
        @media (max-width: 380px) {
          .recharge-reference .amount-panel,
          .recharge-reference .country-panel,
          .recharge-reference .instructions { margin-right: 14px; margin-left: 14px; }
          .recharge-reference .preset-grid { gap: 6px; }
          .recharge-reference .preset { height: 44px; font-size: 17px; }
          .recharge-reference .continue { width: calc(100% - 28px); }
          .recharge-reference .instructions { padding: 15px 12px; }
        }

        .recharge-reference {
          color: #f5f0e3;
          background: #111111;
          font-family: Georgia, "Times New Roman", serif;
        }
        .recharge-reference .recharge-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100vh;
          padding: 24px 0 28px;
          overflow-x: hidden;
          background: #111111;
        }
        .recharge-reference .recharge-top-row {
          display: grid;
          grid-template-columns: 34.5% 57.5%;
          column-gap: 4%;
          align-items: start;
          width: 100%;
          margin: 0 0 26px 4%;
        }
        .recharge-reference .balance-summary {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 16px;
        }
        .recharge-reference .balance-label {
          color: #d7d4d0;
          font-size: clamp(15px, 3.2vw, 17px);
          line-height: 1.2;
        }
        .recharge-reference .balance-summary .balance-value {
          margin: 7px 0 0;
          color: #f4f0e9;
          font-size: clamp(17px, 3.6vw, 19px);
          line-height: 1.2;
          font-weight: 700;
        }
        .recharge-reference .wallet-link {
          display: flex;
          width: 132px;
          max-width: 100%;
          min-height: 46px;
          align-items: center;
          margin-top: 24px;
          padding: 6px 12px;
          border-radius: 24px;
          background: #24232f;
          color: #f4f0e3;
          font-size: clamp(16px, 3.5vw, 18px);
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
        }
        .recharge-reference .amount-panel {
          margin: 0 4% 18px;
          padding: 26px 2.75% 20px;
          border-radius: 24px;
          background: #24232f;
          color: #f7f0dc;
        }
        .recharge-reference .preset-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px 7.5%;
          margin-top: 0;
        }
        .recharge-reference .preset {
          height: clamp(46px, 10.55vw, 54px);
          border: 0;
          border-radius: 999px;
          background: #fff0c8;
          color: #302b24;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 3.5vw, 18px);
          font-weight: 400;
        }
        .recharge-reference .preset.active {
          border: 0;
          background: #e9c45e;
          color: #302b24;
          box-shadow: none;
        }
        .recharge-reference .amount-input {
          height: clamp(58px, 12.9vw, 66px);
          margin-top: 25px;
          border: 0;
          border-radius: 999px;
          background: #fff0c8;
        }
        .recharge-reference .amount-input input {
          padding: 0 16px 0 4px;
          color: #292722;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(17px, 3.5vw, 19px);
          font-weight: 700;
        }
        .recharge-reference .amount-input input::placeholder {
          color: #817b70;
          font-weight: 400;
        }
        .recharge-reference .currency-prefix {
          padding: 0 12px 0 20px;
          color: #292722;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 3.3vw, 18px);
          font-weight: 700;
        }
        .recharge-reference .country-panel {
          margin: 22px 0 0;
          padding: 0;
          border-radius: 0;
          background: transparent;
        }
        .recharge-reference .country-label {
          margin-bottom: 12px;
          color: #f5f0e3;
          font-size: clamp(16px, 3.5vw, 18px);
          font-weight: 400;
        }
        .recharge-reference .country-select {
          height: 48px;
          padding: 0 42px 0 18px;
          appearance: none;
          border: 0;
          border-radius: 999px;
          background-color: #fff0c8;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23302b24' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          color: #302b24;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(15px, 3.2vw, 17px);
        }
        .recharge-reference .continue {
          width: 100%;
          height: clamp(58px, 12.9vw, 66px);
          margin: 58px 0 0;
          border: 0;
          border-radius: 999px;
          background: #e9c45e;
          color: #302b24;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(18px, 3.7vw, 20px);
          font-weight: 700;
          box-shadow: none;
        }
        .recharge-reference .continue:disabled {
          opacity: .58;
        }
        .recharge-reference .instructions {
          margin: 24px 0 0;
          padding: 0;
          border-radius: 0;
          background: transparent;
          color: #f5f0e3;
        }
        .recharge-reference .instructions-title {
          margin: 0 0 16px;
          color: #f4f0e3;
          font-size: clamp(17px, 3.5vw, 19px);
          font-weight: 700;
          line-height: 1.3;
        }
        .recharge-reference .instructions-subtitle {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 20px;
          color: #f1d11b;
          font-size: clamp(17px, 3.5vw, 19px);
          font-weight: 700;
        }
        .recharge-reference .instructions-subtitle svg {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
        }
        .recharge-reference .instruction {
          margin: 0 0 14px;
          color: #f3f0ed;
          font-size: clamp(15px, 3.5vw, 18px);
          line-height: 1.48;
        }
        .recharge-reference .instruction-number {
          color: #f1d11b;
          font-weight: 700;
        }
        .recharge-reference .instruction strong {
          color: #f1d11b;
          font-weight: 700;
        }
        @media (max-width: 380px) {
          .recharge-reference .amount-panel {
            margin-right: 4%;
            margin-left: 4%;
            padding-right: 2.75%;
            padding-left: 2.75%;
          }
          .recharge-reference .preset-grid {
            gap: 20px 6%;
          }
          .recharge-reference .continue {
            width: 100%;
          }
        }

        .recharge-reference {
          min-height: 100vh;
          overflow-x: hidden;
          background: #000;
          color: #f4f0e8;
          font-family: Georgia, "Times New Roman", serif;
        }
        .recharge-reference .recharge-screen {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 432px;
          min-height: 100vh;
          margin: 0 auto;
          overflow: hidden;
          padding: 0 0 28px;
          background:
            radial-gradient(ellipse at 100% 78%, rgba(108, 75, 26, .18), transparent 34%),
            #000;
        }
        .recharge-reference .recharge-screen::before {
          position: absolute;
          z-index: 0;
          top: 0;
          right: 0;
          left: 0;
          height: 250px;
          background:
            repeating-linear-gradient(90deg, transparent 0 28px, rgba(231, 209, 170, .08) 29px 30px, transparent 31px 57px),
            repeating-linear-gradient(90deg, transparent 0 8px, rgba(231, 209, 170, .13) 9px, transparent 10px 16px),
            linear-gradient(151deg, transparent 0 40%, rgba(203, 171, 111, .08) 40.2%, transparent 41%),
            radial-gradient(ellipse at 76% 0%, rgba(124, 87, 41, .42), transparent 47%),
            linear-gradient(180deg, #191309 0%, #090806 79%, transparent 100%);
          pointer-events: none;
          content: "";
        }
        .recharge-reference .recharge-screen > * {
          position: relative;
          z-index: 1;
        }
        .recharge-reference .recharge-topbar {
          position: relative;
          display: flex;
          height: 44px;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #fff;
        }
        .recharge-reference .recharge-back {
          top: 2px;
          left: 6px;
          width: 38px;
          height: 40px;
          color: #fff;
          cursor: pointer;
        }
        .recharge-reference .recharge-back svg {
          width: 25px;
          height: 25px;
          stroke-width: 1.7;
        }
        .recharge-reference .recharge-page-title {
          margin: 0;
          color: #f7f4ee;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .recharge-reference .balance-card {
          position: relative;
          display: flex;
          min-height: 85px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin: 16px 3% 13px;
          border: 0;
          border-radius: 11px;
          padding: 8px 12px;
          background: linear-gradient(105deg, #dfb332 0%, #ffdc79 100%);
          box-shadow: none;
          color: #17130b;
        }
        .recharge-reference .balance-card .balance-value {
          margin: 0;
          color: #15120d;
          font-size: clamp(21px, 5.3vw, 24px);
          font-weight: 700;
          line-height: 1.1;
        }
        .recharge-reference .balance-card .balance-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #332917;
          font-size: clamp(14px, 3.6vw, 16px);
          line-height: 1.1;
        }
        .recharge-reference .balance-label img {
          display: block;
          width: 18px;
          height: 18px;
          object-fit: contain;
        }
        .recharge-reference .amount-panel {
          margin: 0 8px;
          border: 0;
          border-radius: 0;
          padding: 0 0 2px;
          background: transparent;
          color: #f4f0e8;
        }
        .recharge-reference .amount-heading {
          display: flex;
          min-height: 28px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 5px;
          border: 0;
          color: #e0bb50;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 4.35vw, 19px);
          font-weight: 400;
          line-height: 1.15;
        }
        .recharge-reference .amount-heading-balance {
          flex: 0 0 auto;
          font-size: clamp(14px, 3.9vw, 17px);
        }
        .recharge-reference .preset-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px 5%;
          margin-top: 15px;
        }
        .recharge-reference .preset {
          min-width: 0;
          height: 42px;
          overflow: hidden;
          border: 1px solid #33312c;
          border-radius: 7px;
          padding: 0 3px;
          background: rgba(0, 0, 0, .68);
          color: #e1e1e1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(13px, 3.45vw, 15px);
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 120ms ease, border-color 120ms ease;
        }
        .recharge-reference .preset.active {
          border-color: #f1cd68;
          background: linear-gradient(105deg, #dfb332 0%, #ffdc79 100%);
          color: #211a0d;
          box-shadow: none;
          font-weight: 700;
        }
        .recharge-reference .amount-input {
          height: 49px;
          margin-top: 22px;
          border: 0;
          border-radius: 12px;
          background: #f4f3f1;
        }
        .recharge-reference .amount-input input {
          min-width: 0;
          padding: 0 12px 0 4px;
          color: #211e18;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 4vw, 18px);
          font-weight: 700;
        }
        .recharge-reference .amount-input input::placeholder {
          color: #77736c;
          font-weight: 400;
        }
        .recharge-reference .currency-prefix {
          padding: 0 10px 0 17px;
          color: #d5a938;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(15px, 3.8vw, 17px);
          font-weight: 700;
          white-space: nowrap;
        }
        .recharge-reference .country-panel {
          margin: 12px 0 0;
          border: 0;
          border-radius: 0;
          padding: 0;
          background: transparent;
        }
        .recharge-reference .country-select-button {
          display: flex;
          width: 100%;
          min-height: 48px;
          align-items: center;
          gap: 11px;
          border: 1px solid rgba(221, 185, 79, .48);
          border-radius: 10px;
          padding: 6px 13px;
          background: rgba(29, 25, 19, .8);
          color: #f4efe4;
          text-align: left;
          cursor: pointer;
          transition: border-color 120ms ease, background-color 120ms ease;
        }
        .recharge-reference .country-select-button:hover {
          border-color: #e0bb50;
          background: rgba(43, 36, 24, .92);
        }
        .recharge-reference .country-select-icon {
          width: 21px;
          height: 21px;
          flex: 0 0 auto;
          color: #dfbb58;
          stroke-width: 1.8;
        }
        .recharge-reference .country-select-copy {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 2px;
        }
        .recharge-reference .country-label {
          display: block;
          margin: 0;
          color: #a9a39a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.1;
        }
        .recharge-reference .country-selected-value {
          overflow: hidden;
          color: #f3eee4;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .recharge-reference .country-select-chevron {
          width: 19px;
          height: 19px;
          flex: 0 0 auto;
          color: #dfbb58;
        }
        .recharge-reference .continue {
          display: flex;
          width: 100%;
          height: 48px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 16px 0 0;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(105deg, #dfb332 0%, #ffdc79 100%);
          color: #17130b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 4.3vw, 18px);
          font-weight: 700;
          box-shadow: none;
          cursor: pointer;
          transition: filter 120ms ease, transform 120ms ease;
        }
        .recharge-reference .continue:hover:not(:disabled) {
          filter: brightness(1.05);
        }
        .recharge-reference .continue:active:not(:disabled) {
          transform: translateY(1px);
        }
        .recharge-reference .continue:disabled {
          cursor: not-allowed;
          opacity: .82;
        }
        .recharge-reference .continue-loader {
          width: 17px;
          height: 17px;
          animation: deposit-button-spin .9s linear infinite;
        }
        .recharge-reference .instructions {
          margin: 44px 10px 0;
          border: 0;
          border-radius: 12px;
          padding: 16px 16px 14px;
          background: #414143;
          color: #e8e6e1;
        }
        .recharge-reference .instruction {
          margin: 0 0 16px;
          color: #e8e6e1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(14px, 3.85vw, 16px);
          font-weight: 400;
          line-height: 1.25;
        }
        .recharge-reference .instruction:last-child {
          margin-bottom: 0;
        }
        .recharge-reference .instruction-number {
          color: inherit;
          font-weight: 400;
        }
        .recharge-reference .instruction strong {
          color: #f2d370;
          font-weight: 700;
        }
        .recharge-reference :is(button, input):focus-visible {
          outline: 2px solid #e3c362;
          outline-offset: 2px;
        }
        .deposit-country-overlay {
          position: fixed;
          z-index: 9999;
          inset: 0;
          display: grid;
          align-items: center;
          justify-items: center;
          padding: 16px 20px;
          background: rgba(1, 4, 11, .76);
          backdrop-filter: blur(2px);
        }
        .deposit-country-dialog {
          display: flex;
          width: min(84vw, 360px);
          height: auto;
          min-height: 0;
          max-height: calc(100dvh - 32px);
          flex: 0 1 auto;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #28364f;
          border-radius: 10px;
          outline: 0;
          padding: 8px;
          background: #111a2d;
          box-shadow: 0 22px 60px rgba(0, 0, 0, .55);
          color: #f3f5fa;
          transform: rotate(-1deg);
        }
        .deposit-country-dialog-header {
          display: flex;
          min-height: 38px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 2px 7px;
        }
        .deposit-country-dialog-header h2 {
          margin: 0;
          color: #c3cbd8;
          font-size: 14px;
          font-weight: 600;
        }
        .deposit-country-close {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(141, 157, 183, .16);
          border-radius: 8px;
          background: #1d293d;
          color: #c3cbd8;
          cursor: pointer;
          transition: background-color 140ms ease;
        }
        .deposit-country-close:hover {
          background: #26344b;
        }
        .deposit-country-close svg {
          width: 17px;
          height: 17px;
        }
        .deposit-country-list {
          display: flex;
          min-height: 0;
          max-height: min(70dvh, 420px);
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
          padding: 0;
          overscroll-behavior-y: contain;
          scrollbar-width: none;
        }
        .deposit-country-list::-webkit-scrollbar {
          display: none;
        }
        .deposit-country-option {
          position: relative;
          display: flex;
          width: 100%;
          height: 50px;
          min-height: 50px;
          flex: 0 0 50px;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(141, 157, 183, .12);
          border-radius: 8px;
          padding: 0 12px;
          background: #1d293d;
          color: #c3cbd8;
          font-family: inherit;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.2;
          text-align: left;
          cursor: pointer;
          transition: background-color 140ms ease, border-color 140ms ease;
        }
        .deposit-country-option:hover {
          background: #26344b;
        }
        .deposit-country-option.is-selected {
          border-color: #d5c27b;
          background: #b49b52;
          color: #0b1733;
          font-weight: 700;
        }
        .deposit-country-flag {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .32);
          border-radius: 50%;
          background: rgba(255, 255, 255, .08);
        }
        .deposit-country-flag img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .deposit-country-name {
          min-width: 0;
          flex: 1;
          font-size: 15px;
          font-weight: inherit;
        }
        .deposit-country-currency {
          margin-left: auto;
          color: inherit;
          font-size: 13px;
          font-weight: 600;
        }
        .deposit-country-check {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          color: inherit;
          stroke-width: 3;
        }
        .deposit-country-empty {
          margin: 0;
          padding: 24px 12px;
          color: #c3cbd8;
          font-size: 14px;
          text-align: center;
        }
        .deposit-country-option:focus-visible,
        .deposit-country-close:focus-visible {
          outline: 2px solid #d5c27b;
          outline-offset: 2px;
        }
        @media (max-width: 380px) {
          .deposit-country-overlay {
            padding-right: 16px;
            padding-left: 16px;
          }
          .deposit-country-dialog {
            width: min(84vw, 360px);
          }
          .deposit-country-list {
            max-height: min(70dvh, 420px);
          }
        }
        @keyframes deposit-button-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 380px) {
          .recharge-reference .recharge-screen {
            padding-bottom: 20px;
          }
          .recharge-reference .preset-grid {
            column-gap: 4%;
            row-gap: 12px;
          }
          .recharge-reference .preset {
            height: 40px;
            font-size: 12px;
          }
          .recharge-reference .amount-heading {
            font-size: 16px;
          }
          .recharge-reference .amount-heading-balance {
            font-size: 13px;
          }
          .recharge-reference .instructions {
            margin-right: 8px;
            margin-left: 8px;
            padding: 14px 13px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .recharge-reference .continue,
          .recharge-reference .preset {
            transition: none;
          }
        }
      `}),e.jsxs("div",{className:"recharge-screen",children:[e.jsxs("header",{className:"recharge-topbar",children:[e.jsx("button",{type:"button",className:"recharge-back",onClick:()=>ve("/account"),"aria-label":"Retour","data-testid":"button-back-deposit",children:e.jsx(g,{className:"h-6 w-6","aria-hidden":"true"})}),e.jsx("h1",{className:"recharge-page-title",children:"Recharger"})]}),e.jsxs("section",{className:"balance-card","aria-label":"Actifs totaux",children:[e.jsxs("strong",{className:"balance-value",children:[Number.parseFloat(p.balance||"0").toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2})," ",u]}),e.jsxs("span",{className:"balance-label",children:[e.jsx("img",{src:Qt,alt:"","aria-hidden":"true"}),"Actifs totaux"]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de recharge",children:[e.jsxs("div",{className:"amount-heading",children:[e.jsx("span",{children:"Montant de la recharge"}),e.jsx("span",{className:"amount-heading-balance",children:"Actifs totaux"})]}),e.jsx("div",{className:"preset-grid",children:[3e3,3500,7e3,15e3,3e4,5e4,1e5,2e5,5e5].map(t=>e.jsxs("button",{className:`preset ${o===t?"active":""}`,type:"button",onClick:()=>v(t),"aria-pressed":o===t,children:[t.toLocaleString("fr-FR")," ",u]},t))}),e.jsxs("label",{className:"amount-input",children:[e.jsx("span",{className:"currency-prefix",children:u}),e.jsx("input",{type:"number",inputMode:"numeric",value:o,onChange:t=>v(t.target.value?Number(t.target.value):""),placeholder:"Saisir un autre montant","aria-label":"Montant de recharge"})]}),e.jsx("section",{className:"country-panel","aria-label":"Pays du paiement",children:e.jsxs("button",{ref:rt,type:"button",className:"country-select-button",onClick:()=>L(!0),"aria-haspopup":"dialog","aria-expanded":$,"aria-label":`Sélectionner le pays du paiement${q?`, actuellement ${q.name}`:""}`,"data-testid":"button-deposit-country",children:[e.jsx(tr,{"aria-hidden":"true",className:"country-select-icon"}),e.jsxs("span",{className:"country-select-copy",children:[e.jsx("span",{className:"country-label",children:"Pays du paiement"}),e.jsx("span",{className:"country-selected-value",children:q?`${q.name} · ${q.currency}`:"Sélectionner un pays"})]}),e.jsx(Yt,{"aria-hidden":"true",className:"country-select-chevron"})]})}),e.jsx("button",{type:"button",className:"continue",onClick:At,disabled:!j||he.isPending||z.isPending||xe.isPending,children:he.isPending||z.isPending||xe.isPending?e.jsxs(e.Fragment,{children:[e.jsx(f,{"aria-hidden":"true",className:"continue-loader"})," Chargement…"]}):"Recharger maintenant"}),e.jsxs("section",{className:"instructions","aria-label":"Instructions de recharge",children:[e.jsxs("p",{className:"instruction",children:[e.jsx("span",{className:"instruction-number",children:"1."})," Montant minimum de recharge : ",e.jsxs("strong",{children:[pe.toLocaleString("fr-FR")," ",u]}),"."]}),e.jsxs("p",{className:"instruction",children:[e.jsx("span",{className:"instruction-number",children:"2."})," Le service de recharge est disponible 24h/24 et 7j/7. Vous pouvez soumettre une demande de recharge à tout moment."]}),e.jsxs("p",{className:"instruction",children:[e.jsx("span",{className:"instruction-number",children:"3."})," Avant chaque recharge, vérifiez les dernières informations du compte de réception affichées sur la plateforme."]}),e.jsxs("p",{className:"instruction",children:[e.jsx("span",{className:"instruction-number",children:"4."})," Après le paiement, le système traite généralement la transaction dans un délai ",e.jsx("strong",{children:"de 10 à 30 minutes"}),"."]}),e.jsxs("p",{className:"instruction",children:[e.jsx("span",{className:"instruction-number",children:"5."})," Effectuez vos rechargements et transactions uniquement via l’application officielle de la plateforme."]})]})]})]}),$&&_t.createPortal(e.jsx("div",{className:"deposit-country-overlay",role:"presentation",onClick:()=>L(!1),children:e.jsxs("section",{ref:G,className:"deposit-country-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"deposit-country-title",tabIndex:-1,onClick:t=>t.stopPropagation(),children:[e.jsxs("header",{className:"deposit-country-dialog-header",children:[e.jsx("h2",{id:"deposit-country-title",children:"Sélectionner un pays"}),e.jsx("button",{type:"button",className:"deposit-country-close",onClick:()=>L(!1),"aria-label":"Fermer la sélection du pays",children:e.jsx(Jt,{"aria-hidden":"true"})})]}),e.jsx("div",{className:"deposit-country-list","aria-label":"Pays disponibles",children:gt?e.jsx("p",{className:"deposit-country-empty",role:"status",children:"Chargement des pays…"}):P.length?P.slice().sort((t,r)=>t.name.localeCompare(r.name,"fr")).map(t=>{const r=t.code===j;return e.jsxs("button",{type:"button",className:`deposit-country-option${r?" is-selected":""}`,onClick:()=>{Ne(t.code),L(!1)},"aria-pressed":r,"data-testid":`deposit-country-option-${t.code}`,children:[e.jsx("span",{className:"deposit-country-flag","aria-hidden":"true",children:e.jsx("img",{src:`https://flagcdn.com/${t.code.toLowerCase()}.svg`,alt:"",loading:"lazy",decoding:"async"})}),e.jsx("span",{className:"deposit-country-name",children:t.name}),e.jsx("span",{className:"deposit-country-currency",children:t.currency}),r&&e.jsx(Zt,{"aria-hidden":"true",className:"deposit-country-check"})]},t.code)}):e.jsx("p",{className:"deposit-country-empty",children:"Aucun pays de dépôt actif."})})]})}),document.body)]}):c==="select"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsxs("header",{className:"flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4",children:[e.jsxs("button",{className:"flex items-center gap-1 text-gray-800",onClick:()=>a("amount"),children:[e.jsx(g,{className:"h-5 w-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Choisir le pays"})]}),e.jsx(D,{href:"/history",children:e.jsx("button",{className:"rounded-full border border-[#00CC2C] px-3 py-1.5 text-xs font-semibold text-[#00CC2C]",children:"Historique"})})]}),e.jsxs("div",{className:"mx-4 mt-4 flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50 p-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#00CC2C]",children:[Number(o).toLocaleString()," ",u]})]}),e.jsx("button",{onClick:()=>a("amount"),className:"text-xs text-[#00CC2C] underline",children:"Modifier"})]}),e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"rounded-2xl border-2 border-[#00CC2C] bg-green-50 p-4",children:[e.jsx("p",{className:"mb-2 text-sm font-bold text-gray-900",children:"Pays du paiement"}),e.jsxs("select",{value:j,onChange:t=>Ne(t.target.value),className:"w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-4 text-sm text-gray-700 outline-none",children:[e.jsx("option",{value:"",children:"Sélectionnez un pays"}),P.map(t=>e.jsxs("option",{value:t.code,children:[t.name," (",t.currency,")"]},t.code))]}),e.jsx("p",{className:"mt-2 text-xs text-gray-500",children:"Seuls les pays activés par l’administration sont affichés."})]}),e.jsx("button",{onClick:Qe,disabled:!j,className:"mt-5 w-full rounded-xl bg-[#00CC2C] py-3 font-semibold text-white disabled:opacity-50",children:"Continuer vers le paiement"})]})]}):c==="form"&&d?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("header",{className:"flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{className:"flex items-center gap-1 text-gray-800",onClick:()=>a("select"),children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Confirmer le paiement"})]})}),e.jsxs("div",{className:"p-4 space-y-4 pb-10",children:[e.jsxs("div",{className:"rounded-xl border border-orange-100 bg-orange-50 p-4 flex items-center gap-3",children:[d.logoUrl?e.jsx("img",{src:d.logoUrl,alt:d.operatorName,className:"w-10 h-10 rounded-lg object-contain"}):e.jsx("div",{className:"w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-orange-100",children:e.jsx(X,{className:"w-5 h-5 text-[#00CC2C]"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-xs text-gray-500",children:d.paymentLink?"Lien de paiement":"Numéro destinataire"}),d.paymentLink?e.jsxs("a",{href:d.paymentLink,target:"_blank",rel:"noreferrer",className:"mt-1 flex items-center gap-1 text-sm font-bold text-[#00CC2C] underline",children:[e.jsx(M,{className:"h-4 w-4"})," Ouvrir le lien de paiement"]}):e.jsxs("p",{className:"font-bold text-[#00CC2C] text-sm",children:[d.operatorName," — ",d.phone]}),e.jsx("p",{className:"text-xs text-gray-500",children:d.ownerName})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant"}),e.jsxs("p",{className:"font-bold text-gray-800",children:[Number(o).toLocaleString()," ",u]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Votre numéro payeur"}),e.jsxs("div",{className:"border border-gray-300 rounded-md flex items-center overflow-hidden bg-white",children:[e.jsx(X,{className:"w-4 h-4 text-gray-400 ml-4"}),e.jsx("input",{type:"tel",value:se,onChange:t=>Ce(t.target.value),placeholder:"Numéro depuis lequel vous avez payé",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Référence / ID transaction ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("input",{type:"text",value:Ee,onChange:t=>Me(t.target.value),placeholder:"Numéro de référence de la transaction",className:"w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 outline-none bg-white"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Message reçu après paiement ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("textarea",{value:Pe,onChange:t=>ze(t.target.value),placeholder:"Collez ici le SMS ou message de confirmation reçu...",rows:3,className:"w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 outline-none bg-white resize-none"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Capture d'écran du paiement ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{ref:je,type:"file",accept:"image/*",onChange:Ot,className:"hidden"}),e.jsx("button",{onClick:()=>je.current?.click(),className:`w-full border-2 border-dashed rounded-xl py-7 flex flex-col items-center gap-2 transition-colors ${k?"border-green-400 bg-green-50":"border-gray-300 bg-gray-50 hover:border-[#00CC2C] hover:bg-green-50"}`,children:k?e.jsxs(e.Fragment,{children:[e.jsx(te,{className:"w-8 h-8 text-green-500"}),e.jsx("p",{className:"text-sm font-medium text-green-600",children:st}),e.jsx("p",{className:"text-xs text-gray-400",children:"Appuyez pour changer"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Xt,{className:"w-8 h-8 text-gray-400"}),e.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Appuyez pour ajouter la capture"}),e.jsx("p",{className:"text-xs text-gray-400",children:"JPG, PNG — max 5 Mo"})]})}),k&&e.jsx("div",{className:"mt-3 rounded-xl overflow-hidden border border-gray-100",children:e.jsx("img",{src:k,alt:"Capture",className:"w-full max-h-52 object-contain bg-gray-50"})})]}),e.jsx("button",{onClick:qt,disabled:me.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-50",style:{background:x},children:me.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Envoi en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(rr,{className:"w-5 h-5"})," Soumettre ma demande"]})})]})]}):c==="westpay"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("header",{className:"flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{className:"flex items-center gap-1 text-gray-800",onClick:()=>a("select"),children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:Q})]})}),e.jsxs("div",{className:"p-4 space-y-5 pb-10",children:[e.jsxs("div",{className:"mx-0 rounded-xl p-4 border border-orange-100 bg-orange-50 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#00CC2C]",children:[Number(o).toLocaleString()," ",u]})]}),e.jsx("button",{onClick:()=>a("amount"),className:"text-xs text-[#00CC2C] underline",children:"Modifier"})]}),e.jsxs("div",{className:"rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(er,{className:"w-5 h-5 text-[#00CC2C]"}),e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:"Comment ça marche ?"})]}),e.jsxs("p",{className:"text-xs text-gray-600 leading-relaxed",children:["1. Cliquez ",e.jsxs("strong",{children:["Payer avec ",Q]})," — vous serez redirigé vers la page de paiement sécurisée."]}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"2. Entrez votre numéro Mobile Money et validez le paiement USSD depuis votre téléphone."}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"3. Après paiement, vous serez automatiquement redirigé ici. Votre solde est crédité après confirmation."})]}),e.jsx("button",{onClick:()=>z.mutate(),disabled:z.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-40 flex items-center justify-center gap-2",style:{background:x},children:z.isPending?e.jsxs(e.Fragment,{children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Redirection en cours..."]}):e.jsxs(e.Fragment,{children:[e.jsx(M,{className:"w-5 h-5"})," Payer avec ",Q]})}),e.jsxs("p",{className:"text-xs text-center text-gray-400",children:["Paiement sécurisé via ",Q," — USSD Mobile Money"]})]})]}):c==="ashtech-operator"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsxs("header",{className:"flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100",children:[e.jsxs("button",{className:"flex items-center gap-1 text-gray-800",onClick:()=>a("select"),children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:Ge})]}),e.jsx(D,{href:"/history",children:e.jsx("button",{className:"text-xs text-[#00CC2C] font-semibold px-3 py-1.5 rounded-full border border-[#00CC2C]",children:"Historique"})})]}),e.jsxs("div",{className:"mx-4 mt-4 rounded-xl p-4 border border-orange-100 bg-orange-50 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#00CC2C]",children:[Number(o).toLocaleString()," ",u]})]}),e.jsx("button",{onClick:()=>a("amount"),className:"text-xs text-[#00CC2C] underline",children:"Modifier"})]}),e.jsxs("div",{className:"p-4 space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),It?e.jsx(f,{className:"w-6 h-6 animate-spin text-[#00CC2C] mx-auto"}):Ke?e.jsxs("div",{className:"rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700",children:[e.jsx("p",{children:"Impossible de charger les pays et opérateurs AshtechPay."}),e.jsx("button",{type:"button",onClick:()=>{Lt()},className:"mt-2 font-semibold underline",children:"Réessayer"})]}):Y.length===0?e.jsx(ye,{size:"compact",className:"text-sm text-gray-400 text-center py-5",children:"Aucun pays AshtechPay actif n’est disponible."}):e.jsx("select",{value:_e,onChange:t=>{ut(t.target.value),Re("")},className:"w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 outline-none bg-white appearance-none",children:Y.map(t=>e.jsxs("option",{value:t.code,children:[t.name," (",t.currency,")"]},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"border border-gray-300 rounded-md flex items-center overflow-hidden bg-white",children:[e.jsx(X,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:W,onChange:t=>mt(t.target.value),placeholder:"Votre numéro Mobile Money",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),Ke?null:He.length===0?e.jsx(ye,{size:"compact",className:"text-sm text-gray-400 text-center py-5",children:"Aucun opérateur disponible pour ce pays"}):e.jsx("div",{className:"space-y-2",children:He.map((t,r)=>{const n=typeof t=="string"?t:t.name||t.code||`Opérateur ${r+1}`;return e.jsxs("button",{onClick:()=>Re(n),className:`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 ${T===n?"border-[#00CC2C] bg-green-50":"border-gray-200 bg-white"}`,children:[e.jsx("span",{className:"font-semibold text-gray-900 text-sm",children:n}),T===n&&e.jsx(te,{className:"w-5 h-5 text-[#00CC2C]"})]},`${n}-${r}`)})})]}),e.jsx("button",{onClick:()=>E.mutate(void 0),disabled:!T||!W.trim()||E.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-40",style:{background:x},children:E.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):"Initier le paiement"})]})]}):c==="ashtech-otp"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{onClick:()=>a("ashtech-operator"),className:"flex items-center gap-1 text-gray-800",children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Code OTP"})]})}),e.jsxs("div",{className:"p-4 space-y-5 pb-10",children:[e.jsxs("div",{className:"rounded-2xl border-2 border-orange-200 bg-orange-50 p-4",children:[e.jsx("p",{className:"font-bold text-gray-900 text-sm mb-2",children:"Code à composer"}),de&&e.jsx("p",{className:"bg-white rounded-xl border border-orange-200 px-4 py-3 text-center font-mono font-black text-2xl text-[#00CC2C] tracking-widest",children:de}),e.jsx("p",{className:"text-sm text-gray-600 mt-3",children:de?"Composez ce code sur votre téléphone pour obtenir le code OTP, puis saisissez-le ci-dessous.":"Un code OTP vous a été envoyé. Saisissez-le ci-dessous."})]}),e.jsx("input",{type:"text",inputMode:"numeric",value:le,onChange:t=>Te(t.target.value),maxLength:8,placeholder:"Code OTP reçu par SMS",className:"w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none bg-white focus:border-[#00CC2C]"}),e.jsx("button",{onClick:()=>E.mutate(le),disabled:!le.trim()||E.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-40",style:{background:x},children:E.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="ashtech-redirect"?e.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{onClick:()=>a("ashtech-operator"),className:"flex items-center gap-1 text-gray-800",children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center",children:e.jsx(M,{className:"w-10 h-10 text-[#00CC2C]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser avec Wave"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Ouvrez la page Wave pour confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",u]}),"."]})]}),e.jsxs("a",{href:xt,target:"_blank",rel:"noopener noreferrer",onClick:()=>{U(!0),a("ashtech-waiting")},className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg flex items-center justify-center gap-2",style:{background:x},children:[e.jsx(M,{className:"w-5 h-5"})," Ouvrir Wave"]})]})]}):c==="ashtech-waiting"?e.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center",children:e.jsx(ee,{className:"w-10 h-10 text-[#00CC2C] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Validez le paiement sur votre téléphone. Cette page se met à jour automatiquement."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(D,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"w-full py-3 rounded-full border border-[#00CC2C] text-[#00CC2C] font-semibold text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{a("amount"),v(""),_(null),U(!1),H("")},className:"flex-1 py-3 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm",children:"Nouvelle recharge"})]})]})]}):c==="sv-operator"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsxs("header",{className:"flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100",children:[e.jsxs("button",{className:"flex items-center gap-1 text-gray-800",onClick:()=>a("amount"),children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Top up"})]}),e.jsx(D,{href:"/history",children:e.jsx("button",{className:"text-xs text-[#00CC2C] font-semibold px-3 py-1.5 rounded-full border border-[#00CC2C]",children:"Historique"})})]}),e.jsxs("div",{className:"mx-4 mt-4 rounded-xl p-4 border border-orange-100 bg-orange-50 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#00CC2C]",children:[Number(o).toLocaleString()," ",u]})]}),e.jsx("button",{onClick:()=>a("amount"),className:"text-xs text-[#00CC2C] underline",children:"Modifier"})]}),e.jsxs("div",{className:"p-4 space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),e.jsx("select",{value:S,onChange:t=>{nt(t.target.value),O(null)},className:"w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 outline-none bg-white appearance-none",children:P.map(t=>e.jsx("option",{value:t.code,children:t.name},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"border border-gray-300 rounded-md flex items-center overflow-hidden bg-white",children:[e.jsx(X,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:ne,onChange:t=>at(t.target.value),placeholder:"Numéro sur lequel envoyer la demande",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),Et?e.jsx("div",{className:"flex items-center justify-center py-8",children:e.jsx(f,{className:"w-6 h-6 animate-spin text-[#00CC2C]"})}):Be.length===0?e.jsx("div",{className:"text-center py-8 text-gray-400",children:e.jsx(ye,{size:"compact",className:"text-sm",children:"Aucun opérateur disponible pour ce pays"})}):e.jsx("div",{className:"space-y-2",children:Be.map(t=>{const r=Ut(t.name);return e.jsxs("button",{onClick:()=>O(t),className:`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 transition-all ${b?.id===t.id?"border-[#00CC2C] bg-green-50":"border-gray-200 bg-white hover:border-green-200"}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[r?e.jsx("img",{src:r,alt:t.name,className:"w-10 h-10 rounded-full object-cover border border-gray-100"}):e.jsx("div",{className:`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${b?.id===t.id?"bg-[#00CC2C] text-white":"bg-gray-100 text-gray-600"}`,children:t.name.charAt(0)}),e.jsxs("div",{className:"text-left",children:[e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:t.name}),t.requiresOtp&&e.jsx("p",{className:"text-xs text-[#00CC2C]",children:"Code OTP requis"})]})]}),b?.id===t.id&&e.jsx(te,{className:"w-5 h-5 text-[#00CC2C]"})]},t.id)})})]}),e.jsx("button",{onClick:()=>ge.mutate(),disabled:!b||ge.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-40",style:{background:x},children:ge.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx("img",{src:"/topup-icon.png",className:"w-6 h-6 object-contain",alt:"topup"})," Initier le paiement"]})})]})]}):c==="sv-otp"?e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{onClick:()=>a("sv-operator"),className:"flex items-center gap-1 text-gray-800",children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Code OTP"})]})}),e.jsxs("div",{className:"p-4 space-y-5 pb-10",children:[e.jsxs("div",{className:"rounded-2xl border-2 border-orange-200 bg-orange-50 p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#00CC2C] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"1"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Composez ce code sur votre téléphone"})]}),Ie?e.jsxs("div",{className:"bg-white rounded-xl border border-orange-200 px-4 py-3 text-center",children:[e.jsx("p",{className:"font-mono font-black text-2xl text-[#00CC2C] tracking-widest",children:Ie}),e.jsx("p",{className:"text-xs text-gray-400 mt-1",children:"Composez ce code USSD sur votre téléphone"})]}):e.jsxs("p",{className:"text-sm text-gray-600",children:["Composez le code USSD de votre opérateur (ex : ",e.jsx("span",{className:"font-mono font-bold text-[#00CC2C]",children:"*144#"}),") sur votre téléphone pour recevoir le code OTP par SMS."]})]}),e.jsxs("div",{className:"rounded-2xl border-2 border-orange-100 bg-orange-50 p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#00CC2C] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"2"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Entrez le code OTP reçu par SMS"})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-3",children:["Après avoir composé le code, vous recevrez un SMS avec un code OTP. Saisissez-le ci-dessous pour confirmer le paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",u]}),"."]}),e.jsx("input",{type:"text",inputMode:"numeric",value:oe,onChange:t=>ce(t.target.value),placeholder:"Code OTP reçu par SMS",className:"w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none bg-white focus:border-[#00CC2C]",maxLength:8})]}),e.jsx("button",{onClick:()=>be.mutate(),disabled:!oe.trim()||be.isPending,className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg disabled:opacity-40",style:{background:x},children:be.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(f,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="sv-redirect"?e.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsxs("button",{onClick:()=>a("sv-operator"),className:"flex items-center gap-1 text-gray-800",children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center",children:e.jsx(M,{className:"w-10 h-10 text-[#00CC2C]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser sur l'application"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Appuyez sur le bouton ci-dessous pour ouvrir la page de paiement de l'opérateur et confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",u]}),"."]})]}),e.jsxs("a",{href:lt,target:"_blank",rel:"noopener noreferrer",className:"w-full py-5 rounded-full text-white font-bold text-base shadow-lg flex items-center justify-center gap-2",style:{background:x},onClick:()=>{y(!0),a("sv-waiting")},children:[e.jsx(M,{className:"w-5 h-5"})," Ouvrir la page de paiement"]})]})]}):c==="sv-waiting"?e.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[e.jsx("header",{className:"flex items-center gap-2 px-4 py-4 bg-white border-b border-gray-100",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsx("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:Le==="approved"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-green-100 flex items-center justify-center",children:e.jsx(te,{className:"w-10 h-10 text-green-500"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement confirmé !"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-1",children:["Votre solde a été crédité de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",u]})]})]})]}):Le==="rejected"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-red-100 flex items-center justify-center",children:e.jsx(ee,{className:"w-10 h-10 text-red-400"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement échoué"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Le paiement a été refusé ou annulé."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[ae&&e.jsxs("button",{onClick:()=>fe.mutate(),disabled:fe.isPending,className:"flex-1 py-3 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50",style:{background:x},children:[fe.isPending?e.jsx(f,{className:"w-4 h-4 animate-spin"}):e.jsx(ee,{className:"w-4 h-4"}),"Réessayer"]}),e.jsx("button",{onClick:()=>{a("amount"),v(""),O(null),B(null),K(""),y(!1),R("")},className:"flex-1 py-3 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm",children:"Nouvelle recharge"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center",children:e.jsx(ee,{className:"w-10 h-10 text-[#00CC2C] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Une demande de paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",u]})," a été envoyée sur votre téléphone.",e.jsx("br",{}),"Acceptez-la sur votre téléphone. Cette page se met à jour automatiquement."]})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(D,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"w-full py-3 rounded-full border border-[#00CC2C] text-[#00CC2C] font-semibold text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{a("amount"),v(""),O(null),B(null),K(""),y(!1),R("")},className:"flex-1 py-3 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm",children:"Nouvelle recharge"})]})]})})]}):null:null}export{Pr as default};
