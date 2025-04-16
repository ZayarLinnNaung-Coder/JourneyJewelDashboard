export interface transportationDataResponse {
  content: Content[];
  page: Page;
}

export interface Content {
  id: string
  name: string
  description: string
  priceList: Price[]
}

export interface Price {
  placeId: string,
  price: number | string
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PlaceCreateProps {
  id: string
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
}

export interface PlaceUpdateProps {
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
}

export interface PlaceDetailsProps {
  id: string
  name: string
  description: string
  priceList: Price[]
}

export interface getPayload {
  page?: number;
  size?: number;
  query?: string;
}