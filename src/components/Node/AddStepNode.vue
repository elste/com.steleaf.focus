<template>
  <div class="row items-center full-height">
    <div class="col line"></div>
    <div class="col-auto">
      <q-btn color="primary" icon="add" size="sm" padding="xs" unelevated @click="emit('add-step')" />
    </div>
    <div class="col line"></div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'add-step'): void;
}>();

</script>

<style scoped>
.line {
  height: 2px;
  background-color: navy;
}
</style>
