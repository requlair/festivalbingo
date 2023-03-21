<template>
    <div>
        <button @click="toggleDropdown" class="relative border-2 px-2 py1 w-32 h-9 rounded-lg flex items-center">
            <div class="w-5 mr-2">&#x25BC;</div>
            {{ selectedItem.label }}
        </button>
        <div v-if="isOpen" id="myDropdown" class="absolute flex flex-col bg-white border-2 w-32 rounded-lg">
            <button v-for="item, index in items" :key="index" @click="handleItemClicked(item)" :class="[index !== 0 ? 'border-t-2' : '', 'flex items-center px-2 h-8']">
                <div class="w-5 mr-2" v-html="item.icon"></div>
                {{ item.label }}
            </button>
        </div>
     </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { DropdownItem } from '../../types/types';
    
    const props = defineProps<{ items: DropdownItem[], selectedItem: DropdownItem, onOptionClicked: Function }>();
    const isOpen = ref(false);
    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }
    const handleItemClicked = (item: DropdownItem) => {
        props.onOptionClicked(item.value);
        toggleDropdown();
    }
</script>