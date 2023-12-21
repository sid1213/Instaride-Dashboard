export interface VehicleSchemaI {
  _id: number;
  name: string;
  brand: string;
  tips: number;
  pickup: boolean;
  city: string;
  hubs: string[];
  price: number;
  limit: number;
  deposit: number;
  make_year: number;
  img: string;
  package: PackageI[];
  available: boolean;
  transmission: string;
  available_date: string;
  excess_charge: number;
  late_penalty: number;
}
export interface PackageI {
  name: string;
  price: number;
  limit: number;
  deposit: number;
}
interface Vehicle {
  _id: number;
  brand: string;
  name: string;
  image: string;
  mileage: number;
  topSpeed: number;
  displacement: number;
  fuelTankCapacity: number;
  kerbWeight: number;
  ridingRange?: number;
  chargingTime?: number;
  motorPower?: boolean;
  engineType: string;
  startingMethod: "KICK" | "SELF";
  transmission: string;
  makeYear: number;
  package: PackageI[];
  isAdminBlocked: boolean;
  tnc: string[];
  availability: boolean;
  ordersCount: number;
  excess_charge: number;
  late_penalty: number;
  regNumber: string;
  chNumber: string;
  policyNumber: string;
  owner: Owner;
}
interface Hub {
  _id: number;
  name: string;
  landmark: string;
  neighbourhood: string;
  fullAddress: string;
  operationStart: number;
  operationEnd: number;
  closingDays?: null | string[];
  vehicles: Vehicle[];
}
interface Owner {
  _id: string;
  name: string;
  phone: string;
  otherPhone: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
interface CitiesI {
  _id: string;
  name: string;
  image: string;
  active: boolean;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  hubs: Hub[];
}
