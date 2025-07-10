import { defineStore, storeToRefs } from 'pinia'
import { Step } from 'src/entities/models/Step'
import { ref, computed } from 'vue'
import { useTargetStore } from './TargetStore'
import { uid } from 'quasar'

export const useStepStore = defineStore('Step', () => {
  const list = ref<Step[]>([])

  const targetStore = useTargetStore();
  const { current: target } = storeToRefs(targetStore);

  const currents = computed(() => {
    const output = target.value?.stepIds.map(id => list.value.find(step => step.id === id)) || []
    return output.filter(step => step !== undefined) as Step[]
  })

  function add(prevId: string | null) {
    const newStep: Step = {
      id: uid(),
      title: 'New Step',
      description: '',
      completed: false,
    }

    list.value.push(newStep);
    targetStore.addStep(newStep.id, prevId);
  }

  function save(step: Step) {
    const index = list.value.findIndex(s => s.id === step.id)
    if (index !== -1) {
      list.value[index] = step
    } else {
      step.id = uid()
      step.completed = false
      list.value.push(step)
    }
  }

  function remove(step: Step) {
    const index = list.value.findIndex(s => s.id === step.id)
    if (index !== -1) {
      list.value.splice(index, 1)
      targetStore.removeStep(step.id)
    }
  }

  return {
    list,
    currents,
    add,
    save,
    remove
  }
})

