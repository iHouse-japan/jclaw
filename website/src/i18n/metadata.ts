import type {Metadata} from 'next';
import type {AppLocale} from './routing';

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

function localizedPath(locale: AppLocale, pathname: string) {
  const clean = pathname === '/' ? '' : pathname;
  if (locale === 'ja') {
    return clean || '/';
  }

  return `/${locale}${clean}`;
}

export function buildMetadata(
  locale: AppLocale,
  pathname: string,
  title: string,
  description: string
): Metadata {
  const canonical = localizedPath(locale, pathname);

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ja: localizedPath('ja', pathname),
        en: localizedPath('en', pathname),
        'zh-CN': localizedPath('zh-cn', pathname)
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'JClaw',
      locale: locale === 'zh-cn' ? 'zh_CN' : locale,
      type: 'website'
    }
  };
}
