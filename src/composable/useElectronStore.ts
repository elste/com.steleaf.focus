import { useTargetStore } from 'src/stores/TargetStore';
import { useStepStore } from 'src/stores/StepStore';
import Store from 'electron-store';

const electronStore = new Store();

const STORE_KEY_TARGET = 'targetStore';
const STORE_KEY_STEP = 'stepStore';


interface ElectronStoreAPI {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}

declare global {
  interface Window {
    electronStore: ElectronStoreAPI;
  }
}

export function useElectronStore() {
  const get = <T>(key: string): T | null => {
    try {
      return window.electronStore.get(key) as T;
    } catch (error) {
      console.error(`Errore durante get(${key}):`, error);
      return null;
    }
  };

  const set = (key: string, value: unknown): void => {
    try {
      window.electronStore.set(key, value);
    } catch (error) {
      console.error(`Errore durante set(${key}):`, error);
    }
  };

  const targetStore = useTargetStore();
  const stepStore = useStepStore();

  // Load persisted data on startup
  function load() {
    // Load target store data
    const targetData = get(STORE_KEY_TARGET);
    if (targetData) {
      targetStore.$patch(targetData);
    }

    // Load step store data
    const stepData = get(STORE_KEY_STEP);
    if (stepData) {
      stepStore.$patch(stepData);
    }

  }

  function save() {
    // Save target store data
    set(STORE_KEY_TARGET, targetStore.$state);
    // Save step store data
    set(STORE_KEY_STEP, stepStore.$state);
  }

  return {
    load,
    save
  };
}
