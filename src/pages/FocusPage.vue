<template>
  <q-page class="row items-center bg-grey" padding>
    <div class="col">
      <FlowList></FlowList>
    </div>

    <q-page-sticky position="bottom-right" :offset="[5, 5]">
      <q-btn fab icon="save" color="primary" unelevated padding="xs" @click="save" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">

import FlowList from 'src/components/Flow/FlowList.vue';

// import { useElectronStore } from 'src/composable/useElectronStore';

// const electronStore = useElectronStore();
const save = () => {
  //electronStore.save();
  alert('Save functionality is not implemented yet.');

};


</script>
