export interface ZoneProps {
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
  zoneId: string;
  name: string;
  country: Country;
  cities: City[];
}

export interface City {
  id: string;
  name: string;
}

export interface Country {
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

export interface ZoneIdProps {
  data: Data;
  message: string;
  timestamp: Date;
  successCode: string;
}

export interface Data {
  id: string;
  zoneId: string;
  name: string;
  country: Country;
  cities: any[];
}

export interface Country {
  id: string;
  name: string;
  countryCode: string;
}
