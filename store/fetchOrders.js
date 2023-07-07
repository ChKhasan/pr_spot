export const actions = {
  async postOrder({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/orders/`,
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
  async postApplications({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/offers/`,
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
  async postChooseApplication({}, payload) {
    const res = await this.$axios.$post(
      `https://prweb.pythonanywhere.com/api/choose_offer`,
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
  async getOrderById({}, payload) {
    const res = await this.$axios.$get(
      `https://prweb.pythonanywhere.com/api/orders/${payload}`
    );
    return res;
  },
  async getOrderByIdProfile({}, payload) {
    const res = await this.$axios.$get(
      `https://prweb.pythonanywhere.com/api/orders/${payload}`,
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
  async getOrders({}, payload) {
    const res = await this.$axios.$get(
      `https://prweb.pythonanywhere.com/api/orders`,
      payload
    );
    return res;
  },
};
