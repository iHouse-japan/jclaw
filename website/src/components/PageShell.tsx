import type {ReactNode} from 'react';
import {SiteHeader} from './SiteHeader';
import {SiteFooter} from './SiteFooter';

type PageShellProps = {
  children: ReactNode;
};

export async function PageShell({children}: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
    </>
  );
}
