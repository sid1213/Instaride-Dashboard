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
import { useAppSelector } from "@/redux";
interface DataType
  extends Omit<CitiesI, "hubs" | "createdAt" | "updatedAt" | "active" | "__v"> {
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
  const pathName = usePathname();
  const [cityArray, setCityArray] = useState<DataType[]>();
  const cities = useAppSelector((state) => state?.cities);

  useEffect(() => {
    const citiesData = cities?.map((city) => {
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
    setCityArray(citiesData);
  }, [pathName, cities]);

  return (
    <div>
      <Title level={2} className={Style.title}>
        CITY & HUBS
      </Title>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={cityArray}
        pagination={false}
      />
    </div>
  );
};

export default Page;
