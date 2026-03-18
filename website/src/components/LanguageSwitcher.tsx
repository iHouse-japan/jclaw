'use client';

import {useLocale} from 'next-intl';
import NextLink from 'next/link';
import {usePathname} from 'next/navigation';
import {routing, type AppLocale} from '@/i18n/routing';

const localeLabels: Record<AppLocale, string> = {
  ja: 'JP',
  en: 'EN',
  'zh-cn': '简中'
};

function buildLocalePath(targetLocale: AppLocale, pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const hasLocalePrefix =
    segments[0] === 'ja' || segments[0] === 'en' || segments[0] === 'zh-cn';
  const baseSegments = hasLocalePrefix ? segments.slice(1) : segments;
  const basePath = baseSegments.length ? `/${baseSegments.join('/')}` : '/';

  if (targetLocale === 'ja') {
    return basePath;
  }

  return basePath === '/' ? `/${targetLocale}` : `/${targetLocale}${basePath}`;
}

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();

  return (
    <div className="language-switcher" aria-label="Language switcher">
      {routing.locales.map((nextLocale) => {
        const href = buildLocalePath(nextLocale, pathname);

        return (
          <NextLink
          key={nextLocale}
          className={nextLocale === locale ? 'language-pill is-active' : 'language-pill'}
          href={href}
        >
          {localeLabels[nextLocale]}
          </NextLink>
        );
      })}
    </div>
  );
}
