import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YouTube Comment Picker - Fair & Random Winner Selection",
  description: "Use our free YouTube Comment Picker to randomly select winners from video comments. Ensure fair and unbiased giveaways!",
  keywords: [
    "YouTube Comment Picker",
    "Random Comment Picker",
    "YouTube Giveaway Tool",
    "Fair Winner Selection",
    "YouTube Contest Picker",
    "Giveaway Winner Selector",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
