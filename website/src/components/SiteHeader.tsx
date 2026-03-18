import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';

export async function SiteHeader() {
  const t = await getTranslations();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand-mark">J</span>
          <span className="brand-copy">
            <strong>JClaw</strong>
            <small>{t('common.brandTagline')}</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">{t('nav.overview')}</Link>
          <Link href="/self-hosted">{t('nav.selfHosted')}</Link>
          <Link href="/cloud">{t('nav.cloud')}</Link>
          <Link href="/security">{t('nav.security')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
          <a
            className="main-nav__github"
            href="https://github.com/iHouse-japan/jclaw"
            target="_blank"
            rel="noreferrer"
          >
            {t('nav.github')}
          </a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
