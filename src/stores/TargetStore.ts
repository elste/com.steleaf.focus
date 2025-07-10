import { defineStore } from 'pinia'
import { uid } from 'quasar'
import { Target } from 'src/entities/models/Target'
import { ref, computed } from 'vue'

export const useTargetStore = defineStore('target', () => {
  const list = ref<Target[]>([
    {
      id: uid(),
      title: 'Set a target',
      description: 'Define a clear and achievable target to focus on. Add sofme steps to reach it.',
      completed: false,
      stepIds: []
    },

  ])
  const currentIdx = ref<number>(0)
  const current = computed<Target | null>(() => list.value[currentIdx.value] || null)

  function save(target: Target) {
    const index = list.value.findIndex(t => t.id === target.id)
    if (index !== -1) {
      list.value[index] = target;
    } else {
      target.id = uid();
      target.completed = false;
      list.value.push(target)
    }
  }

  function addStep(stepId: string, prevId: string | null) {
    if (current.value) {
      if (prevId) {
        const prevIndex = current.value.stepIds.indexOf(prevId);

        console.log('prevIndex', prevIndex);

        const index = prevIndex !== -1 ? prevIndex+1 : current.value.stepIds.length;
        console.log('index', index);
        current.value.stepIds.splice(index, 0, stepId);
      } else {
        current.value.stepIds.push(stepId);
      }
    }
  }

  function removeStep(stepId: string) {
    if (current.value) {
      const index = current.value.stepIds.indexOf(stepId);
      if (index !== -1) {
        current.value.stepIds.splice(index, 1);
      }
    }
  }

  return {
    list,
    current,
    save,
    addStep,
    removeStep
  }
})

