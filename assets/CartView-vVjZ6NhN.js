import{_ as V,m as S,a as T,i as E,r as u,o,c as a,d as P,b as t,n as m,F as b,j,f as l,t as c,q as g,v as f,g as v,k as p,w as y,e as A}from"./index-hv3GUEaf.js";import{S as C}from"./sweetalert2.all-GaRjTAm_.js";import{c as L}from"./cartStore-jKO-w4ec.js";var B={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"dorayu",BASE_URL:"/vite-deploy-week08/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:N,VITE_PATH:R}=B,U={data(){return{couponCode:""}},computed:{...S(L,["cartList","status","isLoading","cartsLengthComputed","finalPrice"])},methods:{...T(L,["getCarts","deleteAllCarts","removeCartItem","updateCart"]),useCoupon(){const s=`${N}/api/${R}/coupon`,n={code:this.couponCode};this.cartList.total>=500?this.axios.post(s,{data:n}).then(d=>{E.success(d.data.message),this.couponCode="",this.getCarts()}).catch(d=>{C.fire(d.response.data.message),this.couponCode=""}):(C.fire("總額不足500元,不能使用喔!"),this.couponCode="")}},mounted(){this.getCarts(),this.cartsLength=this.cartsLengthComputed}},I={class:"container g-wrapper"},D=A('<div class="row d-flex justify-content-between align-items-center border-bottom py-4 my-5"><h2 class="cart-title col-12 col-md-2">購物車</h2><div class="cart-step col-12 col-md-10"><div class="box current"><span class="deco">STEP1</span>購物車 </div><div class="box"><span class="deco">STEP2</span>訂購資訊 </div><div class="box"><span class="deco">STEP3</span>確認付款 </div></div></div>',1),$={class:"row"},q={class:"col-12 col-lg-7"},M={class:"d-flex justify-content-between align-items-center mb-4"},F=t("h5",null,"購物清單",-1),H={key:0},O={class:"table align-middle"},Q=t("thead",{class:"table-dark"},[t("tr",null,[t("th"),t("th",null,"圖片"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",{class:"text-end"},"單價")])],-1),z=["disabled","onClick"],G=["src"],J={class:"input-group input-group-sm"},K={class:"input-group"},W=["onUpdate:modelValue","onBlur"],X={class:"input-group-text",id:"basic-addon2"},Y={class:"text-end"},Z={key:1,class:"bg-light my-4 p-4"},tt={class:"col-12 col-lg-5 p-lg-5"},st={class:"bg-light my-4 p-4"},et={class:"border-bottom border-dark"},ot={class:"d-flex justify-content-between"},nt=t("p",null,"小計：",-1),at={class:"text-notoSans"},ct={class:"d-flex justify-content-between mb-4"},lt=t("p",{class:"text-nowrap"},"優惠碼：",-1),dt={class:"d-flex justify-content-end"},it={class:"d-flex justify-content-between my-3"},rt=t("p",{class:"fw-bold"},"合計：",-1),ut={class:"fw-bold text-end"},pt={class:"text-notoSans fs-4"},ht={key:0,class:"d-flex text-danger"};function _t(s,n,w,d,i,h){const k=u("VueLoading"),x=u("font-awesome-icon"),_=u("RouterLink");return o(),a(b,null,[P(k,{active:s.isLoading},null,8,["active"]),t("div",I,[D,t("div",$,[t("div",q,[t("div",M,[F,t("button",{class:m(["btn btn-outline-danger",{disabled:s.cartsLengthComputed===0}]),type:"button",onClick:n[0]||(n[0]=(...e)=>s.deleteAllCarts&&s.deleteAllCarts(...e))},"清空購物車",2)]),this.cartList.carts&&this.cartList.carts.length>0?(o(),a("div",H,[t("table",O,[Q,t("tbody",null,[(o(!0),a(b,null,j(s.cartList.carts,e=>(o(),a("tr",{key:e.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",disabled:e.id===s.status.loadQty,onClick:r=>s.removeCartItem(e.id)},[e.id===s.status.loadQty?(o(),p(x,{key:0,icon:["fas","spinner"],"spin-pulse":""})):v("",!0),l(" x ")],8,z)]),t("td",null,[t("img",{class:"img-cart",src:e.product.imageUrl,alt:""},null,8,G)]),t("td",null,c(e.product.title),1),t("td",null,[t("div",J,[t("div",K,[g(t("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":r=>e.qty=r,onBlur:r=>s.updateCart(e)},null,40,W),[[f,e.qty,void 0,{number:!0}]]),t("span",X,c(e.product.unit),1)])])]),t("td",Y,c(e.product.price),1)]))),128))])])])):(o(),a("div",Z,"購物車沒有任何品項"))]),t("div",tt,[t("div",st,[t("div",et,[t("div",ot,[nt,t("p",null,[l("NT$ "),t("span",at,c(s.cartList.total),1)])]),t("div",ct,[lt,t("div",dt,[g(t("input",{type:"text",class:"form-control w-50 border-gray","onUpdate:modelValue":n[1]||(n[1]=e=>i.couponCode=e)},null,512),[[f,i.couponCode]]),t("button",{class:m(["btn btn-secondary text-light ms-8",{disabled:i.couponCode===""}]),type:"button",onClick:n[2]||(n[2]=(...e)=>h.useCoupon&&h.useCoupon(...e))},"套用",2)])])]),t("div",it,[rt,t("p",ut,[l(" NT$ "),t("span",pt,c(Math.round(s.cartList.final_total)),1),s.cartList.carts&&s.cartList.carts.length>0&&s.cartList.carts[0].coupon?(o(),a("span",ht," (已使用"+c(s.cartList.carts[0].coupon.title)+")",1)):v("",!0)])]),s.cartsLengthComputed>0?(o(),p(_,{key:0,to:"/cartcheck",class:"btn btn-primary text-white w-100"},{default:y(()=>[l("下一步")]),_:1})):(o(),p(_,{key:1,to:"/products",class:"btn btn-secondary text-white w-100"},{default:y(()=>[l(" 將商品加入購物車")]),_:1}))])])])])],64)}const ft=V(U,[["render",_t]]);export{ft as default};