import {BulletList} from '@/components/BulletList';
import {CardGrid} from '@/components/CardGrid';
import {CtaPanel} from '@/components/CtaPanel';
import {PageShell} from '@/components/PageShell';
import {SectionIntro} from '@/components/SectionIntro';
import {getSiteContent} from '@/content/site';
import {buildMetadata} from '@/i18n/metadata';

const locale = 'ja' as const;
const page = getSiteContent(locale).cloud;

export const metadata = buildMetadata(locale, '/cloud', page.seo.title, page.seo.description);

export default async function JapaneseCloudPage() {
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
