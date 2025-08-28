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
  description: string
  placeId: string
  phoneNumber: string
  imageUrl: string
  roomTypes: RoomType[]
  mealPlans: MealPlan[]
}

export interface PlaceUpdateProps {
  name: string
  description: string
  placeId: string
  phoneNumber: string
  imageUrl: string
  roomTypes: RoomType[]
  mealPlans: MealPlan[]
}

export interface HotelDetailsProps {
  id: string
  name: string
  description: string
  placeId: string
  phoneNumber: string
  imageUrl: string
  roomTypes: RoomType[]
  mealPlans: MealPlan[]
}

export interface getPayload {
  page?: number;
  size?: number;
  query?: string;
}

export interface RoomType {
  roomTypeName: string,
  price: number | string
}

export interface MealPlan {
  mealPlanName: string,
  price: number | string
}