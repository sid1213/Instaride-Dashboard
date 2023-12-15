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
  make_year: number;
  package: PackageI[];
  isAdminBlocked: boolean;
  tnc: string[];
  fullAddress: string;
  operationStart: number;
  operationEnd: number;
  closingDays?: null | string[];
  deposit: number;
  discount?: any;
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
  vehicles: Vehicle[];
}
interface Owner {
  name: string;
  phone: string;
  otherPhone: string;
  location: string;
}
interface CityI {
  cityName: string;
  image: string;
  hubs: Hub[];
}
