(window.webpackJsonp=window.webpackJsonp||[]).push([[13,6],{1004:function(e,t,r){"use strict";r.r(t);var n=r(20),c=(r(78),{name:"telegram",methods:{cancel:function(){localStorage.removeItem("user"),this.$router.go(-1)},userCallBack:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e){r.next=5;break}return localStorage.setItem("user",JSON.stringify(e)),r.next=4,t.$axios.get("/api/users/"+e.id).then((function(e){var r=e&&e.data&&e.data.result&&e.data.result;t.$axios.put("/api/profilePicture/"+r._id,{profilePicture:r.photo_url})}));case 4:t.$router.go();case 5:case"end":return r.stop()}}),r)})))()}},mounted:function(){localStorage&&localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))&&this.$router.go(-1)}}),o=r(53),component=Object(o.a)(c,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"container flex items-center justify-center h-screen"},[t("div",{staticClass:"box--lg"},[t("h3",[e._v("Войти через телеграм")]),e._v(" "),t("p",{staticClass:"tg__text mt-24"},[e._v("Вы можете добавить и взять заказ войдя через Telegram аккаунт ")]),e._v(" "),t("TelegramLogin",{staticClass:"mt-24",attrs:{"telegram-login":"prspotlogin_bot",mode:"callback",requestAccess:"write"},on:{callback:e.userCallBack}}),e._v(" "),t("div",{staticClass:"sign_btn mt-24"},[t("button",{on:{click:e.cancel}},[e._v("Отмена"),t("img",{attrs:{src:r(986),alt:""}})])])],1)])}),[],!1,null,"0496dfe6",null);t.default=component.exports;installComponents(component,{TelegramLogin:r(981).default})},981:function(e,t,r){"use strict";r.r(t);var n=r(20),c=(r(78),r(149),r(608),{name:"TelegramLogin",props:{mode:{type:String,required:!0,validator:function(e){return["callback","redirect"].includes(e)}},telegramLogin:{type:String,required:!0,validator:function(e){return e.endsWith("bot")||e.endsWith("Bot")}},redirectUrl:{type:String,default:""},requestAccess:{type:String,default:"read",validator:function(e){return["read","write"].includes(e)}},size:{type:String,default:"large",validator:function(e){return["small","medium","large"].includes(e)}},userpic:{type:Boolean,default:!0},radius:{type:String}},methods:{onTelegramAuth:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$store.dispatch("fetchAuth/postUserInfo",{user_data:e});case 3:return data=r.sent,r.next=6,localStorage.setItem("access_token",JSON.stringify(data.access));case 6:localStorage.setItem("refresh_token",JSON.stringify(data.refresh)),t.__GET_USER_INFO(),r.next=12;break;case 10:r.prev=10,r.t0=r.catch(0);case 12:case"end":return r.stop()}}),r,null,[[0,10]])})))()},__GET_USER_INFO:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("fetchAuth/getProfileInfo");case 3:return data=t.sent,t.next=6,e.$store.commit("getUserInfo",data);case 6:e.$store.state.user&&e.$router.push("/"),t.next=11;break;case 9:t.prev=9,t.t0=t.catch(0);case 11:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},mounted:function(){var script=document.createElement("script");script.async=!0,script.src="https://telegram.org/js/telegram-widget.js?22",script.setAttribute("data-size",this.size),script.setAttribute("data-userpic",this.userpic),script.setAttribute("data-telegram-login",this.telegramLogin),script.setAttribute("data-request-access",this.requestAccess),this.radius&&script.setAttribute("data-radius",this.radius),"callback"===this.mode?(window.onTelegramAuth=this.onTelegramAuth,script.setAttribute("data-onauth","window.onTelegramAuth(user)")):script.setAttribute("data-auth-url",this.redirectUrl),this.$refs.telegram.appendChild(script);this.onTelegramAuth({id:651569949,first_name:"𝙷𝚊𝚜𝚊𝚗",username:"Khasan_Chulliyev",photo_url:"https://t.me/i/userpic/320/J_qGKHKDa05bKlgqi1hv41ySpIssOWJIebyuy6bTyUw.jpg",auth_date:1688716729,hash:"4979341b79730a4f93155ca499776cfcb302d90dc353a25f89c232303a15b80b"})}}),o=r(53),component=Object(o.a)(c,(function(){return(0,this._self._c)("div",{ref:"telegram",staticClass:"flex items-center justify-center"})}),[],!1,null,"5d0e2fae",null);t.default=component.exports},986:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxNiAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjYgMTIuNDVDNS4zNTE0NyAxMi43ODEzIDQuODgxMzcgMTIuODQ4NSA0LjU1IDEyLjZMMC41NSA5LjU5OTk2QzAuMzYxMTQ2IDkuNDU4MzIgMC4yNSA5LjIzNjAyIDAuMjUgOC45OTk5NkMwLjI1IDguNzYzODkgMC4zNjExNDYgOC41NDE2IDAuNTUgOC4zOTk5Nkw0LjU1IDUuMzk5OTZDNC44ODEzNyA1LjE1MTQzIDUuMzUxNDcgNS4yMTg1OSA1LjYgNS41NDk5NkM1Ljg0ODUzIDUuODgxMzMgNS43ODEzNyA2LjM1MTQzIDUuNDUgNi41OTk5NkwzLjI1IDguMjQ5OTZMMTEgOC4yNDk5NkMxMi43OTQ5IDguMjQ5OTYgMTQuMjUgNi43OTQ4OCAxNC4yNSA0Ljk5OTk2QzE0LjI1IDMuMjA1MDMgMTIuNzk0OSAxLjc0OTk2IDExIDEuNzQ5OTZMMSAxLjc0OTk2QzAuNTg1Nzg3IDEuNzQ5OTYgMC4yNSAxLjQxNDE3IDAuMjUgMC45OTk5NTZDMC4yNSAwLjU4NTc0MyAwLjU4NTc4NyAwLjI0OTk1NiAxIDAuMjQ5OTU2TDExIDAuMjQ5OTU2QzEzLjYyMzQgMC4yNDk5NTYgMTUuNzUgMi4zNzY2IDE1Ljc1IDQuOTk5OTZDMTUuNzUgNy42MjMzMSAxMy42MjM0IDkuNzQ5OTYgMTEgOS43NDk5NkwzLjI1IDkuNzQ5OTZMNS40NSAxMS40QzUuNzgxMzcgMTEuNjQ4NSA1Ljg0ODUzIDEyLjExODYgNS42IDEyLjQ1WiIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4K"}}]);