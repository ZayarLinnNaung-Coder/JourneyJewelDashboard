export interface wayDataProps {
  data: Data;
  message: string;
  timestamp: Date;
  successCode: string;
}

export interface Data {
  content: Content[];
  page: Page;
}

export interface Content {
  id: string;
  senderName: string;
  orderCreatedDate: string;
  orderStatus: string;
  deliveredDate: string;
  deliveryName: string;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface WapCreateProps {
  orderDetails: OrderDetails;
  senderInfo: SenderInfo;
  receiverInfo: ReceiverInfo;
}

export interface OrderDetails {
  deliveryZone: DeliveryZone;
  deliveryFee: number;
  codAmount: number;
}

export interface DeliveryZone {
  from: From;
  to: From;
}

export interface From {
  id: string;
}

export interface ReceiverInfo {
  receiverName: string;
  phoneNumber: string;
  address: string;
}

export interface SenderInfo {
  senderName: string;
  phoneNumber: string;
  address: string;
  packageDetails: PackageDetail[];
}

export interface PackageDetail {
  packageCategoryType: string;
  packageSize: string;
  packageWeight: string;
}
