<script setup>
import tasksTable from "../component/table/taskComponent.vue";
import navBar from "../component/navbar/navComponent.vue";
import addTask from "../forms/tasksForm.vue";
</script>
<template>
  <div>
    <navBar />
    <tasksTable />
    <addTask />
  </div>
</template>
