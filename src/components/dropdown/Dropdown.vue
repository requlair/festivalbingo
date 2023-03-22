<template>
    <div>
        <button @click="toggleDropdown" class="relative w-36 border-2 px-2 py1 h-9 rounded-lg flex items-center">
            <img class="w-5 mr-2" src="../../assets/images/chevron-down-icon.svg"/>
            {{ selectedItem.label }}
        </button>
        <div v-if="isOpen" ref="dropdown" class="absolute w-36 flex flex-col bg-white border-2 rounded-lg">
            <button v-for="item, index in items" :key="index" @click="handleItemClicked(item)" :class="[index !== 0 ? 'border-t-2' : '', 'flex items-center px-2 h-8']">
                <img class="w-5 mr-2" :src="item.icon"/>
                {{ item.label }}
            </button>
        </div>
     </div>
</template>

<script setup lang="ts">
    import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
    import { DropdownItem } from '../../types/types';
    
    const props = defineProps<{ items: DropdownItem[], selectedItem: DropdownItem, onOptionClicked: Function }>();
    const isOpen = ref(false);
    const dropdown = ref(null);
    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }
    onClickOutside(dropdown, () => toggleDropdown());
    const handleItemClicked = (item: DropdownItem) => {
        props.onOptionClicked(item.value);
        toggleDropdown();
    }
</script>