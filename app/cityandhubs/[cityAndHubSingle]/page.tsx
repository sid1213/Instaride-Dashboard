"use client";
import Style from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Hub } from "@/types";
import data from "../../../public/cities.json";

import { usePathname } from "next/navigation";
import path from "path";

interface DataType extends Omit<Hub, "vehicles"> {
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
    title: "Landmark",
    dataIndex: "landmark",
    key: "landmark",
  },
  {
    title: "Neighbourhood",
    key: "neighbourhood",
    dataIndex: "neighbourhood",
  },
  {
    title: "Full Address",
    key: "fullAddress",
    dataIndex: "fullAddress",
  },
  {
    title: "Operation Start",
    key: "operationStart",
    dataIndex: "operationStart",
    render: (_, { operationStart }) => <>{operationStart}:00</>,
  },
  {
    title: "Operation End",
    key: "operationEnd",
    dataIndex: "operationEnd",
    render: (_, { operationEnd }) => <>{operationEnd}:00</>,
  },
  {
    title: "Closing Days",
    key: "closingDays",
    dataIndex: "closingDays",
    render: (_, { closingDays }) => (
      <>
        {closingDays &&
          closingDays.map((day: string) => {
            return (
              <Tag color={"green"} key={day}>
                {day.toUpperCase()}
              </Tag>
            );
          })}
      </>
    ),
  },
];

const { Title } = Typography;

const Page: React.FC = () => {
  const [hubs, setHubs] = useState<DataType[]>([]);
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  console.log(id);

  useEffect(() => {
    const citiesData = data.cities;
    const cityIndex = citiesData.findIndex((city) => city.name == id);
    const city = citiesData[cityIndex];

    const hubsArray = city.hubs.map((hub) => {
      return {
        ...hub,
        key: hub._id.toString(),
        _id: hub._id.toString(),
      };
    });

    setHubs(hubsArray);
  }, [id, pathName]);

  return (
    <div>
      <Title level={2} className={Style.title}>
        {id}
      </Title>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={hubs}
        pagination={false}
      />
    </div>
  );
};

export default Page;
