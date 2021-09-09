<template>
 <div class="result-wrapper">
  <h3 class="result-header">{{ this.$store.state.package.name }}</h3>
  <div class="result-item">
   <div class="result-name" v-if="this.$store.state.package.date">
    {{ this.$store.state.package.date }}
   </div>
   <div class="result-author" v-if="this.$store.state.package.author">
    {{ this.$store.state.package.author }}
   </div>
   <div class="result-version" v-if="this.$store.state.package.version">
    {{ this.$store.state.package.version }}
   </div>
   <div class="result-description" v-if="this.$store.state.package.description">
    {{ this.$store.state.package.description }}
   </div>
   <div class="result-link" v-if="this.$store.state.package.link">
    <a :href="this.$store.state.package.link" target="_blank">{{
     this.$store.state.package.link
    }}</a>
   </div>
   <div v-if="this.$store.state.package.links">
    <div class="links-wrapper" v-if="this.$store.state.package.links">
     <div
      class="result-link"
      v-for="link in this.$store.state.package.links"
      :key="link"
     >
      <a :href="link" target="_blank">{{ link }}</a>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<style scoped>
.result-wrapper {
 margin-top: 20px;
}
.result-link {
    font-size: 1rem;
}
</style>
