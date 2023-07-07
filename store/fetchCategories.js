export const actions = {
  async getCategories({}) {
    const res = await this.$axios.$get(
      `https://prweb.pythonanywhere.com/api/categories`
    );
    return res;
  },
};
