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
  async getTokenAuth({ commit }) {
    const token = await axios.get("api/user");
    commit("setToken", token);
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
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
