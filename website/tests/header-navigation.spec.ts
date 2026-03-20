import {expect, test} from '@playwright/test';

type LocaleKey = 'ja' | 'en' | 'zh-cn';

const navLabels: Record<
  LocaleKey,
  {
    home: string;
    selfHosted: string;
    cloud: string;
    security: string;
    contact: string;
    menuOpen: string;
  }
> = {
  ja: {
    home: 'ホーム',
    selfHosted: 'セルフホスト',
    cloud: 'クラウド計画',
    security: '安全性',
    contact: '相談',
    menuOpen: 'メニューを開く'
  },
  en: {
    home: 'Home',
    selfHosted: 'Self-Hosted',
    cloud: 'Cloud Roadmap',
    security: 'Security',
    contact: 'Contact',
    menuOpen: 'Open menu'
  },
  'zh-cn': {
    home: '首页',
    selfHosted: '私有部署',
    cloud: '云路线图',
    security: '安全说明',
    contact: '咨询',
    menuOpen: '打开菜单'
  }
};

test.describe('header navigation smoke', () => {
  test('desktop nav and language switch preserve page context', async ({page}) => {
    await page.goto('/cloud');
    const desktopHeader = page.locator('.site-header__desktop');

    await desktopHeader.getByRole('link', {name: navLabels.ja.security}).click();
    await expect(page).toHaveURL(/\/security$/);

    await desktopHeader.getByRole('link', {name: 'EN'}).click();
    await expect(page).toHaveURL(/\/en\/security$/);

    await desktopHeader.getByRole('link', {name: navLabels.en.contact}).click();
    await expect(page).toHaveURL(/\/en\/contact$/);

    await desktopHeader.getByRole('link', {name: '简中'}).click();
    await expect(page).toHaveURL(/\/zh-cn\/contact$/);

    await desktopHeader
      .getByRole('link', {name: navLabels['zh-cn'].selfHosted})
      .click();
    await expect(page).toHaveURL(/\/zh-cn\/self-hosted$/);

    await desktopHeader.getByRole('link', {name: 'JP'}).click();
    await expect(page).toHaveURL(/\/self-hosted$/);
  });

  test('desktop GitHub button keeps expected target', async ({page}) => {
    await page.goto('/en');
    const desktopHeader = page.locator('.site-header__desktop');

    const githubLink = desktopHeader.getByRole('link', {name: 'GitHub'});

    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/iHouse-japan/jclaw'
    );
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('mobile menu supports locale-aware navigation and closes after route change', async ({
    page
  }) => {
    await page.setViewportSize({width: 393, height: 852});
    await page.goto('/zh-cn/cloud');

    const menuToggle = page.locator('.mobile-nav__toggle');
    const mobilePanel = page.locator('.mobile-nav__panel');

    await page.getByRole('button', {name: navLabels['zh-cn'].menuOpen}).click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    await mobilePanel
      .getByRole('link', {name: navLabels['zh-cn'].security})
      .click();
    await expect(page).toHaveURL(/\/zh-cn\/security$/);
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    await page.getByRole('button', {name: navLabels['zh-cn'].menuOpen}).click();
    await mobilePanel.getByRole('link', {name: 'EN'}).click();
    await expect(page).toHaveURL(/\/en\/security$/);
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
