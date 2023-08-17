import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html>
        <body>{children}</body>
      </html>
    </Provider>
  );
}
