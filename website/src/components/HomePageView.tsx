import {getTranslations} from 'next-intl/server';
import {BulletList} from '@/components/BulletList';
import {CardGrid} from '@/components/CardGrid';
import {CtaPanel} from '@/components/CtaPanel';
import {HeroPreview} from '@/components/HeroPreview';
import {PageShell} from '@/components/PageShell';
import {SectionIntro} from '@/components/SectionIntro';
import {TrustStrip} from '@/components/TrustStrip';
import {getSiteContent} from '@/content/site';
import type {AppLocale} from '@/i18n/routing';

type HomePageViewProps = {
  locale: AppLocale;
};

export async function HomePageView({locale}: HomePageViewProps) {
  const t = await getTranslations();
  const content = getSiteContent(locale).home;

  return (
    <PageShell>
      <section className="hero hero--product">
        <div className="hero__copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero__lead">{content.hero.intro}</p>
          <p className="hero__note">{content.hero.note}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="mailto:hello@jclaw.jp?subject=JClaw%20Demo%20Request">
              {t('cta.requestDemo')}
            </a>
            <a
              className="button button--secondary"
              href="https://github.com/iHouse-japan/jclaw"
              target="_blank"
              rel="noreferrer"
            >
              {t('cta.viewOss')}
            </a>
          </div>

          <p className="hero__roadmap">{content.hero.roadmapNote}</p>
          <BulletList items={content.hero.points} />

          <div className="hero__proofs">
            {content.hero.proofBadges.map((badge) => (
              <span key={badge} className="hero__proof-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <HeroPreview {...content.hero.preview} />
      </section>

      <section className="section section--trust">
        <SectionIntro eyebrow={content.labels.trust} title={content.labels.trustTitle} intro={content.trustIntro} />
        <TrustStrip items={content.trustStrip} />
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.whyJapan} title={content.labels.whyJapanTitle} intro={content.whyJapanIntro} />
        <CardGrid cards={content.whyJapanCards} />
      </section>

      <section className="section section--split">
        <SectionIntro eyebrow={content.labels.routes} title={content.labels.routesTitle} intro={content.routesIntro} />
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
        <SectionIntro
          eyebrow={content.labels.productOverview}
          title={content.labels.productOverviewTitle}
          intro={content.productOverviewIntro}
        />
        <CardGrid cards={content.productOverviewCards} columns="two" variant="feature" />
      </section>

      <section className="section">
        <SectionIntro eyebrow={content.labels.useCases} title={content.labels.useCasesTitle} />
        <CardGrid cards={content.useCases} />
      </section>

      <CtaPanel title={content.cta.title} body={content.cta.body} footnote={content.cta.footnote} />
    </PageShell>
  );
}
