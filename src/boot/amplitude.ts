import { boot } from 'quasar/wrappers';
import { BrowserClient } from '@amplitude/analytics-types';
import * as amplitude from '@amplitude/analytics-browser';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $amplitude: BrowserClient;
  }
}

amplitude.init(<string>process.env.AMP_API_KEY, 'Anonymous', {
  defaultTracking: {
    sessions: true,
    pageViews: true,
  },
})
export default boot(({ app }) => {
  app.config.globalProperties.$amplitude = amplitude;
});

export {
  amplitude
}
