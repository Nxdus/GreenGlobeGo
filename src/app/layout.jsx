import { AuthProviders } from "@/app/Providers";

import { Mitr } from "next/font/google";
import "./globals.css";

const mitr = Mitr({ subsets: ["latin"], weight: ["400"] },);

export const metadata = {
  title: "Green Globe Go",
  description: "Web-Application for ...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mitr.className}>
        <div className="w-full h-screen flex justify-center items-center bg-black">
          <div className="w-full h-full flex justify-center bg-[#FFF5E8] sm:hidden">
            <AuthProviders>
              {children}
            </AuthProviders>
          </div>
          <div className="hidden sm:flex justify-center items-center">
            <p className="text-white font-bold">โปรดใช้งานบนมือถือเท่านั้นครับ !</p>
          </div>
        </div>
      </body>
    </html>
  );
}
