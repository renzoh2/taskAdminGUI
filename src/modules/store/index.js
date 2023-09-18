import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import tasks from "./tasks";

// Create store
export default new vuex.Store({
  modules: {
    auth,
    tasks,
  },
  plugins: [createPersistedState()],
});
