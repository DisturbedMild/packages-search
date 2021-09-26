import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import JwPagination from "jw-vue-pagination";

import BaseButton from "./components/UI/BaseButton.vue";
import BaseModal from "./components/UI/BaseModal.vue";
import BasePagination from "./components/UI/BasePagination.vue";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
 state() {
  return {
   package: {},
  };
 },
 mutations: {
  updatePackage(state, newPackage) {
   state.package = newPackage;
  },
 },
});

Vue.component("jw-pagination", JwPagination);
Vue.component("base-button", BaseButton);
Vue.component("base-modal", BaseModal);
Vue.component("base-pagination", BasePagination);

new Vue({
 vuetify,
 store,
 render: (h) => h(App),
}).$mount("#app");
