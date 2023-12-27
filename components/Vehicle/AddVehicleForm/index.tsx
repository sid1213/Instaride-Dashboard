"use client";
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Style from "./index.module.scss";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
} from "antd";

import { FieldData } from "rc-field-form/lib/interface";
import { useAppSelector } from "@/redux";

interface PropType {
  onClose: () => void;
  open: boolean;
}
interface OptionType {
  value: string;
  label: string;
  disabled?: boolean;
}
const AddVehicleForm: React.FC<PropType> = ({ onClose, open }) => {
  const [cityOption, setCityOption] = useState<OptionType[]>();
  const [form] = Form.useForm();
  const [hubOption, setHubOption] = useState<OptionType[]>([]);
  const [disabledHub, setDisabledHub] = useState<boolean>(true);
  const [isElectric, setIsElectric] = useState<boolean>(false);
  const citiesArray = useAppSelector((state) => state?.cities);

  const handleFiledChange = (changedFiled: FieldData[]) => {
    if (changedFiled.find((filed) => filed.name[0] === "city")) {
      form.setFieldValue("hub", null);
    }
    const cityValue = form.getFieldValue("city");
    setIsElectric(form.getFieldValue("isElectric"));

    if (cityValue) {
      setHubOption(
        citiesArray
          ?.find((city) => city.name === cityValue)
          ?.hubs.map((hub) => {
            return { value: hub.name, label: hub.name, key: hub._id };
          })!
      );

      setDisabledHub(false);
    }
  };

  useEffect(() => {
    setCityOption(
      citiesArray?.map((city) => {
        return { value: city.name, label: city.name, key: city._id };
      })
    );
  }, [form, citiesArray]);

  return (
    <Drawer
      title="Add New Vehicle"
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
    >
      <Form
        name="Add new vehicle"
        layout="vertical"
        form={form}
        onFieldsChange={handleFiledChange}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input vehicle name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please input vehicle brand!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please input image link!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please select city" }]}
        >
          <Select options={cityOption} />
        </Form.Item>
        <Form.Item
          name="hub"
          label="Hub"
          rules={[{ required: true, message: "Please select hub" }]}
        >
          <Select options={hubOption} disabled={disabledHub} />
        </Form.Item>
        <Form.Item
          label="Top Speed"
          name="topSpeed"
          rules={[
            { required: true, message: "Please input vehicle Top Speed!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Kerb Weight"
          name="kerbWeight"
          rules={[
            { required: true, message: "Please input vehicle Kerb Weight!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Electric Vehicle"
          name="isElectric"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <div hidden={isElectric}>
          <Form.Item
            label="Fuel Tank Capacity"
            name="fuelTankCapacity"
            rules={[
              {
                required: !isElectric,
                message: "Please input vehicle Fuel Tank Capacity!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Milage"
            name="milage"
            rules={[
              {
                required: !isElectric,
                message: "Please input vehicle Milage!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Displacement"
            name="displacement"
            rules={[
              {
                required: !isElectric,
                message: "Please input vehicle Displacement!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Starting method"
            name="startingMethod"
            rules={[
              {
                required: !isElectric,
                message: "Please check at least 1 starting method",
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="KICK">Kick start</Checkbox>
              <Checkbox value="SELF">Self Start</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Transmission"
            name="transmission"
            rules={[
              {
                required: !isElectric,
                message: "Please check at least 1 Transmission",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="GEAR">Gear</Radio>
              <Radio value="GEARLESS">Gearless</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div hidden={!isElectric}>
          <Form.Item
            label="Riding Range"
            name="ridingRange"
            rules={[
              {
                required: isElectric,
                message: "Please input RidingRange",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="ChargingTime"
            name="chargingTime"
            rules={[
              {
                required: isElectric,
                message: "Please input  Charging Time!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </div>
        <Form.Item
          label="Seats"
          name="seats"
          rules={[
            {
              required: true,
              message: "Please input Seats",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Make Year"
          name="makeYear"
          rules={[
            {
              required: true,
              message: "Please input Make Year",
            },
          ]}
        >
          <DatePicker.YearPicker />
        </Form.Item>
        <Form.Item
          label="Excess Charge per kilometer"
          name="excessCharge"
          rules={[
            {
              required: true,
              message: "Please input Excess Charge",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Late Penalty per hour"
          name="latePenalty"
          rules={[
            {
              required: true,
              message: "Please input Late Penalty",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Vehicle Registration Number"
          name="regNumber"
          rules={[
            {
              required: true,
              message: "Please input Registration Number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vehicle chassis Number"
          name="chNumber"
          rules={[
            {
              required: true,
              message: "Please input chassis Number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vehicle insurance Policy Number"
          name="policyNumber"
          rules={[
            {
              required: true,
              message: "Please input insurance Policy Number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p>Owner details </p>
        <br />
        <Form.Item
          label="Owner Name"
          name="ownerName"
          rules={[
            {
              required: true,
              message: "Please input Owner Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Owner Contact number"
          name="OwnerPhone"
          rules={[
            {
              required: true,
              message: "Please input Owner Contact number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="other Contact number"
          name="otherPhone"
          rules={[
            {
              required: true,
              message: "Please input other Contact number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Owner's Full address "
          name="OwnerLocation"
          rules={[
            {
              required: true,
              message: "Please input Owner's Location",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <p>Package details</p>
        <br />
        <Form.List name="package">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} className={Style.Package} align={"middle"}>
                  <Col span={22}>
                    <Space>
                      <Form.Item
                        {...restField}
                        label="Name"
                        name={[name, "name"]}
                        rules={[
                          {
                            required: true,
                            message: " please input Package name !",
                          },
                        ]}
                      >
                        <Input placeholder="Package name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="price"
                        name={[name, "price"]}
                        rules={[
                          {
                            required: true,
                            message: "please input price of Package !",
                          },
                        ]}
                      >
                        <InputNumber placeholder="Price" />
                      </Form.Item>
                    </Space>
                    <Space>
                      <Form.Item
                        {...restField}
                        label="Deposit"
                        name={[name, "Deposit"]}
                        rules={[
                          {
                            required: true,
                            message: "please input Deposit !",
                          },
                        ]}
                      >
                        <InputNumber placeholder="Deposit" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="limit"
                        name={[name, "limit"]}
                        rules={[
                          {
                            required: true,
                            message: "please input vehicle limit !",
                          },
                        ]}
                      >
                        <InputNumber placeholder="limit" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="active"
                        name={[name, "active"]}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={fields.length > 3}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Drawer>
  );
};

export default AddVehicleForm;
