<template>
  <Teleport to="#modals">
    <div
      v-if="show"
      :style="{ fontFamily: font }"
    >
      <div class="fixed inset-0 bg-[rgb(0,0,0,.4)] flex items-center justify-center">
        <div
          ref="modal"
          class="bg-white rounded-lg p-4 m-4 max-w-3xl"
        >
          <div class="flex justify-between">
            <slot name="header" />
            <button
              class="ml-2"
              @click="handleClose"
            >
              <i class="fas fa-xmark" />
            </button>
          </div>
          <div class="mt-4">
            <slot name="body" />
          </div>
          <div class="mt-4">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

defineProps<{
  show: boolean;
  font?: string;
}>();
const modal = ref(null);
const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
onClickOutside(modal, () => handleClose());
</script>
