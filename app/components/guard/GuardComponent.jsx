"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const GuardComponent = ({ children }) => {
  let token = useSelector((state) => state.user.token);
  const router = useRouter();
  if (!token) {
    return router.push("/login");
  }

  return children;
};

export default GuardComponent;
