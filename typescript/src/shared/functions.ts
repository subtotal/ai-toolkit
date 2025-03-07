import {z} from 'zod';
import {
  createConnectionParameters,
  createMerchantLinkUrlParameters,
  getPurchasesParameters,
  getPurchaseDetailsParameters,
} from './parameters';

export interface SubtotalApiConfig {
  keyId: string;
  secretKey: string;
  baseUrl: string;
}

// TODO: This is where we send the API requests to Subtotal
export const createConnection = async(
  apiConfig: SubtotalApiConfig,
  params: z.infer<typeof createConnectionParameters>
) => {
  const response = await fetch(`${apiConfig.baseUrl}/connection`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key-Id': apiConfig.keyId,
      'X-Api-Key': apiConfig.secretKey,
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error(`Failed to create connection: ${response.statusText}`);
  }
  return await response.json();
}

export const createMerchantLinkUrl = async(
  apiConfig: SubtotalApiConfig,
  params: z.infer<typeof createMerchantLinkUrlParameters>
) => {
  const response = await fetch(`${apiConfig.baseUrl}/connection/${params.connection_id}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key-Id': apiConfig.keyId,
      'X-Api-Key': apiConfig.secretKey,
    },
    body: JSON.stringify({scope: "link"}),
  });
  if (!response.ok) {
    throw new Error(`Failed to create merchant link url: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data?.connection_token) {
    throw new Error('Failed to create merchant link url: no connection token');
  }
  return {
    merchant_link_url: `https://link.subtotal.com/${data.connection_token}`,
  }
};

const getAccessToken = async(
  apiConfig: SubtotalApiConfig,
  connectionId: string
) => {
  const response = await fetch(`${apiConfig.baseUrl}/connection/${connectionId}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key-Id': apiConfig.keyId,
      'X-Api-Key': apiConfig.secretKey,
    },
    body: JSON.stringify({scope: "access"}),
  });
  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }
  const data = await response.json();
  return data?.connection_token;
};

export const getPurchases = async(
  apiConfig: SubtotalApiConfig,
  params: z.infer<typeof getPurchasesParameters>
) => {
  const accessToken = await getAccessToken(apiConfig, params.connection_id);
  const response = await fetch(`${apiConfig.baseUrl}/purchases`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Api-Key-Id': apiConfig.keyId,
      'X-Api-Key': apiConfig.secretKey,
    },
  });
  if (!accessToken) {
    throw new Error('Unable to get an access token for the connection.');
  }
  if (!response.ok) {
    throw new Error(`Failed to get purchases: ${response.statusText}`);
  }
  return await response.json();
};

export const getPurchaseDetails = async(
  apiConfig: SubtotalApiConfig,
  params: z.infer<typeof getPurchaseDetailsParameters>
) => {
  const accessToken = await getAccessToken(apiConfig, params.connection_id);
  if (!accessToken) {
    throw new Error('Unable to get an access token for the connection.');
  }
  const response = await fetch(`${apiConfig.baseUrl}/purchases/${params.purchase_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Api-Key-Id': apiConfig.keyId,
      'X-Api-Key': apiConfig.secretKey,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to get purchase details: ${response.statusText}`);
  }
  return await response.json();
};
