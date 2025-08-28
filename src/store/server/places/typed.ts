import {z} from "zod";

export interface placeDataProps {
  content: Content[];
  page: Page;
}

export interface Content {
  id: string
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
  additionalImages: {  url: string }[]
  placeType: string
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PlaceCreateProps {
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
  additionalImages: {  url: string }[]
  placeType: string
}

export interface PlaceUpdateProps {
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
  placeType: string
  additionalImages: {  url: string }[]
}

export interface PlaceDetailsProps {
  id: string
  name: string
  place: string
  minBudget: string
  description: string
  imageUrl: string
  placeType: string
  additionalImages: {  url: string }[]
}

export interface getPayload {
  page?: number;
  size?: number;
  query?: string;
}