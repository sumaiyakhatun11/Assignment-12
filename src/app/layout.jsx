import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuthProvider";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const RootLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <html className={`${manrope.variable} ${playfair.variable}`}>
        <body className="app-shell">
          <Navbar />
          <main className="page-container">{children}</main>
        </body>
      </html>
    </NextAuthProvider>
  );
};

export default RootLayout;
