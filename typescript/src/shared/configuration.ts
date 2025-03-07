import type {Tool} from './tools';

export const Tools = {
  getPurchases: 'get-purchases',
  getPurchaseDetails: 'get-purchase-details',
  createConnection: 'create-connection',
  createMerchantLinkUrl: 'create-merchant-link-url',
  getMerchants: 'get-merchants',
} as const;

// Configuration provides various settings and options for the integration
// to tune and manage how it behaves.
export type Configuration = {
  tools?: string[];
};

export const isToolAllowed = (
  tool: Tool,
  configuration: Configuration
): boolean => {
  let isPermitted = false;
  for (const permittedTool of configuration.tools || []) {
    if (permittedTool === tool.method) {
      isPermitted = true;
      break;
    }
  }
  return isPermitted;
};
