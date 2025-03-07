import {z} from 'zod';

import {
  createConnectionPrompt,
  createMerchantLinkUrlPrompt,
  getPurchasesPrompt,
  getPurchaseDetailsPrompt,
  getMerchantsPrompt,
} from './prompts';

import {
  createConnectionParameters,
  createMerchantLinkUrlParameters,
  getPurchasesParameters,
  getPurchaseDetailsParameters,
  getMerchantsParameters,
} from './parameters';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
};

const tools: Tool[] = [
  {
    method: 'get-merchants',
    name: 'Get Merchants',
    description: getMerchantsPrompt,
    parameters: getMerchantsParameters,
  },
  {
    method: 'create-connection',
    name: 'Create a Connection',
    description: createConnectionPrompt,
    parameters: createConnectionParameters,
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
