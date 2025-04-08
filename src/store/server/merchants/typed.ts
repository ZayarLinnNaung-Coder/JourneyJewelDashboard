export interface merchantProps {
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
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  contractStartDate: Date;
  contractEndDate: Date;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface MerchantByIdProps {
  data: Data;
  message: string;
  timestamp: string;
  successCode: string;
}

export interface Data {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  contractStartDate: string;
  contractEndDate: string;
}
