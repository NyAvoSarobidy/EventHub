import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import './globals.css';
import Providers from '@/components/Providers';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { Suspense } from 'react';
import Head from 'next/head';

<Head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</Head>



export const metadata = {
  title: {
    default: 'EventHub',
    template: '%s | EventHub' // %s sera remplacé par le titre de chaque page
  },
  description: 'Plateforme de réservation et organisation d\'événements',
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <NavBar />
            <Suspense fallback={null}>
              <PageLoader />
            </Suspense>
         
            <main className="min-h-screen pt-20 md:pt-24">
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
