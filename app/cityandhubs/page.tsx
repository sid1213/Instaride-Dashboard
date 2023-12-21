"use client";
import Style from "./index.module.scss";
import React, { useEffect, useState } from "react";
import getAllVehicles from "../api/vahicles/getAllVehicles";
import { Flex, FloatButton, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { PackageI, VehicleSchemaI } from "@/types";
import { EyeOutlined } from "@ant-design/icons";

interface DataType extends VehicleSchemaI {
  key: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Active",
    dataIndex: "active",
    key: "active",
  },
  {
    title: "Content",
    key: "content",
    dataIndex: "content",
  },
  {
    title: "title",
    key: "title",
    dataIndex: "title",
  },
  {
    title: "Hubs",
    key: "hubs",
    dataIndex: "hubs",
    render: (_, { hubs }) => (
      <>
        {hubs.map((hubs) => {
          return (
            <Tag color={"green"} key={hubs}>
              {hubs.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "View",
    key: "view",
    dataIndex: "view",
  },
];

const { Title } = Typography;

const Page: React.FC = () => {
  const [vehicle, setVehicle] = useState<DataType[]>([]);

  useEffect(() => {
    const data = async () => {
      const data = await getAllVehicles();

      console.log(data);
      const vehicles = data.map((ele: VehicleSchemaI) => {
        return {
          ...ele,
          key: ele._id,
          pickup: ele.pickup ? "YES" : "NO",
          available: ele.available ? "YES" : "NO",
        };
      });
      setVehicle(vehicles);
      return data;
    };
    data();
  }, []);

  return (
    <div>
      <Title level={2} className={Style.title}>
        CITY & HUBS
      </Title>
      <Table scroll={{ x: true }} columns={columns} dataSource={vehicle} />
      <FloatButton />
    </div>
  );
};

export default Page;
