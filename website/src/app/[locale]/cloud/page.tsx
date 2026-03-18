import {BulletList} from '@/components/BulletList';
import {CardGrid} from '@/components/CardGrid';
import {CtaPanel} from '@/components/CtaPanel';
import {PageShell} from '@/components/PageShell';
import {SectionIntro} from '@/components/SectionIntro';
import {getSiteContent} from '@/content/site';
import {buildMetadata} from '@/i18n/metadata';
import type {AppLocale} from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const {seo} = getSiteContent(locale).cloud;
  return buildMetadata(locale, '/cloud', seo.title, seo.description);
}

export default async function CloudPage({
  params
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const page = getSiteContent(locale).cloud;

  return (
    <PageShell>
      <section className="page-hero page-hero--roadmap">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        {page.note ? <p className="page-hero__note">{page.note}</p> : null}
      </section>

      {page.sections.map((section) => (
        <section key={section.title} className="section">
          <SectionIntro eyebrow={page.eyebrow} title={section.title} intro={section.intro} />
          {section.cards ? <CardGrid cards={section.cards} /> : null}
          {section.bullets ? <BulletList items={section.bullets} /> : null}
        </section>
      ))}

      <CtaPanel title={page.cta.title} body={page.cta.body} mode="waitlist-contact" />
    </PageShell>
  );
}
