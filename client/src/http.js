import Vue from "vue";
import axios from "axios";
import store from "./store";

// pour intercepter le token
// 
axios.interceptors.request.use(request => {
  const jwtToken = store.getters["user/jwtToken"];
  if (jwtToken) {
    // ajouter une key dans le header
    // Bearer : spécification du jwtToken comme la clé Authorization
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return request;
});

Vue.prototype.$http = axios;


export default axios;
