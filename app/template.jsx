"use client";
import { useEffect } from "react";
import store from "./store";
export default function Template({ children }) {
  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state) {
        localStorage.setItem("state", JSON.stringify(state));
      }
    });
  }, []);
  return <div>{children}</div>;
}
