export interface CountryProps {
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
  countryCode: string;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
