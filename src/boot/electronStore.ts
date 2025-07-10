import { defineBoot } from '#q-app/wrappers'
import { useElectronStore } from 'src/composable/useElectronStore'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async (/* { app, router, ... } */) => {
  const electronStore = useElectronStore();
  electronStore.load();
})
