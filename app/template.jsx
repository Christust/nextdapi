"use client";
import Loader from "./components/Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { useRouter } from "next/navigation";

function Auth({ children }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user.profile) {
      router.push("/login");
    }
  }, []);
  return <>{children}</>;
}

export default function Template({ children }) {
  const loader = useSelector((state) => state.loader.count);
  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state) {
        localStorage.setItem("state", JSON.stringify(state));
      }
    });
  }, []);
  return (
    <Auth>
      <div>
        {children}
        {loader > 0 && <Loader />}
      </div>
    </Auth>
  );
}
