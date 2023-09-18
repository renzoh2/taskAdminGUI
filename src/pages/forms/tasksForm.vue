<script setup>
import { reactive } from "vue";
import { eventbus } from "../../utils";
import store from "../../modules/store";

const modal = reactive({ isOpen: false });
const modalAction = reactive({
  add: false,
  edit: false,
});
const initTaskForm = () => ({
  title: "",
  description: "",
  status: "",
});

const edit = reactive({ id: null });

const statusOptions = {
  todo: "To Do",
  inprogress: "In Progress",
  completed: "Completed",
};

const taskForm = reactive({ ...initTaskForm() });

eventbus.$on("taskFormModal: onChangeModal", (item) => {
  modal.isOpen = item.modalOpen;
  modalAction.add = item.modalAdd;
  modalAction.edit = item.modalEdit;
  if (item.modalEdit === true) {
    taskForm.title = item.data.title;
    taskForm.description = item.data.description;
    console.log(item.data);
    taskForm.status = item.data.status;
    edit.id = item.data.id;
  }
});

const AddTask = async (data) => {
  if (data) {
    await store.dispatch("addItem", data);
    modal.isOpen = false;
    modalAction.add = false;
    const alertData = store.getters.getAlertData;
    eventbus.$emit("taskFormAlert: onshowAlert", alertData);
    Object.assign(taskForm, initTaskForm());
  }
};

const EditTask = async (data) => {
  if (data) {
    data["id"] = edit.id;
    await store.dispatch("editItem", data);
    modal.isOpen = false;
    const alertData = store.getters.getAlertData;
    eventbus.$emit("taskFormAlert: onshowAlert", alertData);
    Object.assign(taskForm, initTaskForm());
  }
};

const cancelModal = () => {
  modal.isOpen = false;
};
</script>
<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="modal.isOpen">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="w-full">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-xl font-semibold leading-6 text-gray-900" id="modal-title"><span v-if="modalAction.add == true">Add Task</span><span v-if="modalAction.edit == true"> Edit Task</span></h3>
                <div class="mt-5 w-full">
                  <form class="flex flex-col m-auto">
                    <div class="flex flex-col gap-x-2 p-2 justify-start">
                      <label> <b>Task Title</b> </label>
                      <input type="text" v-model="taskForm.title" class="border-2 border-gray-400 rounded" />
                    </div>
                    <div class="flex flex-col gap-x-2 p-2 justify-start">
                      <label><b> Description</b> </label>
                      <textarea v-model="taskForm.description" rows="4" cols="50" class="border-2 border-gray-400 rounded resize-none" />
                    </div>
                    <div class="flex flex-col gap-x-2 p-2 justify-start">
                      <label> <b>Status</b> </label>
                      <select v-model="taskForm.status" class="border-2 border-gray-400 rounded">
                        <option v-for="(status, index) in statusOptions" v-bind:key="index" :value="index">{{ status }}</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-end">
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="cancelModal">Cancel</button>
            <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" @click="modalAction.add ? AddTask(taskForm) : EditTask(taskForm)"><span v-if="modalAction.add == true">Add Task</span><span v-if="modalAction.edit == true"> Edit Task</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
