"use client";
import { ReactNode, useEffect, useState } from "react";
import Style from "./index.module.scss";
import { Layout, Spin, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SiderContent from "./SiderContent";
import LogIn from "../LogIn";
import { useAppSelector } from "@/redux";
import { useRouter } from "next/navigation";

export default function Dashboard({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const { user, loading } = useAppSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.push("/", { scroll: true });
    }
  }, [user]);

  return (
    <>
      {user?.role === "ADMIN" ? (
        <Spin spinning={loading}>
          <Layout className={Style.layout} hidden={!loading}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <SiderContent />
            </Sider>
            <Layout>
              <Content className={Style.content}>{children}</Content>
            </Layout>
          </Layout>
        </Spin>
      ) : (
        <LogIn />
      )}
    </>
  );
}
