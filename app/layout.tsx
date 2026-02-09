
import "./globals.css";
import PixelSnow from "@/components/ui/PixelSnow";
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Daniel Kaminsky -- Portfolio',
  description: 'Explore the portfolio of Daniel Kaminsky, including software projects, technical work, and experience.',
  openGraph: {
    title: 'Thank you for sharing my portfolio :)',
    description: 'Check out my portfolio! I put a lot of effort into it.',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}