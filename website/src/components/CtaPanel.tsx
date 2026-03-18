import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

type CtaPanelProps = {
  title: string;
  body: string;
  footnote?: string;
  mode?: 'demo-oss' | 'contact-security' | 'waitlist-contact';
};

export async function CtaPanel({
  title,
  body,
  footnote,
  mode = 'demo-oss'
}: CtaPanelProps) {
  const t = await getTranslations();

  const actions =
    mode === 'contact-security'
      ? [
          {href: '/contact', label: t('cta.contactTeam'), kind: 'primary' as const},
          {href: '/security', label: t('cta.reviewSecurity'), kind: 'secondary' as const}
        ]
      : mode === 'waitlist-contact'
        ? [
            {href: 'mailto:hello@jclaw.jp?subject=JClaw%20Cloud%20Roadmap', label: t('cta.joinWaitlist'), kind: 'primary' as const},
            {href: '/contact', label: t('cta.contactTeam'), kind: 'secondary' as const}
          ]
        : [
            {href: 'mailto:hello@jclaw.jp?subject=JClaw%20Demo%20Request', label: t('cta.requestDemo'), kind: 'primary' as const},
            {href: 'https://github.com/iHouse-japan/jclaw', label: t('cta.viewOss'), kind: 'secondary' as const}
          ];

  return (
    <section className="cta-panel">
      <div>
        <p className="eyebrow">{t('section.launch')}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        {footnote ? <p className="cta-panel__footnote">{footnote}</p> : null}
      </div>
      <div className="cta-panel__actions">
        {actions.map((action) =>
          action.href.startsWith('http') || action.href.startsWith('mailto:')
            ? (
                <a
                  key={action.label}
                  className={action.kind === 'primary' ? 'button button--primary' : 'button button--secondary'}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {action.label}
                </a>
              )
            : (
                <Link
                  key={action.label}
                  className={action.kind === 'primary' ? 'button button--primary' : 'button button--secondary'}
                  href={action.href}
                >
                  {action.label}
                </Link>
              )
        )}
      </div>
    </section>
  );
}
