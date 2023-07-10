export const actions = {
  async postUserInfo({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/auth/login`,
      payload
    );
    return res;
  },
  async getProfileInfo({}) {
    const res = await this.$axios.$get(
      `https://prweb.pythonanywhere.com/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    return res;
  },
  async postRefreshToken({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/auth/login/refresh`,
      {
        refresh: JSON.parse(localStorage.getItem("refresh_token")),
      }
    );
    return res;
  },
  async postProfileUpdate({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/auth/create_business`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      }
    );
    return res;
  },
};
