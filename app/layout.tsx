import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import SocketListener from "./components/ui/SocketListener";

export const metadata = {
  title: "DTPerfumeshop",
  description: "Cửa hàng nước hoa chính hãng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <SocketListener />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
