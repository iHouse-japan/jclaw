import {HomePageView} from '@/components/HomePageView';
import {getSiteContent} from '@/content/site';
import {buildMetadata} from '@/i18n/metadata';

const locale = 'ja' as const;

export const metadata = buildMetadata(
  locale,
  '/',
  getSiteContent(locale).home.seo.title,
  getSiteContent(locale).home.seo.description
);

export default async function JapaneseHomePage() {
  return <HomePageView locale={locale} />;
}
