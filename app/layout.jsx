import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
