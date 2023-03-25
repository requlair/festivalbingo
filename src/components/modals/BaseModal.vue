<template>
  <Teleport to="#modals">
    <div v-if="show" :style="{ fontFamily: font }">
      <div  class="fixed inset-0 bg-[rgb(0,0,0,.4)] flex items-center justify-center">
          <div ref="modal" class="bg-white rounded-lg px-4">
            <div class="mt-4">
              <slot name="header"></slot>
            </div>
            <div class="mt-4">
              <slot name="body"></slot>
            </div>
            <div class="mb-4 mt-2">
              <slot name="footer"></slot>
            </div>
          </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
  defineProps<{
    show: boolean
    font?: string
  }>()
  const modal = ref(null);
  const emit = defineEmits(['close']);
  const handleClose = () => { 
    emit('close')};
  onClickOutside(modal, () => handleClose());
</script>