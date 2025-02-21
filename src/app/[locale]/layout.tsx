import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/Components/header";
import Footer from "@/Components/Footer";
import { config } from "@/utils/contents";

const rubik = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : undefined,
  title: {
    default: config.websiteName,
    template: "%s | " + config.websiteName,
  },
  description: config.description,
  keywords: config.keywords,
  icons: {
    icon: config.iconPath,
  },
  robots: { follow: true, index: true },
  alternates: {
    canonical: "./",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <body className={`${rubik.className} relative antialiased`}>
          <Header />
          {children}
          <Footer locale={locale} />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
