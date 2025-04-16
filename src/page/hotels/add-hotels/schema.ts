import { z } from "zod";

export const fromSchema = z.object({
  id: z.string(),
});

export const receiverInfoSchema = z.object({
  receiverName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
});

export const packageDetailSchema = z.object({
  packageCategoryType: z.string(),
  packageSize: z.string(),
  packageWeight: z.string(),
});

export const deliveryZoneSchema = z.object({
  from: fromSchema,
  to: fromSchema,
});

export const senderInfoSchema = z.object({
  senderName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  packageDetails: packageDetailSchema,
});

export const orderDetailsSchema = z.object({
  deliveryZone: deliveryZoneSchema,
  deliveryFee: z.string(),
  codAmount: z.string(),
});

export const formSchemaSchema = z.object({
  orderDetails: orderDetailsSchema,
  senderInfo: senderInfoSchema,
  receiverInfo: receiverInfoSchema,
});
