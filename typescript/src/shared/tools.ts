import {z} from 'zod';

import {
  createConnectionPrompt,
  createMerchantLinkUrlPrompt,
  getPurchasesPrompt,
  getPurchaseDetailsPrompt,
} from './prompts';

import {
  createConnectionParameters,
  createMerchantLinkUrlParameters,
  getPurchasesParameters,
  getPurchaseDetailsParameters,
 } from './parameters';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
};

const tools: Tool[] = [
  {
    method: 'create-connection',
    name: 'Create a Connection',
    description: createConnectionPrompt,
    parameters: createConnectionPrompt,
  },
  {
    method: 'create-merchant-link-url',
    name: 'Create a Merchant Link URL',
    description: createMerchantLinkUrlPrompt,
    parameters: createMerchantLinkUrlParameters,
  },
  {
    method: 'get-purchases',
    name: 'Get Purchases',
    description: getPurchasesPrompt,
    parameters: getPurchasesParameters,
  },
  {
    method: 'get-purchase-details',
    name: 'Get Purchase Details',
    description: getPurchaseDetailsPrompt,
    parameters: getPurchaseDetailsParameters,
  },
];

export default tools;
