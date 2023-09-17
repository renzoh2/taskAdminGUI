import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";

// Create store
export default new vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
});
