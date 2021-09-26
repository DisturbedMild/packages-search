<template>
 <v-form>
  <form>
   <div class="form-group">
    <input
     type="text"
     @input.prevent="debounceInput"
     placeholder="Search packages..."
    />
   </div>
  </form>
 </v-form>
</template>

<script>
import { debounce } from "debounce";

export default {
 data() {
  return {
   statsList: [],
  };
 },
 methods: {
  debounceInput: debounce(function(e) {
   if (!e.target.value) {
    return;
   }
   this.getPackeges(e.target.value);
  }, 500),
  getPackeges(packageName) {
   const urls = [
    "https://api.npms.io/v2/package/",
    "https://api.github.com/repos/",
   ];

   Promise.allSettled(urls.map((url) => fetch(`${url}${packageName}`))).then(
    (resulsts) =>
     resulsts.forEach((result) => {
      if (
       result.status === "fulfilled" &&
       result.value.url === `${urls[0]}${packageName}`
      ) {
       this.getNpmPackage(packageName);
      } else if (
       result.status === "fulfilled" &&
       result.value.url === `${urls[1]}${packageName}`
      ) {
       this.getGitPackage(packageName);
      }
     })
   );
  },
  getNpmPackage(packageName) {
   fetch(`https://api.npms.io/v2/package/${packageName}`)
    .then((response) => response.json())
    .then((data) => this.storeNpmPackage(data))
    .catch((err) => console.error("Err: ", err));
  },
  getGitPackage(packageName) {
   fetch(`https://api.github.com/repos/${packageName}`)
    .then((response) => response.json())
    .then((data) => this.storeGitPackage(data))
    .catch((err) => console.error("Err: ", err));
  },
  storeGitPackage(data) {
   this.$store.commit("updatePackage", data);
  },
  storeNpmPackage(data) {
   this.$store.commit("updatePackage", data.collected.metadata);
  },
 },
};
</script>

<style scoped>
.form-group {
 text-align: center;
}
.form-group input {
 border: 2px solid grey;
 max-width: 600px;
 width: 100%;
 height: 60px;
 margin: 40px auto 0;
 border-radius: 30px;
 padding: 10px 20px;
 box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.3);
 box-sizing: border-box;
}
.form-group input:focus {
 border: none;
 border-color: red;
}
</style>
