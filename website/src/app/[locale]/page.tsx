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
  const {seo} = getSiteContent(locale).home;
  return buildMetadata(locale, '/', seo.title, seo.description);
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  const content = getSiteContent(locale).home;

  return (
    <PageShell>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero__lead">{content.hero.intro}</p>
          <p className="hero__note">{content.hero.note}</p>
          <BulletList items={content.hero.points} />
        </div>

        <aside className="hero__panel">
          <article className="hero-card hero-card--signal">
            <p className="eyebrow">{content.labels.whyNow}</p>
            <h2>{content.whyJapanIntro}</h2>
            <p>{content.securityIntro}</p>
          </article>
          <CardGrid cards={content.teamNeeds} />
        </aside>
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.whyJapan} title={content.labels.whyJapanTitle} intro={content.whyJapanIntro} />
        <CardGrid cards={content.whyJapanCards} />
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.teamNeeds} title={content.labels.teamNeedsTitle} />
        <CardGrid cards={content.teamNeeds} />
      </section>

      <section className="section section--split">
        <SectionIntro eyebrow={content.labels.routes} title={content.labels.routesTitle} />
        <div className="route-grid">
          <article className="route-card">
            <p className="route-card__tag">{content.labels.openSourceTag}</p>
            <h3>{content.routes.selfHosted.title}</h3>
            <p>{content.routes.selfHosted.intro}</p>
            <BulletList items={content.routes.selfHosted.bullets} />
          </article>
          <article className="route-card route-card--cloud">
            <p className="route-card__tag">{content.labels.roadmapTag}</p>
            <h3>{content.routes.cloud.title}</h3>
            <p>{content.routes.cloud.intro}</p>
            <BulletList items={content.routes.cloud.bullets} />
          </article>
        </div>
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.security} title={content.labels.securityTitle} intro={content.securityIntro} />
        <CardGrid cards={content.trustCards} columns="two" />
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.useCases} title={content.labels.useCasesTitle} />
        <CardGrid cards={content.useCases} />
      </section>

      <CtaPanel title={content.cta.title} body={content.cta.body} footnote={content.cta.footnote} />
    </PageShell>
  );
}
