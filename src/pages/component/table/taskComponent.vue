<script setup>
import axios from "../../../modules/axios";
import { reactive, onMounted, computed } from "vue";
import { eventbus } from "../../../utils";
import store from "../../../modules/store";

const alertDiv = reactive({
  color: "green",
  title: "",
  message: "",
  onShow: false,
});

const tableData = computed(() => {
  return store.getters.getTableData || [];
});

onMounted(async () => {
  await store.dispatch("fetchData");
});

eventbus.$on("taskFormAlert: onshowAlert", (data) => {
  alertDiv.status = data.status;
  alertDiv.title = data.title;
  alertDiv.message = data.message;
  alertDiv.onShow = true;

  setTimeout(function () {
    alertDiv.onShow = false;
  }, 6000);
});

const action = reactive({
  modalAdd: false,
  modalEdit: false,
  modalOpen: false,
  data: null,
});

const handleAdd = () => {
  action.modalAdd = true;
  action.modalEdit = false;
  action.modalOpen = true;
  eventbus.$emit("taskFormModal: onChangeModal", action);
};

const handleEdit = (data) => {
  action.modalAdd = false;
  action.modalEdit = true;
  action.modalOpen = true;
  action.data = data;
  eventbus.$emit("taskFormModal: onChangeModal", action);
};

const handleDelete = async (id) => {
  await store.dispatch("deleteItem", id);
};
</script>
<template>
  <div class="flex flex-col mx-auto w-8/12">
    <div class="w-full" v-show="alertDiv.onShow">
      <div class="border text-white px-4 py-3 rounded relative" v-bind:class="alertDiv.status ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'" role="alert">
        <strong class="font-bold flex gap-x-2">{{ alertDiv.title }}</strong>
        <span class="block sm:inline">{{ alertDiv.message }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3"> </span>
      </div>
    </div>
    <div class="w-full">
      <button class="bg-gray-800 hover:bg-green-500 flex rounded-md p-1 text-white flex gap-x-1 px-2 py-2 my-2" @click="handleAdd">
        <b>Add Task</b>
        <svg class="my-auto" enable-background="new 0 0 50 50" height="18" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="18" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect fill="none" height="50" width="50" />
          <line fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="4" x1="9" x2="41" y1="25" y2="25" />
          <line fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="4" x1="25" x2="25" y1="9" y2="41" />
        </svg>
      </button>
    </div>
    <table class="border-gray-900 rounded-xl">
      <th class="border-2 border-slate-900 bg-slate-900 text-white">
        <tr class="flex p-2">
          <td class="w-8/12 text-left"><b>Title</b></td>
          <td class="w-full text-left"><b>Description</b></td>
          <td class="w-8/12 text-left"><b>User</b></td>
          <td class="w-5/12 text-left"><b>Action</b></td>
        </tr>
      </th>
      <tbody class="border-2 border-slate-900">
        <tr v-for="row in tableData" v-bind:key="`task-item-${row.id}`" class="flex flex-row px-2 py-5 shadow shadow-slate-900">
          <td class="w-8/12">{{ row.title }}</td>
          <td class="w-full">{{ row.description }}</td>
          <td class="w-8/12">{{ row.user }}</td>
          <td class="w-5/12">
            <div class="flex justify-center gap-x-2 text-white">
              <button class="w-5/12 bg-gray-500 hover:bg-gray-800 flex justify-center rounded-md p-1" @click="handleEdit(row)">
                <svg class="feather feather-edit my-auto" fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <b>Edit</b>
              </button>
              <button class="w-5/12 bg-red-500 hover:bg-red-800 flex justify-center rounded-md p-1" @click="handleDelete(row.id)">
                <svg class="feather feather-trash-2 my-auto" fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                <b>Trash</b>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
