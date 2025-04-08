export interface DeliveryProps {
  data: Data;
  message: string;
  timestamp: Date;
}

export interface Data {
  content: Content[];
  page: Page;
}

export interface Content {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  accountStatus: null;
  vehicleType: string;
  zoneId: string;
  totalRoutes: number;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
