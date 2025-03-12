from __future__ import annotations

import json

from pydantic import BaseModel

from .functions import (
    create_connection,
    create_merchant_link_url,
    get_purchases,
    get_purchase_details,
    get_merchants,
    SubtotalApiConfig,
)

from .configuration import Configuration


class SubtotalAPI(BaseModel):
    """Wrapper for the Subtotal API"""

    _configuration: Configuration
    _api_config: SubtotalApiConfig

    def __init__(self, secret_key: str, configuration: Configuration):
        super().__init__()

        self._configuration = configuration
        self._api_config = SubtotalApiConfig(secret_key, "https://api.subtotal.com")

    def run(self, method: str, *args, **kwargs) -> str:
        if method == "create_connection":
            return json.dumps(create_connection(self._api_config, *args, **kwargs))
        elif method == "create_merchant_link_url":
            return json.dumps(create_merchant_link_url(self._api_config, *args, **kwargs))
        elif method == "get_purchases":
            return json.dumps(get_purchases(self._api_config, *args, **kwargs))
        elif method == "get_purchase_details":
            return json.dumps(get_purchase_details(self._api_config, *args, **kwargs))
        elif method == "get_merchants":
            return json.dumps(get_merchants(self._api_config, *args, **kwargs))
        else:
            raise ValueError("Invalid method " + method)
