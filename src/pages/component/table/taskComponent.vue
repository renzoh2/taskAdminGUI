<script setup>
import axios from "../../../modules/axios";
import { reactive, onMounted } from "vue";

const table = reactive({ data: null });

const data = () => {
  return axios.get("api/tasks").then((response) => {
    table.data = response.data;
  });
};

onMounted(async () => {
  data();
});
</script>
<template>
  <div class="flex flex-row">
    <table>
      <th>
        <tr>
          <td><b>Title</b></td>
          <td><b>Description</b></td>
          <td><b>User</b></td>
          <td><b>Action</b></td>
        </tr>
      </th>
      <tbody>
        <tr v-for="(row, index) in table.data" v-bind:key="index" class="flex flex-row">
          <td>{{ row.task_title }}</td>
          <td>{{ row.task_description }}</td>
          <td>{{ row.user_id }}</td>
          <td><button>Edit</button><button>Trash</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
