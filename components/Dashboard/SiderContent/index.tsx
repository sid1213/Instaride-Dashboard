import React from "react";
import { Button, Menu } from "antd";
import Style from "./index.module.scss";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { logOutUseAction } from "@/redux/user";
import { ArrowRightOutlined } from "@ant-design/icons";

const SiderContent = () => {
  const Pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await dispatch(logOutUseAction());
  };
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
          {
            key: "logout",

            label: (
              <Button onClick={handleClick} type="link" style={{ padding: 0 }}>
                <h3>
                  Logout <ArrowRightOutlined />
                </h3>
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};

export default SiderContent;
