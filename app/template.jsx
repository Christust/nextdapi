"use client";
import Loader from "./components/Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { useRouter } from "next/navigation";

export default function Template({ children }) {
  const user = useSelector((state) => state.user);
  const loader = useSelector((state) => state.loader.count);
  const router = useRouter();
  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state) {
        localStorage.setItem("state", JSON.stringify(state));
      }
    });
    if (user.profile) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      {children}
      {loader > 0 && <Loader />}
    </div>
  );
}
