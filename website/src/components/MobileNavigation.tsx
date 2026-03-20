'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';

export function MobileNavigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open ? <button type="button" className="mobile-nav__backdrop" aria-label={t('nav.menuClose')} onClick={() => setOpen(false)} /> : null}

      <div id="mobile-nav-panel" className={open ? 'mobile-nav__panel is-open' : 'mobile-nav__panel'} aria-hidden={!open}>
        <nav className="mobile-nav__links" aria-label="Mobile primary">
          <Link href="/">{t('nav.overview')}</Link>
          <Link href="/self-hosted">{t('nav.selfHosted')}</Link>
          <Link href="/cloud">{t('nav.cloud')}</Link>
          <Link href="/security">{t('nav.security')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
          <a href="https://github.com/iHouse-japan/jclaw" target="_blank" rel="noreferrer">
            {t('nav.github')}
          </a>
        </nav>

        <LanguageSwitcher className="language-switcher--mobile" />
      </div>
    </div>
  );
}
