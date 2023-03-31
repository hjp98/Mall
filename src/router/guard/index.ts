import router from "@/router";
import { userStore } from "@/store/user";

router.afterEach((to) => {
  const store = userStore();
  if (to.name !== "login" && !store.user.token) {
    return "/login";
  }
});
