'use client';

import {useLocale, useTranslations} from 'next-intl';
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

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({className}: LanguageSwitcherProps = {}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div
      className={className ? `language-switcher ${className}` : 'language-switcher'}
      aria-label={t('language.label')}
    >
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
