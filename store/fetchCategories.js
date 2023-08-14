export const actions = {
  async getCategories({}) {
    const res = await this.$axios.$get(`/categories`);
    return res;
  },
};
