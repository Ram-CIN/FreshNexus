import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import { Suspense } from "react";


export const metadata = {
  title: "Fresh Nexus",
  description:
    "Fresh Nexus food app",
  alternates: {
    canonical: "/analytics",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-roboto">
        <CartProvider>
          <Suspense>
            <Header />
          </Suspense>
           

          {/* offset for fixed header */}
          <main>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
