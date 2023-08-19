import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import ReduxProvider from "./store/provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
