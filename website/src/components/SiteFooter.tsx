import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export async function SiteFooter() {
  const t = await getTranslations();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="eyebrow">JClaw</p>
          <h2>Japan-first AI Agent</h2>
          <p>{t('common.footerNote')}</p>
        </div>
        <div className="site-footer__links">
          <Link href="/self-hosted">{t('nav.selfHosted')}</Link>
          <Link href="/cloud">{t('nav.cloud')}</Link>
          <Link href="/security">{t('nav.security')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
        </div>
      </div>
    </footer>
  );
}
