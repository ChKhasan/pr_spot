export const actions = {
  async postOrder({}, payload) {
    const res = await this.$axios.$post(`/orders/`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async postApplications({}, payload) {
    const res = await this.$axios.$post(`/offers/`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async postChooseApplication({}, payload) {
    const res = await this.$axios.$post(`/choose_offer`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async getOrderById({}, payload) {
    const res = await this.$axios.$get(`/orders/${payload}`);
    return res;
  },
  async getOrderByIdProfile({}, payload) {
    const res = await this.$axios.$get(`/orders/${payload}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async getOrders({}, payload) {
    const res = await this.$axios.$get(`/orders`, payload);
    return res;
  },
};
