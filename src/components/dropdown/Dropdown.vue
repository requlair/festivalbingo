<template>
    <div ref="dropdown">
        <button @click="toggleDropdown" class="relative bg-white border-2 px-2 py1 h-9 rounded-lg flex items-center">
            <component v-if="selectedItem.logo" class="w-4 mr-2" :is="selectedItem.logo"></component>
            <Icon v-if="selectedItem.icon" :class="[selectedItem.label ? 'mr-2' : '']" :icon="selectedItem.icon"></Icon>
            {{ selectedItem.label }}
            <i class="ml-2 fas fa-chevron-down"></i>
        </button>
        <div v-if="isOpen" class="absolute z-10 flex flex-col bg-white border-2 rounded-lg">
            <button v-for="item, index in items" :key="index" @click="handleItemClicked(item)" :class="[index !== 0 ? 'border-t-2' : '', 'flex items-center px-2 h-8']">
               <i v-if="item.icon" :class="[item.icon, 'mr-2']"></i>
               <component v-if="item.logo" class="w-4 mr-2" :is="item.logo"></component>
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
        isOpen.value = !isOpen.value;
    }
    onClickOutside(dropdown, () => isOpen.value = false );
    const handleItemClicked = (item: DropdownItem) => {
        props.onOptionClicked(item.value);
        toggleDropdown();
    }
</script>