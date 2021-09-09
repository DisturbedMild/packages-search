<template>
 <v-main>
  <v-container>
   <packages-search
    :storeGitPackage="storeGitPackage"
    :storeNpmPackage="storeNpmPackage"
   ></packages-search>
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
 },
 data() {
  return {};
 },
 methods: {
  storeGitPackage(data) {
   const { full_name, created_at, description, html_url } = data;
   this.$store.commit("updatePackage", {
    name: full_name,
    date: created_at,
    description,
    link: html_url,
   });
  },
  storeNpmPackage(data) {
   const {
    name,
    version,
    author,
    description,
    links,
   } = data.collected.metadata;
   this.$store.commit("updatePackage", {
    name: name,
    version: version,
    author: author,
    description,
    links,
   });
  },
 },
};
</script>
