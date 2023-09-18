<script setup>
import axios from "../../../modules/axios";
import store from "../../../modules/store";
import router from "../../../modules/route";

const logout = async () => {
  const status = await axios.get("api/logout");
  if (status) {
    store.dispatch("getLogout");
    router.push({ name: "index" });
  }
};
</script>
<template>
  <div class="mb-5">
    <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0">
        <a href="#" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">TASK <b class="text-base">Admin</b></a>
      </div>
      <div>
        <button @click.prevent="logout" class="no-underline text-grey-darkest ml-2 hover:bg-cyan-400 hover:text-white p-2 rounded-md text-sm flex flex-row gap-1">
          <svg fill="none" height="24" viewBox="0 0 24 18" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            <path d="M19 12L15 8M19 12L15 16M19 12H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
          <b class="py-1">LOGOUT</b>
        </button>
      </div>
    </nav>
  </div>
</template>
