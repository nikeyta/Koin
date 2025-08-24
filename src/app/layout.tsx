import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavbarUser from "../../components/NavbarUser";
// import { ThemeProvider } from "../../context/ThemeContext";
import ClerkThemeProvider from "../../components/ClerkThemeProvider";
import Footer from "../../components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOIN",
  description: "Expense tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
   
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
    attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
       <ClerkThemeProvider>
        <NavbarUser />
      
        {children}
        <Footer/>
         </ClerkThemeProvider>
         </ThemeProvider>
      </body>
    </html>
   
   
  );
}
