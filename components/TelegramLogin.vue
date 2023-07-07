<template>
  <div ref="telegram" class="flex items-center justify-center"></div>
</template>

<script>
export default {
  name: "TelegramLogin",
  props: {
    mode: {
      type: String,
      required: true,
      validator(value) {
        return ["callback", "redirect"].includes(value);
      },
    },
    telegramLogin: {
      type: String,
      required: true,
      validator(value) {
        return value.endsWith("bot") || value.endsWith("Bot");
      },
    },
    redirectUrl: {
      type: String,
      default: "",
    },
    requestAccess: {
      type: String,
      default: "read",
      validator(value) {
        return ["read", "write"].includes(value);
      },
    },
    size: {
      type: String,
      default: "large",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      },
    },
    userpic: {
      type: Boolean,
      default: true,
    },
    radius: {
      type: String,
    },
  },
  methods: {
    async onTelegramAuth(user) {
      try {
        const data = await this.$store.dispatch("fetchAuth/postUserInfo", {
          user_data: user,
        });
        await localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        this.__GET_USER_INFO();
      } catch (e) {}
    },
    async __GET_USER_INFO() {
      try {
        const data = await this.$store.dispatch("fetchAuth/getProfileInfo");
        await this.$store.commit("getUserInfo", data);
        if (this.$store.state.user) {
          this.$router.push("/");
        }
      } catch (e) {}
    },
  },
  mounted() {
    // create script with given params
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-size", this.size);
    script.setAttribute("data-userpic", this.userpic);
    script.setAttribute("data-telegram-login", this.telegramLogin);
    script.setAttribute("data-request-access", this.requestAccess);
    if (this.radius) {
      script.setAttribute("data-radius", this.radius);
    }
    if (this.mode === "callback") {
      window.onTelegramAuth = this.onTelegramAuth;
      script.setAttribute("data-onauth", "window.onTelegramAuth(user)");
    } else {
      script.setAttribute("data-auth-url", this.redirectUrl);
    }
    this.$refs.telegram.appendChild(script);
    const user = {
      id: 651569949,
      first_name: "𝙷𝚊𝚜𝚊𝚗",
      username: "Khasan_Chulliyev",
      photo_url:
        "https://t.me/i/userpic/320/J_qGKHKDa05bKlgqi1hv41ySpIssOWJIebyuy6bTyUw.jpg",
      auth_date: 1688716729,
      hash: "4979341b79730a4f93155ca499776cfcb302d90dc353a25f89c232303a15b80b",
    };
    this.onTelegramAuth(user);
  },
};
</script>

<style scoped></style>
