/* eslint-disable vue/component-definition-name-casing */
import { boot } from 'quasar/wrappers';
import TermsAndConditionsDialog from 'src/components/dialogs/TermsAndConditions.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component('wiv-toc-dialog', TermsAndConditionsDialog);
});
