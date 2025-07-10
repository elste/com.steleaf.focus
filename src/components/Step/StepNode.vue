<template>
  <div class="row">
    <div class="col">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">{{ step.title }}</div>
          <div class="text-subtitle2">{{ step.description }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat round color="red" icon="delete" @click="remove" />
          <q-btn flat round color="blue" icon="edit" @click="edit" />
          <q-btn flat round color="green" icon="check_circle" v-if="step.completed" @click="toggleComplete" />
          <q-btn flat round color="orange" icon="run_circle" v-else @click="toggleComplete" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-2">
      <AddStepNode @add-step="emit('add-step', step.id)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Step } from 'src/entities/models/Step';
import AddStepNode from 'src/components/Node/AddStepNode.vue';

const emit = defineEmits<{
  (e: 'add-step', prevId: string): void;
  (e: 'edit-step', step: Step): void;
  (e: 'toggle-complete', step: Step): void;
  (e: 'remove', step: Step): void;
}>();

const props = defineProps<{
  step: Step;
}>();

const edit = () => {
  emit('edit-step', props.step);
};

const toggleComplete = () => {
  props.step.completed = !props.step.completed;
  emit('toggle-complete', props.step);
};

const remove = () => {
  emit('remove', props.step);
};
</script>
