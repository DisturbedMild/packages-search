<template>
 <v-main>
  <v-container>
   <packages-search></packages-search>
   <searched-package></searched-package>
   <packages-list></packages-list>
  </v-container>
 </v-main>
</template>
<script>
import PackagesSearch from "./PackagesSearch.vue";
import SearchedPackage from "./SearchedPackage.vue";
import PackagesList from "./PackagesList.vue";

export default {
 components: {
  PackagesSearch,
  PackagesList,
  SearchedPackage,
 }
};
</script>
