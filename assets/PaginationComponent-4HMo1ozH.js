import{_,o as i,a as r,b as e,n as g,w as l,F as p,d,t as u}from"./index-ADMgmOFv.js";const h={props:["pages"],methods:{changePage(c){this.$emit("change-page",c)}}},m={"aria-label":"Page navigation example"},k={class:"pagination justify-content-center"},v=e("span",{"aria-hidden":"true"},"«",-1),P=[v],f=["onClick"],b=e("span",{"aria-hidden":"true"},"»",-1),C=[b];function x(c,n,a,y,B,s){return i(),r("nav",m,[e("ul",k,[e("li",{class:g(["page-item",{disabled:a.pages.current_page===1}])},[e("a",{class:"page-link","aria-label":"Previous",onClick:n[0]||(n[0]=l(t=>s.changePage(a.pages.current_page-1),["prevent"]))},P)],2),(i(!0),r(p,null,d(a.pages.total_pages,(t,o)=>(i(),r("li",{class:g(["page-item",{active:t===a.pages.current_page}]),key:o},[e("a",{class:"page-link",onClick:l(w=>s.changePage(t),["prevent"])},u(t),9,f)],2))),128)),e("li",{class:g(["page-item",{disabled:a.pages.current_page===a.pages.total_pages}])},[e("a",{class:"page-link","aria-label":"Next",onClick:n[1]||(n[1]=l(t=>s.changePage(a.pages.current_page+1),["prevent"]))},C)],2)])])}const N=_(h,[["render",x]]);export{N as P};
