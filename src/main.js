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
   package: {
    name: "",
    date: "",
    version: "",
    description: "",
    link: "",
    author: "",
    links: [],
   },
  };
 },
 mutations: {
  updatePackage(state, newPackage) {
   state.package.name = newPackage.name;
   state.package.date = newPackage.date;
   state.package.version = newPackage.version;
   state.package.description = newPackage.description;
   state.package.link = newPackage.link;

   if (!newPackage.author) {
    state.package.author = "";
   } else {
    state.package.author = newPackage.author.name;
   }
   for (let link in newPackage.links) {
    state.package.links.push(newPackage.links[link]);
   }
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
