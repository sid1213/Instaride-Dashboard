"use client";
import { ReactNode, useState } from "react";
import Style from "./index.module.scss";
import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SiderContent from "./SiderContent";

export default function Dashboard({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className={Style.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderContent />
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
