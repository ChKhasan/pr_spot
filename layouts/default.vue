<template>
  <div class="layout__container">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    if (localStorage.getItem("access_token")) this.__GET_USER_INFO();
  },
  methods: {
    async __GET_USER_INFO() {
      try {
        const data = await this.$store.dispatch("fetchAuth/getProfileInfo");
        this.$store.commit("getUserInfo", data);
      } catch (e) {
        if (e.response.status == 401) {
          this.__REFRESH_TOKEN();
        }
      }
    },
    async __REFRESH_TOKEN() {
      try {
        const data = await this.$store.dispatch("fetchAuth/postRefreshToken");
        localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        this.__GET_USER_INFO();
      } catch (e) {
        localStorage.remove("access_token");
        localStorage.remove("refresh_token");
      }
    },
  },
};
</script>

<style scoped>
.layout__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
