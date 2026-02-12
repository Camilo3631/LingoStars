<template>
   <p class="text-base sm:text-xl md:text-2xl font-medium flex items-center justify-center space-x-1">
    <span>{{  sentence.full.split('___')[0] }}</span>

    <input 
     :value="modelValue"
     @input="emit('update:modelValue', $event.target.value)"
     :disabled="disabled"
     class="border-b border-white w-16 sm:w-24 md:w-32 text-center text-[1.2rem]"
     @keyup.enter="emit('submit')"
     />
     <span>{{ sentence.full.split('___')[1] }}</span>
   </p>
</template>

<script setup>
defineProps({
     sentence: Object,
     modelValue: String,
     disabled: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

</script>ls
