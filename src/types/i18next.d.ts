import * as en from '~/translations/locales/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
