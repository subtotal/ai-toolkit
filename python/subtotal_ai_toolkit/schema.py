from pydantic import BaseModel, Field


class CreateConnection(BaseModel):
    """Schema for the ``create_connection`` operation."""

    merchant_id: str = Field(
        ...,
        description="The ID of the merchant to connect.",
    )
    customer_id: str = Field(
        ...,
        description="The ID of the customer to connect.",
    )


class CreateMerchantLinkUrl(BaseModel):
    """Schema for the ``create_merchant_link_url`` operation."""

    connection_id: str = Field(
        ...,
        description="The ID of the connection to create the merchant link URL for.",
    )


class GetPurchases(BaseModel):
    """Schema for the ``get_purchases`` operation."""

    connection_id: str = Field(
        ...,
        description="The ID of the connection to fetch purchases for.",
    )


class GetPurchaseDetails(BaseModel):
    """Schema for the ``get_purchase_details`` operation."""

    connection_id: str = Field(
        ...,
        description="The ID of the connection to fetch the detailed purchase for.",
    )
    purchase_id: str = Field(
        ...,
        description="The ID of the purchase to fetch details for.",
    )


class GetMerchants(BaseModel):
    """Schema for the ``get_merchants`` operation."""

    pass
