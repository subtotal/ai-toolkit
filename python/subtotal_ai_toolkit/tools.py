from typing import Type, TypedDict

from pydantic import BaseModel

from .prompts import (
    CREATE_CONNECTION_PROMPT,
    CREATE_MERCHANT_LINK_URL_PROMPT,
    GET_MERCHANTS_PROMPT,
    GET_PURCHASE_DETAILS_PROMPT,
    GET_PURCHASES_PROMPT,
)
from .schema import (
    CreateConnection,
    CreateMerchantLinkUrl,
    GetMerchants,
    GetPurchaseDetails,
    GetPurchases,
)


class Tool(TypedDict, total=True):
    method: str
    name: str
    description: str
    args_schema: Type[BaseModel]


tools: list[Tool] = [
    {
        "method": "create_connection",
        "name": "Create Connection",
        "description": CREATE_CONNECTION_PROMPT,
        "args_schema": CreateConnection,
    },
    {
        "method": "create_merchant_link_url",
        "name": "Create Merchant Link URL",
        "description": CREATE_MERCHANT_LINK_URL_PROMPT,
        "args_schema": CreateMerchantLinkUrl,
    },
    {
        "method": "get_purchases",
        "name": "Get Purchases",
        "description": GET_PURCHASES_PROMPT,
        "args_schema": GetPurchases,
    },
    {
        "method": "get_purchase_details",
        "name": "Get Purchase Details",
        "description": GET_PURCHASE_DETAILS_PROMPT,
        "args_schema": GetPurchaseDetails,
    },
    {
        "method": "get_merchants",
        "name": "Get Merchants",
        "description": GET_MERCHANTS_PROMPT,
        "args_schema": GetMerchants,
    },
]
