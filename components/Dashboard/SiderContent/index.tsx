import React from "react";
import { Menu } from "antd";
import Style from "./index.module.scss";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SiderContent = () => {
  const Pathname = usePathname();
  console.log(Pathname, Pathname.split("/"));
  return (
    <>
      <Title level={3} className={Style.heading}>
        Instaride
      </Title>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[
          Pathname !== "/" ? Pathname.split("/")[1] : "dashboard",
        ]}
        items={[
          {
            key: "dashboard",
            label: <Link href="/">Dashboard</Link>,
          },
          {
            key: "users",

            label: <Link href="/users">Users</Link>,
          },
          {
            key: "vehicles",

            label: <Link href="/vehicles">Vehicles</Link>,
          },
          {
            key: "cityandhubs",

            label: <Link href="/cityandhubs">City & Hubs</Link>,
          },
        ]}
      />
    </>
  );
};

export default SiderContent;
