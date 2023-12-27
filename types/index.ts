export interface PackageI {
  name: string;
  price: number;
  limit: number;
  deposit: number;
  active: boolean;
  _id: string;
}
export interface VehicleI {
  _id: number;
  brand: string;
  name: string;
  city: string;
  hub: string;
  image: string;
  topSpeed: number;
  kerbWeight: number;
  isElectric?: boolean;
  // petrol
  fuelTankCapacity?: number;
  mileage?: number;
  displacement?: number;
  startingMethod?: "KICK" | "SELF";
  transmission?: string;

  // electric
  ridingRange?: number;
  chargingTime?: number;

  seats: number;
  makeYear: number;

  package?: PackageI[];
  tnc?: string[];

  // these values will always going to be false while Adding the vehicles and order count will also be zero
  availability: boolean;
  isAdminBlocked: boolean;
  ordersCount: number;

  excessCharge: number;
  latePenalty: number;
  regNumber: string;
  chNumber: string;
  policyNumber: string;
  owner: Owner;
  createdAt?: string;
  updatedAt?: string;
}
export interface Hub {
  _id: string;
  name: string;
  landmark: string;
  neighbourhood: string;
  fullAddress: string;
  operationStart: number;
  operationEnd: number;
  closingDays?: null | string[];
  createdAt: string;
  updatedAt: string;
}
export interface Owner {
  _id: string;
  name: string;
  phone: string;
  otherPhone: string;
  location: string;
}
export interface CitiesI {
  _id: string;
  name: string;
  image: string;
  active: boolean;
  content: string;
  title: string;
  hubs: Hub[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface UserI {
  _id: string;
  role: string;
  username: string;
  email: string;
}
