<template>
 <button @click="close()"><slot></slot></button>
</template>

<script>
export default {
 props: ["close"],
};
</script>

<style scoped>
button {
 background: skyblue;
 display: inline-flex;
 padding: 10px 20px;
 color: #fff;
 border-radius: 7px;
 justify-content: center;
 align-items: center;
}
button:hover {
 background: rgb(48, 48, 220);
}
</style>
