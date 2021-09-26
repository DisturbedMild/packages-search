<template>
 <div class="modal-wrapper" :class="mode">
  <div class="modal">
   <div class="modal-heading">
    <slot name="heading">
     <h4 class="h4">Modal</h4>
    </slot>
   </div>
   <div class="modal-body">
    <slot name="body"></slot>
   </div>
   <div class="modal-footer">
    <slot name="footer">
     <base-button :close="close">Okay</base-button>
    </slot>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 props: ["mode", "close"],
};
</script>

<style scoped>
.modal-wrapper {
 position: fixed;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.3);
 z-index: 10;
}
.modal {
 max-width: 600px;
 width: 90%;
 position: fixed;
 left: 50%;
 top: 50%;
 transform: translate(-50%, -50%);
 z-index: 100;
 background-color: #fff;
 border-radius: 14px;
 padding: 20px 40px;
}
.modal-heading {
 margin-bottom: 10px;
}
.modal-heading span {
 color: tomato;
}
.modal-body {
 margin-bottom: 20px;
}

@media (min-width: 320px) {
}
</style>
