from dataclasses import dataclass
from enum import Enum
from .tools import Tool


class Tools(Enum):
    ALL = "all"
    CREATE_CONNECTION = "create_connection"
    CREATE_MERCHANT_LINK_URL = "create_merchant_link_url"
    GET_PURCHASES = "get_purchases"
    GET_PURCHASE_DETAILS = "get_purchase_details"
    GET_MERCHANTS = "get_merchants"


@dataclass
class Configuration:
    tools: list[Tools]


def is_tool_allowed(tool: Tool, configuration: Configuration) -> bool:
    try:
        Tools(tool["method"])
    except ValueError:
        return False

    is_permitted = False
    for permitted_tool in configuration.tools:
        if permitted_tool.value == tool["method"] or permitted_tool.value == "all":
            is_permitted = True
            break
    return is_permitted
