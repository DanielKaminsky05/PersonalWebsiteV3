
import "./globals.css";
import PixelSnow from "@/components/PixelSnow";
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
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.02}
          minFlakeSize={1.25}
          pixelResolution={1000}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="snowflake"
        />
        {children}
      </body>
    </html>
  );
}
