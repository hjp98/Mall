import { defineStore } from "pinia";
import { reactive } from "vue";

export const userStore = defineStore(
  "admin",
  () => {
    const user = reactive({
      name: "",
      password: "",
      token: "",
    });
    const login = function (val: any) {
      (user.name = val.name), (user.password = val.pass);
      tokenCreate();
    };
    const tokenCreate = function () {
      let guid = "";
      for (let i = 0; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
      }
      user.token = guid;
    };
    return { user, login, tokenCreate };
  },
  {
    persist: {
      key: "admin",
      storage: localStorage,
    },
  }
);
