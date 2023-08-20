"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const AuthenticatedComponent = ({ children }) => {
  let token = useSelector((state) => state.user.token);
  const router = useRouter();

  if (token) {
    return router.push("/");
  }

  return children;
};

export default AuthenticatedComponent;
