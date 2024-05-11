import { Inter } from "next/font/google";
import "./ui/globals.css";
import 'sweetalert2/dist/sweetalert2.min.css';
// import '@sweetalert2/theme-dark/dark.css'
import '@sweetalert2/theme-borderless/borderless.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yaad PLUG",
  description: "LOGISTIC - COURIER SERVICES - MEAL DELIVERY",
};

// export const dynamic = 'force-static'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}