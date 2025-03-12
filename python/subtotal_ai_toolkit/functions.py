from dataclasses import dataclass

import requests


@dataclass
class SubtotalApiConfig:
    secret_key: str
    base_url: str


def create_connection(api_config: SubtotalApiConfig, merchant_id: str, customer_id: str):
    """
    Create a connection.

    Parameters:
        merchant_id (str): The ID of the merchant.
        customer_id (str): The ID of the customer.
    """
    response = requests.post(
        f"{api_config.base_url}/connection",
        headers={"X-Api-Key": api_config.secret_key},
        json={"merchant_id": merchant_id, "customer_id": customer_id},
    )
    return response.json()


def create_merchant_link_url(api_config: SubtotalApiConfig, connection_id: str):
    """
    Create a merchant link URL.

    Parameters:
        connection_id (str): The ID of the connection.
    """
    response = requests.post(
        f"{api_config.base_url}/connection/{connection_id}/token",
        headers={"X-Api-Key": api_config.secret_key},
        json={"scope": "link"},
    )
    return response.json()


def get_access_token(api_config: SubtotalApiConfig, connection_id: str) -> str:
    """
    Get an access token.

    Parameters:
        connection_id (str): The ID of the connection.
    """
    response = requests.post(
        f"{api_config.base_url}/connection/{connection_id}/token",
        headers={"X-Api-Key": api_config.secret_key},
        json={"scope": "access"},
    )
    connection_token = response.json().get("connection_token")
    if not connection_token:
        raise Exception("Failed to create access token")
    return connection_token


def get_purchases(api_config: SubtotalApiConfig, connection_id: str):
    """
    Get purchases.

    Parameters:
        connection_id (str): The ID of the connection.
    """
    access_token = get_access_token(api_config, connection_id)
    response = requests.get(
        f"{api_config.base_url}/purchases",
        headers={"X-Api-Key": api_config.secret_key, "Authorization": f"Bearer {access_token}"},
    )
    return response.json()


def get_purchase_details(api_config: SubtotalApiConfig, connection_id: str, purchase_id: str):
    """
    Get purchase details.

    Parameters:
        connection_id (str): The ID of the connection.
        purchase_id (str): The ID of the purchase.
    """
    access_token = get_access_token(api_config, connection_id)
    response = requests.get(
        f"{api_config.base_url}/purchases/{purchase_id}",
        headers={"X-Api-Key": api_config.secret_key, "Authorization": f"Bearer {access_token}"},
    )
    return response.json()


def get_merchants(api_config: SubtotalApiConfig):
    """
    Get the list of available merchants.
    """
    response = requests.get(
        f"{api_config.base_url}/merchants",
        headers={"X-Api-Key": api_config.secret_key},
    )
    return response.json()
