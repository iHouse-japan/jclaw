import {NextIntlClientProvider} from 'next-intl';
import jaMessages from '../../../messages/ja.json';

export default function JapaneseDefaultLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="ja" messages={jaMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
