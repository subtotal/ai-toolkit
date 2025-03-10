import {
  createConnection,
  createMerchantLinkUrl,
  getPurchases,
  getPurchaseDetails,
  SubtotalApiConfig,
  getMerchants,
} from './functions';

import type {Configuration} from './configuration';

class SubtotalAPI {
  configuration: Configuration;
  apiConfig: SubtotalApiConfig;

  constructor(secretKey: string, configuration: Configuration) {
    this.apiConfig = {
      secretKey,
      baseUrl: 'https://api.subtotal.com',
    };
    this.configuration = configuration || {};
  }

  async run(method: string, arg: any) {
    if (method === 'get-merchants') {
      const output = JSON.stringify(await getMerchants(this.apiConfig));
      return output;
    } else if (method === 'create-connection') {
      const output = JSON.stringify(
        await createConnection(this.apiConfig, arg)
      );
      return output;
    } else if (method === 'create-merchant-link-url') {
      const output = JSON.stringify(
        await createMerchantLinkUrl(this.apiConfig, arg)
      );
      return output;
    } else if (method === 'get-purchases') {
      const output = JSON.stringify(await getPurchases(this.apiConfig, arg));
      return output;
    } else if (method === 'get-purchase-details') {
      const output = JSON.stringify(
        await getPurchaseDetails(this.apiConfig, arg)
      );
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}

export default SubtotalAPI;
