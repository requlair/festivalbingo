<template>
  <canvas ref="sigCanvas" class="w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SignaturePad from "signature_pad";
import LZString from "lz-string";

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
  canvas.getContext("2d")!.scale(ratio, ratio);
};

const draw = () => {
  const canvas = sigCanvas.value!;
  sig.value = new SignaturePad(canvas, { backgroundColor: "rgb(255,255,255)" });
  resize();
};
onMounted(() => {
  draw();
  window.addEventListener("resize", resize);
});

const clear = () => {
  sig.value!.clear();
};
const getInputString = () => {
  if (sig.value?.isEmpty()) {
    return;
  }
  const imageString = LZString.compress(sig.value!.toDataURL("jpeg"));
  return imageString;
};
defineExpose({
  clear,
  getInputString,
});
</script>
