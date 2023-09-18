import axios from "../axios";

const state = {
  tableData: [],
  alertData: [],
  page: 1,
  limit: 10,
  order: "ASC",
};
const getters = {
  getTableData(state) {
    return state.tableData;
  },
  getAlertData(state) {
    return state.alertData;
  },
};
const actions = {
  async addItem({ dispatch, commit }, payload) {
    const { data } = await axios.post("api/tasks", payload);
    if (data.status === "Success") {
      dispatch("fetchData");

      data["status"] = true;
    } else data["status"] = false;
    commit("setAlertData", data);
  },
  async fetchData({ commit }) {
    const { data } = await axios.get("api/tasks");
    commit("setTableData", data);
  },

  async editItem({ commit, state }, payload) {
    const { id: currentId } = payload;

    const { data } = await axios.put("api/tasks/" + currentId, payload);

    if (data.status === "Success") {
      data["status"] = true;
    } else data["status"] = false;
    const newTableData = [...state.tableData];

    const idx = newTableData.findIndex((item) => item.id === currentId);
    newTableData[idx] = { ...data.data };
    commit("setAlertData", data);
    commit("setTableData", newTableData);
  },

  async deleteItem({ dispatch }, id) {
    await axios.delete("api/tasks/archive/" + id);
    dispatch("fetchData");
  },
};
const mutations = {
  setTableData(state, data) {
    state.tableData = data;
  },
  setAlertData(state, data) {
    state.alertData = data;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
