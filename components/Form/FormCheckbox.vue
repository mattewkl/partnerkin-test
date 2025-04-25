<template>
  <label class="checkbox-wrapper">
    <input 
      type="checkbox"
      class="checkbox-input"
      :checked="modelValue"
      @change="handleChange"
    >
    <span class="checkbox-custom"></span>
    <span class="checkbox-label base-text">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: boolean;
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ .checkbox-custom {
    background-color: $button-primary;
    border-color: $button-primary;
    
    &:after {
      display: block;
    }
  }

  &:focus ~ .checkbox-custom {
    box-shadow: 0 0 0 2px rgba($button-primary, 0.2);
  }
}

.checkbox-custom {
  height: 1.8rem;
  width: 1.8rem;
  box-sizing: border-box;
  border: 1px solid $border-standart-color;
  border-radius: 0.5rem;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.6rem;
    top: 0.2rem;
    width: 0.5rem;
    height: 1rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}

.checkbox-label {
  margin-left: 1.2rem;
  font-size: 1.2rem;
  line-height: 1.4;
  user-select: none;
}
</style> 