"use client";
import Style from "./index.module.scss";
import React, { useEffect, useState } from "react";
import getAllVehicles from "../api/vahicles/getAllVehicles";
import { Flex, FloatButton, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { PackageI, VehicleI } from "@/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import AddVehicleForm from "@/components/Vehicle/AddVehicleForm";

interface DataType extends VehicleI {
  key: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "City & Hub",
    dataIndex: "cityAndHub",
    key: "cityAndHub",
  },

  {
    title: "Package",
    key: "package",
    dataIndex: "package",
    render: (Packages: PackageI[]) => (
      <Flex justify="space-between" gap={"small"}>
        {Packages?.map((Packages) => {
          return (
            <React.Fragment key={Packages._id}>
              <Tag
                key={Packages.name}
                color={Packages.active ? "success" : "cyan-inverse"}
              >
                {Packages.name}
                <br />
                Price:{Packages.price}/-
                <br />
                Deposit:{Packages.deposit}/-
                <br />
                limit:{Packages.limit} km
                <br />
              </Tag>
              <br />

              <br />
            </React.Fragment>
          );
        })}
      </Flex>
    ),
  },
  {
    title: "Type",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "Available",
    key: "availability",
    dataIndex: "availability",
  },
  {
    title: "Update",
    key: "update",
    dataIndex: "update",
  },
  {
    title: "Delete",
    key: "delete",
    dataIndex: "delete",
  },
  {
    title: "View",
    key: "view",
    dataIndex: "view",
  },
];

const { Title } = Typography;

const Page: React.FC = () => {
  const [vehicle, setVehicle] = useState<DataType[]>();
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
    const data = async () => {
      const data = await getAllVehicles();

      const vehicles = data.map((ele: DataType) => {
        return {
          ...ele,
          key: ele._id,
          cityAndHub: (
            <>
              {ele.city}/{ele.hub}
            </>
          ),
          availability: ele.availability ? "YES" : "NO",
          type: ele.isElectric ? "ELECTRIC" : "PETROL",
          delete: <>delete</>,
          view: <>view</>,
          update: <>update</>,
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
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={vehicle}
        pagination={false}
      />
      <FloatButton
        className={Style.addBtn}
        type="primary"
        shape="square"
        icon={<PlusSquareOutlined />}
        onClick={onOpen}
      />
      <AddVehicleForm open={open} onClose={onClose} />
    </div>
  );
};

export default Page;
