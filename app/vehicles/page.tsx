"use client";
import Style from "./index.module.scss";
import React, { useEffect, useState } from "react";
import getAllVehicles from "../api/vahicles/getAllVehicles";
import { Flex, FloatButton, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { PackageI, VehicleSchemaI } from "@/types";

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
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Hub",
    dataIndex: "hub",
    key: "hub",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Hubs",
    key: "hubs",
    dataIndex: "hubs",
    render: (_, { hubs }) => (
      <>
        {hubs.map((hubs) => {
          let color = hubs.length > 5 ? "geekblue" : "green";
          if (hubs === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={hubs}>
              {hubs.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Limit",
    key: "limit",
    dataIndex: "limit",
    render: (limit: string) => {
      return `${limit}km`;
    },
  },
  {
    title: "Deposit",
    key: "deposit",
    dataIndex: "deposit",
    render: (deposit: string) => {
      return `${deposit}/-`;
    },
  },
  {
    title: "Make year",
    key: "make_year",
    dataIndex: "make_year",
  },
  {
    title: "Img",
    key: "img",
    dataIndex: "img",
  },
  {
    title: "price",
    key: "price",
    dataIndex: "price",
    render: (price: string) => {
      return `${price}/-`;
    },
  },

  {
    title: "Duration",
    key: "duration",
    dataIndex: "duration",
    render: (durations: PackageI[]) => (
      <Flex justify="space-between" gap={"small"}>
        {durations.map((duration) => {
          return (
            <>
              <Tag key={duration.name}>
                {duration.name}
                <br />
                Price:{duration.price}/-
                <br />
                limit:{duration.limit} km
                <br />
              </Tag>
              <br />

              <br />
            </>
          );
        })}
      </Flex>
    ),
  },
  {
    title: "Available",
    key: "available",
    dataIndex: "available",
  },
  {
    title: "Transmission",
    key: "transmission",
    dataIndex: "transmission",
  },
  {
    title: "Available-date",
    key: "available_date",
    dataIndex: "available_date",
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
        All Vehicles{" "}
      </Title>
      <Table scroll={{ x: true }} columns={columns} dataSource={vehicle} />
      <FloatButton />
    </div>
  );
};

export default Page;
