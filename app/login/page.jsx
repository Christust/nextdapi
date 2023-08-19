"use client";
import { useEffect } from "react";
import authService from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setToken,
  setRefreshToken,
} from "../store/reducers/user/userSlice";
export default function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.login({ username: "chrissss", password: "123" }).then((res) => {
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      dispatch(setRefreshToken(res.data.refresh_token));
    });
  }, []);
  return <div className="text-danger">Login</div>;
}
