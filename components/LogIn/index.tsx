"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux";
import { clearUser, getCitiesAction, getUserAction } from "@/redux/user";
import Style from "./index.module.scss";
import Title from "antd/es/typography/Title";

type FieldType = {
  email: string;
  password: string;
};

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  dispatch(clearUser());
  const onFinish = async (values: FieldType) => {
    setLoading(true);

    await dispatch(
      getUserAction({
        email: values.email,
        password: values.password,
      })
    )
      .then(() => {
        console.log("message");
        dispatch(getCitiesAction());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {}, [dispatch, onFinish]);
  return (
    <Space className={Style.form} align="center" direction="vertical">
      <Title level={3}>INSTARIDE DASHBOARD</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        disabled={loading}
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default LogIn;
