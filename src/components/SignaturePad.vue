<template>
  <canvas
    ref="sigCanvas"
    class="w-full h-full"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SignaturePad from "signature_pad";

const sig = ref<SignaturePad | null>(null);
const sigCanvas = ref<HTMLCanvasElement | null>(null);

const resize = () => {
  if (!sigCanvas.value) {
    return;
  }
  const canvas = sigCanvas.value;
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  const ctx = canvas.getContext("2d");
  if(!ctx) {
    return;
  }
  ctx.scale(ratio, ratio);
};

const draw = () => {
  if(!sigCanvas.value) {
    return;
  }
  const canvas = sigCanvas.value;
  sig.value = new SignaturePad(canvas, { backgroundColor: "rgb(255,255,255)" });
  resize();
};
onMounted(() => {
  draw();
  window.addEventListener("resize", resize);
});

const clear = () => {
  if(sig.value){
    sig.value.clear();
  }
};
const getInputString = () => {
  if(!sig.value || sig.value.isEmpty()){
    return;
  }
  const imageString =sig.value.toDataURL("jpeg");
  return imageString;
};
defineExpose({
  clear,
  getInputString,
});
</script>
