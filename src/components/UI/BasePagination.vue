<template>
 <div class="pagination">
  <ul>
   <slot></slot>
  </ul>
 </div>
</template>

<style scoped>
.pagination {
 margin-top: 50px;
 margin-bottom: 30px;
}
ul {
 display: flex;
 padding: 0;
 margin: 0;
}
li {
 list-style-type: none;
 display: flex;
 justify-content: center;
 align-items: center;
 width: 40px;
 height: 40px;
 color: #fff;
 background: skyblue;
 cursor: pointer;
 transition: 0.3s all;
}
li:hover {
 background: rgb(48, 48, 220);
}
li + li {
 margin-left: 10px;
}
li.active {
 background: rgb(48, 48, 220);
}

@media (min-width: 320px) {
 li {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: #fff;
  background: skyblue;
  cursor: pointer;
  transition: 0.3s all;
 }
}
</style>
