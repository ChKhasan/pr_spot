export const state = () => ({
  user: {},
});
export const mutations = {
  getUserInfo(state, payload) {
    state.user = payload;
  },
};
