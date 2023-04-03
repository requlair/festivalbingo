<template>
  <div ref="dropdown">
    <button
      class="relative bg-white border-2 px-2 py1 h-9 rounded-lg flex items-center"
      @click="toggleDropdown"
    >
      <img
        v-if="selectedItem.logo"
        class="w-4 mr-2"
        :src="`/images/${selectedItem.logo}-logo.png`"
      >
      <Icon
        v-if="selectedItem.icon"
        :class="[selectedItem.label ? 'mr-2' : '']"
        :icon="selectedItem.icon"
      />
      {{ selectedItem.label }}
      <i class="ml-2 fas fa-chevron-down" />
    </button>
    <div
      v-if="isOpen"
      class="absolute z-10 flex flex-col bg-white border-2 rounded-lg landscape:translate-y-[-8.5rem]"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        :class="[index !== 0 ? 'border-t-2' : '', 'flex items-center px-2 h-8']"
        @click="handleItemClicked(item)"
      >
        <i
          v-if="item.icon"
          :class="[item.icon, 'mr-2']"
        />
        <img
          v-if="item.logo"
          class="w-4 mr-2"
          :src="`/images/${item.logo}-logo.png`"
        >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { DropdownItem } from "../../types/types";

const props = defineProps<{
  items: DropdownItem[];
  selectedItem: DropdownItem;
  onOptionClicked: (value: string) => void;
}>();
const isOpen = ref(false);
const dropdown = ref(null);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
onClickOutside(dropdown, () => (isOpen.value = false));
const handleItemClicked = (item: DropdownItem) => {
  props.onOptionClicked(item.value);
  toggleDropdown();
};
</script>
