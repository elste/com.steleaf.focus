<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <q-form @submit="onConfirm" class="q-gutter-sm" v-if="item">
        <q-input outlined v-model="item.title" label="title" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input outlined v-model="item.description" label="description" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <div class="row justify-between">
          <q-btn label="Cancel" type="button" color="negative" unelevated @click="onCancel" />
          <q-btn label="Confirm" type="submit" color="primary" unelevated />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Node } from 'src/entities/models/Node';

const props = defineProps<{
  item: Node | null;
}>();

const emit = defineEmits<{
  (e: 'confirm', item: Node): void;
  (e: 'cancel'): void;
}>();

function onConfirm() {
  if (props.item) {
    emit('confirm', props.item);
  }
}
function onCancel() {
  emit('cancel');
}

</script>
