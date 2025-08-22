import "./globals.css";
import Link from "next/link";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ReactNode } from "react";

export const metadata = { title: "Pokémon Explorer", description: "Explore Pokémon" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <FavoritesProvider>
          <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">Pokémon Explorer</Link>
              <div className="flex gap-8">
                <Link href="/" className="hover:text-blue-600 font-medium">Home</Link>
                <Link href="/favorites" className="hover:text-blue-600 font-medium">Favorites</Link>
              </div>
            </div>
          </nav>
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
