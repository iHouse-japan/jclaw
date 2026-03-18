import {BulletList} from '@/components/BulletList';
import {CardGrid} from '@/components/CardGrid';
import {CtaPanel} from '@/components/CtaPanel';
import {PageShell} from '@/components/PageShell';
import {SectionIntro} from '@/components/SectionIntro';
import {getSiteContent} from '@/content/site';
import {buildMetadata} from '@/i18n/metadata';

const locale = 'ja' as const;
const page = getSiteContent(locale).security;

export const metadata = buildMetadata(locale, '/security', page.seo.title, page.seo.description);

export default async function JapaneseSecurityPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      {page.sections.map((section) => (
        <section key={section.title} className="section">
          <SectionIntro eyebrow={page.eyebrow} title={section.title} intro={section.intro} />
          {section.cards ? <CardGrid cards={section.cards} columns="two" /> : null}
          {section.bullets ? <BulletList items={section.bullets} /> : null}
        </section>
      ))}

      <CtaPanel title={page.cta.title} body={page.cta.body} mode="contact-security" />
    </PageShell>
  );
}
