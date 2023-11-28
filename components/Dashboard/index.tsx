"use client";
import { ReactNode, useState } from "react";
import Style from "./index.module.scss";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Sider, Content } = Layout;
export default function Dashboard({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className={Style.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h1>Instaride</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: <Link href="/">Dashboard</Link>,
            },
            {
              key: "2",

              label: <Link href="/users">Users</Link>,
            },
            {
              key: "3",

              label: <Link href="/vehicles">Vehicles</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className={Style.content}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
