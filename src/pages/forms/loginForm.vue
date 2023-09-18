<script setup>
import { reactive } from "vue";
import axios from "../../modules/axios";
import store from "./../../modules/store";
import router from "./../../modules/route";

const loginForm = reactive({
  email: null,
  password: null,
  remember: false,
});

const error = reactive({
  status: false,
});

const login = async () => {
  await axios.get("sanctum/csrf-cookie");
  const { data } = await axios.post("api/login", loginForm);
  if (data.status == "Success") {
    await Promise.all([store.dispatch("setAuthentication", true), store.dispatch("getTokenAuth", data.data.token)]);
    router.push({ name: "admin.tasks" });
  } else {
    error.status = true;
    //set Alert Timeout
    setTimeout(function () {
      error.status = false;
    }, 6000);
  }
};
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <div class="my-auto">
      <div class="mx-auto w-3/12" v-if="error.status">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Login Failed!</strong>
          <span class="block sm:inline"> Please enter correct Email Address.</span>
        </div>
      </div>
      <div class="mx-auto w-2/12 mt-3 border-2 border-black text-center">
        <form class="flex flex-col" @submit.prevent="login">
          <div class="flex justify-between gap-2.5 my-2 mx-1">
            <label>EMAIL</label>
            <input type="text" class="border-2 border-black w-4/6" v-model="loginForm.email" />
          </div>
          <div class="flex justify-between gap-2.5 my-2 mx-1">
            <label>PASSWORD</label>
            <input type="password" class="border-2 border-black w-4/6" v-model="loginForm.password" />
          </div>
          <div class="flex gap-2.5 my-2 mx-1">
            <input type="checkbox" v-model="loginForm.remember" />
            <label>Remember Me?</label>
          </div>
          <div>
            <button type="submit" class="bg-cyan-400 hover:bg-cyan-800 hover:text-white w-full py-2"><b>LOGIN ACCOUNT</b></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
