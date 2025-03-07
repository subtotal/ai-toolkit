export const createConnectionPrompt = `
This tool will create a connection in Subtotal.

It takes two arguments:
- merchant_id (str): The ID of the merchant to connect.
- customer_id (str): Identifier provided by the client to associate in Subtotal's system.
`;

export const createMerchantLinkUrlPrompt = `
This tool will create and return a merchant link URL which can be used by someone to link their retailer account.

It takes two arguments:
- merchant_id (str): The ID of the merchant to create the merchant link URL for.
- customer_id (str): Identifier provided by the client to associate in Subtotal's system.
`;

export const getPurchasesPrompt = `
This tool will fetch a list of purchases from Subtotal.

It takes one argument:
- connection_id (str): The ID of the connection to fetch purchases for.
`;

export const getPurchaseDetailsPrompt = `
This tool will fetch additional details and individual line items for a purchase.

It takes one argument:
- purchase_id (str): The ID of the purchase to fetch details for.
`;
