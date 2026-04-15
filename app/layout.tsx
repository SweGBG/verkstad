import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "NordDäck — Däckverkstad Göteborg",
  description: "Din lokala däckverkstad i Göteborg. Vi byter, lagrar och balanserar däck.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}