import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import ReactQueryProviders from "@/hooks/useReactQuery";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}