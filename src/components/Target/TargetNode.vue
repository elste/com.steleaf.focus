<template>
  <div class="row" v-if="item">
    <div class="col-2" v-if="item.stepIds.length == 0">
      <AddStepNode @add-step="emit('add-step')" />
    </div>
    <div class="col">
      <q-card class="">
        <q-card-section>
          <div class="text-h6"><q-icon name="ads_click" /> {{ item.title }}</div>
          <div class="text-subtitle2">{{ item.description }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat round color="blue" icon="edit" @click="edit" />
          <q-btn flat round color="green" icon="check_circle" v-if="item.completed" @click="toggleComplete" />
          <q-btn flat round color="orange" icon="run_circle" v-else @click="toggleComplete" />
        </q-card-actions>
      </q-card>
    </div>

  </div>

</template>

<script lang="ts" setup>

import AddStepNode from 'src/components/Node/AddStepNode.vue';
import { Target } from 'src/entities/models/Target';

const emit = defineEmits<{
  (e: 'edit-target', item: Target | null): void;
  (e: 'toggle-complete', item: Target): void;
  (e: 'add-step'): void;
}>();

const props = defineProps<{
  item: Target | null;
}>();


const edit = () => {
  emit('edit-target', props.item);
};

const toggleComplete = () => {
  if (props.item) {
    emit('toggle-complete', props.item);
  }
};


</script>
