(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4],{1004:function(t,e,r){"use strict";r.r(e);r(115),r(104),r(106),r(87),r(105),r(150),r(88),r(151);var o=r(20),n=r(75);r(78),r(44),r(85),r(86),r(983),r(614),r(178);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={components:{Icons:r(947).default},data:function(){return{mynomer:null,tab:"myorder",form3:{},name:null,orders:[],loading:!1,img:null}},methods:{category:function(t){return"CARD"==t?"Визитка":"BANNER"==t?"Баннер":"CATALOG"==t?"Каталог":"BOOK"==t?"Книга":"STAND"==t?"Стенд":"CLOTHEPRINT"==t?"Одежда печать":"FLYER"==t?"Флаер":"OTHER"==t?"Другие":"-"},changetab:function(t){this.tab=t,this.$router.push({query:c(c({},this.$route.query),{},{tab:t})})},addImg:function(t){this.img=URL.createObjectURL(t.target.files[0]),this.form3.image=t.target.files[0]},sendForm2:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(localStorage&&localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")))){e.next=6;break}return data={name:t.name},e.next=5,t.$axios.put("/api/users/"+t.$store.state.user._id,data).then((function(e){e&&e.data?(t.$message.success("Успешно"),setTimeout((function(){t.$router.go()}),1e3)):t.$message.error("Что-то пошло не так")}));case 5:t.$router.go();case 6:case"end":return e.stop()}}),e)})))()},submit:function(){}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("sdfsf"),t.loading=!1,t.tab=t.$route.query.tab||"myorder",t.user=localStorage&&localStorage.getItem("access_token")&&JSON.parse(localStorage.getItem("access_token")),e.t0=t.user,!e.t0){e.next=8;break}return e.next=8,t.$axios.get("/api/users/"+t.user.id).then((function(e){t.$store.state.user=e&&e.data&&e.data.result}));case 8:if(t.$store.state.user&&(t.name=t.$store.state.user.name),t.$store.state.user&&t.$store.state.user.organization&&(t.form3.name=t.$store.state.user.organization.name,t.form3.phoneNumber=t.$store.state.user.organization.phoneNumber,t.form3.address=t.$store.state.user.organization.address),e.t1=t.user,!e.t1){e.next=14;break}return e.next=14,t.$axios.get("/api/users/"+t.$store.state.user._id+"/orders").then((function(e){t.orders=e&&e.data&&e.data.result}));case 14:t.loading=!0,console.log("user"),console.log(t.user);case 17:case"end":return e.stop()}}),e)})))()},filters:{dateFilter:function(t){if(t){var e=new Date(t),r=("0"+e.getDate()).slice(-2)+"."+("0"+(e.getMonth()+1)).slice(-2)+"."+e.getFullYear();return("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)+" "+r}return"-"}}},v=r(53),component=Object(v.a)(d,(function(){var t,e,o,n,l,c,d,v,m=this,f=m._self._c;return f("div",{staticClass:"section"},[f("div",{staticClass:"container"},[m.loading?f("div",{staticClass:"form mh-80v"},[m._m(0),m._v(" "),f("div",{staticClass:"flex mv_w items-center flex-wrap gap-8 mb-24 profil_tab"},[f("button",{staticClass:"flex",class:{active:"myorder"==m.tab},on:{click:function(t){return m.changetab("myorder")}}},[m._v("\n          Мои заявки "),f("Icons",{attrs:{color:"#FF5C00",icon:"myorder"}})],1),m._v(" "),f("button",{staticClass:"flex",class:{active:"settings"==m.tab},on:{click:function(t){return m.changetab("settings")}}},[m._v("\n          Настройки "),f("Icons",{attrs:{color:"white",icon:"settings"}})],1),m._v(" "),f("button",{staticClass:"flex",class:{active:"performer"==m.tab},on:{click:function(t){return m.changetab("performer")}}},[m._v("\n          Я - Исполнитель "),f("Icons",{attrs:{icon:"settings"}})],1)]),m._v(" "),"myorder"==m.tab?f("div",[(null===(t=m.$store.state.user)||void 0===t?void 0:t.orders)>0?f("h1",{staticClass:"mt-40 mb-60 h-40v"},[m._v("\n          У вас пока нет заявки\n        ")]):m._e(),m._v(" "),m._l(null===(e=m.$store.state.user)||void 0===e?void 0:e.orders,(function(t,e){var r,o,n,l;return f("div",{key:e,staticClass:"form_block mb-16"},[f("div",{staticClass:"form_order_info w-screen"},[f("div",{staticClass:"flex items-center mv_flex-col gap-16"},[f("div",{staticClass:"profile_status",class:null==t||null===(r=t.status)||void 0===r?void 0:r.key},[m._v("\n                "+m._s(null==t||null===(o=t.status)||void 0===o?void 0:o.value)+"\n              ")]),m._v(" "),f("div",{staticClass:"flex gap-16 items-center mv_justify-between mv_w-screen"},[f("div",{staticClass:"publication_date"},[f("span",{staticClass:"opacity-05"},[m._v("Опубликовано:")]),m._v(" "),f("p",[m._v(m._s(m._f("dateFilter")(null==t?void 0:t.date)))])]),m._v(" "),null!=t&&t.id?f("div",{staticClass:"publication_date"},[f("span",{staticClass:"opacity-05"},[m._v("ID заказа")]),m._v(" "),f("p",[m._v("#"+m._s(null==t?void 0:t.id))])]):m._e()])]),m._v(" "),f("div",{staticClass:"hr"}),m._v(" "),f("div",{staticClass:"w-screen flex gap-16"},[t.images&&t.images.length>2?f("div",{staticClass:"home_order_wimg"},[m._l(t.images.slice(0,3),(function(img,t){return f("img",{key:t,attrs:{src:img.image,alt:""}})})),m._v(" "),t.images&&t.images.length>3?f("div",[m._v("+3")]):m._e()],2):m._e(),m._v(" "),f("div",{staticClass:"flex flex-col gap-8 w-screen"},[f("nuxt-link",{staticClass:"form_order_info_type",attrs:{tag:"span",to:{path:"/order",query:{category:null==t||null===(n=t.category)||void 0===n?void 0:n.title}}}},[m._v(m._s(null==t||null===(l=t.category)||void 0===l?void 0:l.title))]),m._v(" "),f("h4",[m._v(m._s(null==t?void 0:t.title))]),m._v(" "),f("span",{staticClass:"dv mt-8",domProps:{innerHTML:m._s(null==t?void 0:t.desc)}})],1)])]),m._v(" "),f("span",{staticClass:"mv mt-8",domProps:{innerHTML:m._s(null==t?void 0:t.desc)}}),m._v(" "),f("div",{staticClass:"flex justify-between mv_flex-col items-center mt-41 mv_mt-18 w-screen"},[f("div",{staticClass:"flex gap-16"},[f("div",{staticClass:"flex items-center gap-8"},[f("Icons",{attrs:{color:"#5D5D5F",icon:"eye"}}),m._v("\n                "+m._s(t.views)+"\n              ")],1),m._v(" "),f("div",{staticClass:"flex items-center gap-8"},[f("Icons",{attrs:{color:"#5D5D5F",icon:"message"}}),m._v("\n                "+m._s(t.offers_count)+" запросов\n              ")],1)]),m._v(" "),f("div",{staticClass:"flex gap-16 mv_flex-col-rev mv_w-screen mv_mt-24 items-center"},[f("nuxt-link",{attrs:{to:"/profile/".concat(t.id)}},[m._v("Подробнее")]),m._v(" "),f("nuxt-link",{staticClass:"flex order show mv_w-screen",attrs:{to:"/profile/".concat(t.id)}},[f("div",{staticClass:"show_text"},[m._v("Просмотреть")]),m._v(" "),f("Icons",{attrs:{color:"#3C4BDC",icon:"success"}})],1)],1)])])}))],2):m._e(),m._v(" "),"settings"==m.tab?f("div",{staticClass:"form_block"},[f("h4",[m._v("Мои данные")]),m._v(" "),f("div",{staticClass:"form_other_info w-50 mv_w-screen"},[f("label",{attrs:{for:"textarea"}},[m._v("Имя")]),m._v(" "),f("input",{directives:[{name:"model",rawName:"v-model",value:m.name,expression:"name"}],attrs:{placeholder:"Дополнительная информация"},domProps:{value:m.name},on:{input:function(t){t.target.composing||(m.name=t.target.value)}}})]),m._v(" "),f("div",{staticClass:"flex justify-between items-center mt-41 w-70 mv_w-screen"},[f("button",{staticClass:"flex order signin mv_w-screen",on:{click:m.sendForm2}},[f("div",{staticClass:"signin_text"},[m._v("Сохранить")]),m._v(" "),f("Icons",{attrs:{color:"#ffffff",icon:"success"}})],1)])]):m._e(),m._v(" "),"performer"==m.tab?f("div",{staticClass:"form_block"},[f("h4",[m._v("Я - Исполнитель")]),m._v(" "),f("div",{staticClass:"form_other_info mv_w-screen"},[f("label",{attrs:{for:"textarea"}},[m._v("Название организации")]),m._v(" "),f("input",{directives:[{name:"model",rawName:"v-model",value:m.form3.name,expression:"form3.name"}],attrs:{placeholder:"Название организации"},domProps:{value:m.form3.name},on:{input:function(t){t.target.composing||m.$set(m.form3,"name",t.target.value)}}})]),m._v(" "),f("div",{staticClass:"form_other_info mv_w-screen"},[f("label",{attrs:{for:"textarea"}},[m._v("Номер телефона")]),m._v(" "),f("input",{directives:[{name:"model",rawName:"v-model",value:m.form3.phoneNumber,expression:"form3.phoneNumber"},{name:"mask",rawName:"v-mask",value:"+998-##-###-##-##",expression:"'+998-##-###-##-##'"}],attrs:{placeholder:"+998"},domProps:{value:m.form3.phoneNumber},on:{input:function(t){t.target.composing||m.$set(m.form3,"phoneNumber",t.target.value)}}})]),m._v(" "),f("div",{staticClass:"form_other_info mv_w-screen"},[f("label",{attrs:{for:"textarea"}},[m._v("Адрес")]),m._v(" "),f("input",{directives:[{name:"model",rawName:"v-model",value:m.form3.address,expression:"form3.address"}],attrs:{placeholder:"Адрес"},domProps:{value:m.form3.address},on:{input:function(t){t.target.composing||m.$set(m.form3,"address",t.target.value)}}})]),m._v(" "),f("div",{staticClass:"form_other_info gap-8"},[f("label",{attrs:{for:"textarea"}},[m._v("Логотип организации")]),m._v(" "),f("label",{staticClass:"form_other_info_file",attrs:{for:"file"}},[!m.img||null!==(o=m.$store.state.user.organization)&&void 0!==o&&null!==(n=o.logotip)&&void 0!==n&&n.path?!m.img&&null!==(l=m.$store.state.user.organization)&&void 0!==l&&null!==(c=l.logotip)&&void 0!==c&&c.path?f("img",{staticClass:"br-rounded image-f",attrs:{src:null===(d=m.$store.state.user.organization)||void 0===d||null===(v=d.logotip)||void 0===v?void 0:v.path,alt:""}}):f("img",{attrs:{src:r(951),alt:""}}):f("img",{staticClass:"br-rounded image-f",attrs:{src:m.img,alt:""}})]),m._v(" "),f("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{id:"file",type:"file",placeholder:"Дополнительная информация"},on:{change:m.addImg}})]),m._v(" "),f("div",{staticClass:"flex justify-between items-center mt-41 w-70 mv_w-screen"},[f("button",{staticClass:"flex order signin mv_w-screen",on:{click:m.submit}},[f("div",{staticClass:"signin_text"},[m._v("Сохранить")]),m._v(" "),f("Icons",{attrs:{color:"#ffffff",icon:"success"}})],1)])]):m._e()]):m._e()])])}),[function(){var t=this._self._c;return t("div",{staticClass:"flex mv_w justify-between items-center"},[t("h3",[this._v("Профиль")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Icons:r(947).default})},947:function(t,e,r){"use strict";r.r(e);var o={name:"chosenIcon",data:function(){return{icons:{myorder:'\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.197 19.8637C11.4313 21.6294 8.56866 21.6294 6.803 19.8637C5.03735 18.0981 5.03735 15.2354 6.803 13.4698L12.1363 8.13642C13.1656 7.10714 14.8344 7.10714 15.8637 8.13642C16.8929 9.16569 16.8929 10.8345 15.8637 11.8637L10.5303 17.1971C10.2374 17.49 9.76256 17.49 9.46967 17.1971C9.17678 16.9042 9.17678 16.4293 9.46967 16.1364L14.803 10.8031C15.2465 10.3596 15.2465 9.64056 14.803 9.19708C14.3595 8.75359 13.6405 8.75359 13.197 9.19708L7.86366 14.5304C6.6838 15.7103 6.6838 17.6232 7.86366 18.8031C9.04353 19.983 10.9565 19.983 12.1363 18.8031L17.4697 13.4697C19.3859 11.5535 19.3859 8.44666 17.4697 6.53041C15.5534 4.61416 12.4466 4.61416 10.5303 6.53041L5.197 11.8637C4.9041 12.1566 4.42923 12.1566 4.13634 11.8637C3.84344 11.5709 3.84344 11.096 4.13634 10.8031L9.46967 5.46975C11.9717 2.96772 16.0283 2.96772 18.5303 5.46975C21.0324 7.97178 21.0324 12.0284 18.5303 14.5304L13.197 19.8637Z" fill="currentColor"/>\n        ',settings:'\n        <path d="M11.1515 20H12.8485C13.7857 20 14.5455 19.2837 14.5455 18.4C14.5455 17.3888 15.6274 16.7459 16.5156 17.2294L16.6058 17.2785C17.4174 17.7203 18.4553 17.4581 18.9239 16.6928L19.7724 15.3072C20.241 14.5419 19.9629 13.5634 19.1512 13.1215C18.2627 12.6378 18.2627 11.3622 19.1512 10.8785C19.9629 10.4366 20.241 9.45808 19.7724 8.69281L18.9239 7.30717C18.4553 6.54191 17.4174 6.27971 16.6058 6.72153L16.5156 6.77064C15.6274 7.25411 14.5455 6.61121 14.5455 5.6C14.5455 4.71634 13.7857 4 12.8485 4H11.1515C10.2143 4 9.45454 4.71634 9.45454 5.6C9.45454 6.61122 8.37259 7.25412 7.48444 6.77065L7.39424 6.72155C6.58259 6.27972 5.54474 6.54192 5.07613 7.30719L4.22764 8.69283C3.75904 9.45809 4.03713 10.4366 4.84878 10.8785C5.73734 11.3622 5.73734 12.6378 4.84878 13.1215C4.03713 13.5634 3.75904 14.5419 4.22764 15.3072L5.07613 16.6928C5.54474 17.4581 6.58259 17.7203 7.39424 17.2785L7.48444 17.2294C8.37259 16.7459 9.45454 17.3888 9.45454 18.4C9.45454 19.2837 10.2143 20 11.1515 20Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>\n        <circle cx="12" cy="12" r="3" transform="rotate(-180 12 12)" stroke="currentColor" stroke-width="1.5"/>\n        ',success:'\n        <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="'.concat(this.color,'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n        '),eye:'\n        <path d="M14.6669 11.946C14.6669 13.419 13.4729 14.613 11.9999 14.613C10.5269 14.613 9.33295 13.419 9.33295 11.946C9.33295 10.473 10.5269 9.279 11.9999 9.279M3.75024 11.9465C5.16652 8.80222 8.3276 6.61328 11.9999 6.61328C15.6723 6.61328 18.8334 8.80222 20.2497 11.9465C18.8334 15.0908 15.6723 17.2798 11.9999 17.2798C8.3276 17.2798 5.16652 15.0908 3.75024 11.9465Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n        ',message:'\n        <path d="M8.83984 10.6975L8.84165 10.6946M12 10.6975L12.0018 10.6946M15.1602 10.6975L15.162 10.6946M17 5.35791H7C5.343 5.35791 4 6.70091 4 8.35791V13.0219C4 14.6789 5.343 16.0219 7 16.0219H8.315L8.327 19.8629L12.798 16.0219H17C18.657 16.0219 20 14.6789 20 13.0219V8.35791C20 6.70091 18.657 5.35791 17 5.35791Z" stroke="#5D5D5F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n        ',pen:'\n        <path d="M1.5 16.5H16.5M10.487 3.42643C10.487 3.42643 10.487 4.78861 11.8492 6.1508C13.2114 7.51299 14.5736 7.51299 14.5736 7.51299M5.09969 13.9901L7.96028 13.5814C8.37291 13.5225 8.7553 13.3313 9.05003 13.0365L15.9358 6.1508C16.6881 5.39848 16.6881 4.17874 15.9358 3.42642L14.5736 2.06424C13.8213 1.31192 12.6015 1.31192 11.8492 2.06424L4.96347 8.94997C4.66873 9.2447 4.47754 9.62709 4.41859 10.0397L4.00994 12.9003C3.91913 13.536 4.464 14.0809 5.09969 13.9901Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>\n        ',telegram:'\n        <path d="M2.89645 10.7964L18.2851 4.14575C19.0088 3.833 19.7929 4.44159 19.6695 5.22023L17.5655 18.4962C17.4355 19.3162 16.4206 19.6299 15.8506 19.0262L12.3977 15.3686C11.7206 14.6514 11.6675 13.5475 12.2727 12.7686L14.7107 9.63084C14.8501 9.45146 14.63 9.21549 14.4414 9.34204L9.59406 12.5939C8.77148 13.1457 7.77341 13.3727 6.79309 13.2309L3.15003 12.704C2.15204 12.5597 1.97083 11.1964 2.89645 10.7964Z" fill="#3C4BDC"/>\n        '}}},computed:{chosenIcon:function(){return this.icons[this.icon]}},props:{icon:String,size:String,color:String,id:String}},n=r(53),component=Object(n.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"icon",class:this.color,attrs:{id:t.id}},["sm"==this.size?e("svg",{attrs:{id:t.id,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}}):"middle"==this.size?e("svg",{attrs:{id:t.id,width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}}):"32"==this.size?e("svg",{attrs:{id:t.id,width:"32",height:"32",viewBox:"0 0 24 24 ",fill:"none",mlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}}):"large"==this.size?e("svg",{attrs:{id:t.id,width:"36",height:"36",viewBox:"0 0 24 24 ",fill:"none",mlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}}):"48"==this.size?e("svg",{attrs:{id:t.id,width:"48",height:"48",viewBox:"0 0 24 24 ",fill:"none",mlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}}):e("svg",{attrs:{id:t.id,width:"24",height:"24",viewBox:"0 0 24 24 ",fill:"none",mlns:"http://www.w3.org/2000/svg"},domProps:{innerHTML:t._s(t.chosenIcon)}})])}),[],!1,null,null,null);e.default=component.exports},951:function(t,e,r){t.exports=r.p+"img/addimg.9689a00.svg"}}]);