"use client";
import Style from "./index.module.scss";
import React, { ReactNode, useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { CitiesI } from "@/types";
import data from "../../public/cities.json";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
interface DataType
  extends Omit<
    CitiesI,
    "hubs" | "vehicles" | "createdAt" | "updatedAt" | "active"
  > {
  key: string;
  hubs: string[];
  view: ReactNode;
  active: string;
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
  const [cities, setCities] = useState<DataType[]>([]);
  const pathName = usePathname();

  useEffect(() => {
    const citiesData = data.cities;

    const CityArray = citiesData.map((city) => {
      return {
        ...city,
        key: city._id,
        active: city.active ? "YES" : "NO",
        view: (
          <Link href={`${pathName}/${city.name}`}>
            <EyeOutlined />
          </Link>
        ),
        hubs: city.hubs.map((hub) => hub.name),
      };
    });

    setCities(CityArray);
  }, [pathName]);

  return (
    <div>
      <Title level={2} className={Style.title}>
        CITY & HUBS
      </Title>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={cities}
        pagination={false}
      />
    </div>
  );
};

export default Page;
