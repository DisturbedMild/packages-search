<template>
 <v-list-item class="status-item mb-4">
  <h4 class="h4" @click="$emit('render-package', name, type)">{{ name }}</h4>
  <p>Type: {{ type }}</p>
 </v-list-item>
</template>

<script>
export default {
 props: ["name", "type"],
};
</script>

<style scoped>
.v-list-item {
 border-bottom: 2px solid gray;
 display: flex;
 justify-content: space-between;
 align-items: center;
}
.v-list-item p {
 margin-left: auto;
}
@media (min-width: 320px) {
 .status-item .h4 {
  font-size: 0.75rem;
 }
 .status-item p {
     font-size: 0.75rem;
 }
}
@media (min-width: 1200px) {
 .status-item .h4 {
  font-size: 1rem;
 }
 .status-item p {
     font-size: 1rem;
 }
}
</style>
