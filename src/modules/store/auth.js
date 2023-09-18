import axios from "../axios";

const state = {
  isAuthenticated: false,
  token: null,
};
const getters = {
  isAuth(state) {
    return state.isAuthenticated;
  },
  getToken(state) {
    return state.token;
  },
};
const actions = {
  setAuthentication({ commit }, payload) {
    commit("setAuth", payload);
  },
  async getTokenAuth({ commit }, token) {
    const status = await axios.get("api/user");
    if (status) commit("setToken", token);
  },
  getLogout({ commit }) {
    commit("setLogout");
  },
};
const mutations = {
  setAuth(state, status) {
    state.isAuthenticated = status;
  },
  setToken(state, token) {
    state.token = token;
  },
  setLogout(state) {
    state.isAuthenticated = false;
    state.token = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
