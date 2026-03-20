import {HomePageView} from '@/components/HomePageView';
import {getSiteContent} from '@/content/site';
import {buildMetadata} from '@/i18n/metadata';
import type {AppLocale} from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const {seo} = getSiteContent(locale).home;
  return buildMetadata(locale, '/', seo.title, seo.description);
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  return <HomePageView locale={locale} />;
}
