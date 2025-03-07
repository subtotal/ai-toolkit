import {z} from 'zod';

export const createConnectionParameters = z.object({
  merchant_id: z.string().describe('The ID of the merchant to connect.'),
  customer_id: z
    .string()
    .describe(
      "Identifier provided by the client to associate in Subtotal's system."
    ),
});

export const createMerchantLinkUrlParameters = z.object({
  connection_id: z
    .string()
    .describe('The ID of the connection to create the merchant link URL for.'),
});

export const getPurchasesParameters = z.object({
  connection_id: z
    .string()
    .describe('The ID of the connection to fetch purchases for.'),
});

export const getPurchaseDetailsParameters = z.object({
  connection_id: z
    .string()
    .describe('The ID of the connection to fetch the detailed purchase for.'),
  purchase_id: z
    .string()
    .describe('The ID of the purchase to fetch details for.'),
});

export const getMerchantsParameters = z.object({});
