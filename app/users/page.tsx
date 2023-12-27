"use client";
import LogIn from "@/components/LogIn";

import React, { useEffect } from "react";

import { useAppSelector } from "@/redux";

const Page = () => {
  const user = useAppSelector((state) => state.user);
  useEffect(() => {}, [user]);
  return <div>{!user ? <LogIn /> : user?._id}</div>;
};

export default Page;
