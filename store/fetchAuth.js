export const actions = {
  async postUserInfo({}, payload) {
    const res = await this.$axios.$post(`/auth/login`, payload);
    return res;
  },
  async getProfileInfo({}) {
    const res = await this.$axios.$get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async postRefreshToken({}, payload) {
    const res = await this.$axios.$post(`/auth/login/refresh`, {
      refresh: JSON.parse(localStorage.getItem("refresh_token")),
    });
    return res;
  },
  async postProfileUpdate({}, payload) {
    const res = await this.$axios.$post(`/auth/create_business`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async putProfileUpdate({}, payload) {
    const res = await this.$axios.$put(`/auth/update_business`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
};
