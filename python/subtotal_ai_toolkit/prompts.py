CREATE_CONNECTION_PROMPT = """
This tool will create a connection in Subtotal.

It takes two arguments:
- merchant_id (str): The ID of the merchant to connect.
- customer_id (str): Identifier provided by the client to associate in Subtotal's system.
"""

CREATE_MERCHANT_LINK_URL_PROMPT = """
This tool will create and return a merchant link URL which can be used by someone to link their retailer account.

It takes one argument:
- connection_id (str): The ID of the connection to create the merchant link URL for.
"""

GET_PURCHASES_PROMPT = """
This tool will fetch a list of purchases from Subtotal.

It takes one argument:
- connection_id (str): The ID of the connection to fetch purchases for.
"""

GET_PURCHASE_DETAILS_PROMPT = """
This tool will fetch additional details and individual line items for a purchase.

It takes two arguments:
- connection_id (str): The ID of the connection to fetch the detailed purchase for.
- purchase_id (str): The ID of the purchase to fetch details for.
"""

GET_MERCHANTS_PROMPT = """
This tool will fetch a list of available merchants from Subtotal.

It takes no arguments.
"""
