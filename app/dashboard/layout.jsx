"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  let token = useSelector((state) => state.user.token);
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
