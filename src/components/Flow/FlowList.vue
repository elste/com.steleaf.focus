<template>
  <div class="row justify-between">
    <div class="col" v-for="step in steps">
      <StepNode :step="step" @add-step="addStep" @edit-step="editStep" @toggle-complete="toggleCompleteStep"
        @remove="removeStep" />
    </div>
    <div class="col">
      <TargetNode :item="target" @edit-target="editTarget" @toggle-complete="toggleCompleteTarget" @add-step="addStep">
      </TargetNode>
    </div>
  </div>

  <QDialog :model-value="!!currentTarget" persistent full-height full-width maximized transition-show="none"
    transition-hide="none">
    <NodeForm :item="currentTarget" @confirm="confirmTarget" @cancel="cancelTarget"></NodeForm>
  </QDialog>

  <QDialog :model-value="!!currentStep" persistent full-height full-width maximized transition-show="none"
    transition-hide="none">
    <NodeForm :item="currentStep" @confirm="confirmStep" @cancel="cancelStep"></NodeForm>
  </QDialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { extend, QDialog } from 'quasar';
import { storeToRefs } from 'pinia';
import { useStepStore } from 'src/stores/StepStore';
import { useTargetStore } from 'src/stores/TargetStore';
import TargetNode from 'src/components/Target/TargetNode.vue';
import StepNode from 'src/components/Step/StepNode.vue';
// import { Step } from 'src/entities/models/Step';
import { Target } from 'src/entities/models/Target';
import NodeForm from 'src/components/Node/NodeForm.vue';
import { Node } from 'src/entities/models/Node';
import { Step } from 'src/entities/models/Step';


const currentTarget = ref<Target | null>(null);
const currentStep = ref<Step | null>(null);

const targetStore = useTargetStore();
const { current: target } = storeToRefs(targetStore);

const stepStore = useStepStore();
const { currents: steps } = storeToRefs(stepStore);

const editTarget = (item: Target | null) => {
  currentTarget.value = extend({}, item);
};

const confirmTarget = (item: Node) => {
  const target = extend({}, item) as Target;
  target.title = item.title;
  target.description = item.description;

  targetStore.save(target);
  currentTarget.value = null;
};

const cancelTarget = () => {
  currentTarget.value = null;
};

const toggleCompleteTarget = (item: Target) => {
  item.completed = !item.completed;
  targetStore.save(item);
};

const addStep = (prevId: string | null = null) => {
  stepStore.add(prevId);
};

const editStep = (step: Step) => {
  currentStep.value = extend({}, step);
};

const confirmStep = (item: Node) => {
  const step = extend({}, item) as Step;
  step.title = item.title;
  step.description = item.description;

  stepStore.save(step);
  currentStep.value = null;
};

const cancelStep = () => {
  currentStep.value = null;
};

const toggleCompleteStep = (item: Step) => {
  item.completed = !item.completed;
  stepStore.save(item);
};

const removeStep = (step: Step) => {
  stepStore.remove(step);
};
</script>
