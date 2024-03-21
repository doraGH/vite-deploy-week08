import{S}from"./sweetalert2.all-GaRjTAm_.js";import{_ as y,o as l,c as u,b as t,q as p,v as _,I as L,t as m,f as v,i as r,r as b,d as g,F as $,j as T,h as M}from"./index-hv3GUEaf.js";import{P as V}from"./PaginationComponent-x3k5vaF0.js";import{m as D}from"./modalMixin-4SYX1_58.js";const N={props:["isNew","tempCoupon"],emits:["update-coupon"],mixins:[D],data(){return{editCoupon:{data:{}},due_date:""}},mounted(){this.editCoupon=this.tempCoupon,this.setDueDate()},methods:{setDueDate(){if(this.isNew===!0)this.due_date=this.getCurrentDate();else{const o=new Date(this.tempCoupon.data.due_date*1e3),e=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),a=String(o.getDate()).padStart(2,"0");this.due_date=`${e}-${s}-${a}`}},getCurrentDate(){const o=new Date,e=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),a=String(o.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}},watch:{tempCoupon:{handler(){this.editCoupon=this.tempCoupon;const o=new Date(this.editCoupon.data.due_date*1e3).toISOString().split("T");[this.due_date]=o},deep:!0},due_date(){this.editCoupon.data.due_date=Math.floor(new Date(this.due_date)/1e3)}}},U={class:"modal fade",id:"couponModal",ref:"modal",tabindex:"-1","aria-labelledby":"couponModalLabel","aria-hidden":"true"},P={class:"modal-dialog"},E={class:"modal-content"},I={class:"modal-header bg-dark text-white"},B={class:"modal-title",id:"couponModalLabel"},A={key:0},F={key:1},R=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),j={class:"modal-body"},O={class:"mb-3"},Y=t("label",{for:"title"},"標題",-1),H={class:"mb-3"},q=t("label",{for:"coupon_code"},"優惠碼",-1),z={class:"mb-3"},G=t("label",{for:"due_date"},"到期日",-1),J={class:"mb-3"},K=t("label",{for:"percent"},"折扣百分比",-1),Q={class:"mb-3"},W={class:"form-check"},X=t("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),Z={class:"modal-footer"},tt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消",-1);function et(o,e,s,a,n,i){return l(),u("div",U,[t("div",P,[t("div",E,[t("div",I,[t("h5",B,[s.isNew?(l(),u("span",A,"新增優惠卷")):(l(),u("span",F,"編輯優惠卷"))]),R]),t("div",j,[t("div",O,[Y,p(t("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":e[0]||(e[0]=d=>n.editCoupon.data.title=d)},null,512),[[_,n.editCoupon.data.title]])]),t("div",H,[q,p(t("input",{id:"coupon_code",type:"text",class:"form-control",placeholder:"請輸入優惠碼","onUpdate:modelValue":e[1]||(e[1]=d=>n.editCoupon.data.code=d)},null,512),[[_,n.editCoupon.data.code]])]),t("div",z,[G,p(t("input",{id:"due_date",type:"date",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=d=>n.due_date=d)},null,512),[[_,n.due_date]])]),t("div",J,[K,p(t("input",{id:"percent",type:"number",class:"form-control",min:"0",placeholder:"請輸入折扣百分比","onUpdate:modelValue":e[3]||(e[3]=d=>n.editCoupon.data.percent=d)},null,512),[[_,n.editCoupon.data.percent,void 0,{number:!0}]])]),t("div",Q,[t("div",W,[p(t("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[4]||(e[4]=d=>n.editCoupon.data.is_enabled=d),"true-value":1,"false-value":0},null,512),[[L,n.editCoupon.data.is_enabled]]),X])])]),t("div",Z,[tt,t("button",{type:"button",class:"btn btn-primary",onClick:e[5]||(e[5]=d=>o.$emit("update-coupon",n.editCoupon))},m(s.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const ot=y(N,[["render",et]]),nt={props:{item:Object},emits:["del-item"],mixins:[D]},st={class:"modal fade",id:"delModal",ref:"modal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},at={class:"modal-dialog"},dt={class:"modal-content border-0"},it=t("div",{class:"modal-header bg-danger text-white"},[t("h5",{class:"modal-title"},[t("span",null,"刪除")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),lt={class:"modal-body"},ut={class:"text-danger"},ct={class:"modal-footer"},rt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function pt(o,e,s,a,n,i){return l(),u("div",st,[t("div",at,[t("div",dt,[it,t("div",lt,[v(" 是否刪除 "),t("strong",ut,m(s.item.data),1),v(" (刪除後將無法恢復)。 ")]),t("div",ct,[rt,t("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=d=>o.$emit("del-item"))}," 確認刪除 ")])])])],512)}const mt=y(nt,[["render",pt]]);var ht={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"dorayu",BASE_URL:"/vite-deploy-week08/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f,VITE_PATH:C}=ht,_t={data(){return{coupons:[],pagination:{},tempCoupon:{data:{}},isNew:!0,isLoading:!1,fieldTranslation:{title:"標題",percent:"折扣百分比",code:"優惠碼"}}},components:{PaginationComponent:V,CouponModal:ot,DelModal:mt},methods:{openCouponModal(o,e){o==="createNew"?(this.isNew=!0,this.tempCoupon.data={due_date:Math.floor(new Date().getTime()/1e3),is_enabled:0},this.$refs.couponModal.openModal(),this.$refs.couponModal.setDueDate()):o==="edit"?(this.isNew=!1,this.tempCoupon.data={...e},this.$refs.couponModal.openModal(),this.$refs.couponModal.setDueDate()):o==="delete"&&(this.tempCoupon.data={...e},this.$refs.delModal.openModal())},formatDate(o){return new Date(o*1e3).toLocaleDateString()},getCoupons(o=1){this.isLoading=!0;const e=`${f}/api/${C}/admin/coupons?page=${o}`;this.axios.get(e).then(s=>{const{coupons:a,pagination:n}=s.data;this.coupons=a,this.pagination=n,this.isLoading=!1,r.success("成功取得優惠券")}).catch(s=>{this.isLoading=!1,r.error(s.response.data.message)})},updateCoupon(o){this.isLoading=!0;let e=`${f}/api/${C}/admin/coupon`,s="post",a=o;this.isNew||(e+=`/${this.tempCoupon.data.id}`,s="put",a=this.tempCoupon),this.axios[s](e,a).then(n=>{this.isLoading=!1,r.success(n.data.message),this.getCoupons(),this.$refs.couponModal.hideModal()}).catch(n=>{this.isLoading=!1;let i=Array.isArray(n.response.data.message)?n.response.data.message.join(`
`):n.response.data.message;i=i.replace(/(\w+) 欄位/g,(d,h)=>`${this.fieldTranslation[h]||h} 欄位`),r.error(i)})},delCoupon(o){const e=`${f}/api/${C}/admin/coupon/${o.id}`;S.fire({title:`確定要刪除<span class="text-danger">${o.title}</span>嗎?`,showDenyButton:!0,confirmButtonText:"是，我要刪除",denyButtonText:"不要刪除"}).then(s=>{s.isConfirmed&&this.axios.delete(e).then(a=>{this.getCoupons(),r.success(a.data.message)}).catch(a=>{r.error(a.response.data.message)})})},getCurrentDate(){const o=new Date,e=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),a=String(o.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}},mounted(){this.getCoupons()}},bt={class:"container"},gt={class:"d-flex justify-content-between mt-4"},ft=t("h2",null,"優惠卷列表",-1),Ct={class:"table mt-4"},yt=t("thead",null,[t("tr",null,[t("th",null,"名稱"),t("th",null,"折扣百分比"),t("th",null,"到期日"),t("th",null,"是否啟用"),t("th",null,"編輯")])],-1),vt={key:0,class:"text-success"},$t={key:1,class:"text-muted"},Mt={class:"btn-group"},Dt=["onClick"],wt=["onClick"];function xt(o,e,s,a,n,i){const d=b("VueLoading"),h=b("PaginationComponent"),w=b("CouponModal"),x=b("DelModal");return l(),u($,null,[g(d,{active:n.isLoading},null,8,["active"]),t("div",bt,[t("div",gt,[ft,t("button",{class:"btn btn-primary",onClick:e[0]||(e[0]=c=>i.openCouponModal("createNew"))}," 建立新的優惠卷 ")]),t("table",Ct,[yt,t("tbody",null,[(l(!0),u($,null,T(n.coupons,c=>(l(),u("tr",{key:c.id},[t("td",null,m(c.title),1),t("td",null,m(c.percent)+" %",1),t("td",null,m(i.formatDate(c.due_date)),1),t("td",null,[c.is_enabled===1?(l(),u("span",vt,"啟用")):(l(),u("span",$t,"未啟用"))]),t("td",null,[t("div",Mt,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:M(k=>i.openCouponModal("edit",c),["prevent"])},"編輯",8,Dt),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:M(k=>i.delCoupon(c),["prevent"])},"刪除",8,wt)])])]))),128))])]),g(h,{pages:n.pagination,onChangePage:i.getCoupons},null,8,["pages","onChangePage"])]),g(w,{ref:"couponModal","is-new":n.isNew,"temp-coupon":n.tempCoupon,onUpdateCoupon:i.updateCoupon},null,8,["is-new","temp-coupon","onUpdateCoupon"]),g(x,{ref:"delModal",item:n.tempCoupon,onDelItem:i.delCoupon},null,8,["item","onDelItem"])],64)}const Vt=y(_t,[["render",xt]]);export{Vt as default};