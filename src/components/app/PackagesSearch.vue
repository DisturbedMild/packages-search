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
 props: ["storeGitPackage", "storeNpmPackage"],
 methods: {
  debounceInput: debounce(function(e) {
   if (!e.target.value) {
    return;
   }
   this.getPackeges(e.target.value);
  }, 500),
  getPackeges(packageName) {
   fetch(`https://api.npms.io/v2/package/${packageName}`)
    .then((response) => {
     if (response.ok) {
      return response.json();
     } else {
      return fetch(`https://api.github.com/repos/${packageName}`)
       .then((response) => response.json())
       .then((data) => {
        this.storeGitPackage(data);
        return;
       })
       .catch((err) => console.error("Err: ", err));
     }
    })
    .then((data) => {
     this.storeNpmPackage(data);
     return;
    })
    .catch((err) => console.error("Err: ", err));
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
