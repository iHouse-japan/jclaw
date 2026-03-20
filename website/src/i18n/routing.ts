import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en', 'zh-cn'],
  defaultLocale: 'ja',
  localePrefix: 'as-needed'
});

export type AppLocale = (typeof routing.locales)[number];
