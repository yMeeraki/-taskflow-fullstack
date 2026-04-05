import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className="text-foreground bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
