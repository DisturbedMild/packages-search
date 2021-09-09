<template>
 <v-app>
  <the-header></the-header>
  <the-packages></the-packages>
   <the-footer></the-footer>
 </v-app>
</template>

<script>
import ThePackages from "./components/app/ThePackages.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
 name: "App",

 components: {
  TheHeader,
  TheFooter,
  ThePackages,
 },

 data: () => ({
  //
 }),
};
</script>
