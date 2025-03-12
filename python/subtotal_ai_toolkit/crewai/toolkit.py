"""Subtotal AI Toolkit."""

from pydantic import PrivateAttr

from ..api import SubtotalAPI
from ..configuration import Configuration, is_tool_allowed
from ..tools import tools
from .tool import SubtotalTool


class SubtotalAIToolkit:
    _tools: list[SubtotalTool] = PrivateAttr(default=[])

    def __init__(self, secret_key: str, configuration: Configuration):
        super().__init__()

        subtotal_api = SubtotalAPI(secret_key=secret_key, configuration=configuration)

        filtered_tools = [tool for tool in tools if is_tool_allowed(tool, configuration)]

        self._tools = [
            SubtotalTool(
                name=tool["method"],
                description=tool["description"],
                method=tool["method"],
                subtotal_api=subtotal_api,
                args_schema=tool.get("args_schema", None),
            )
            for tool in filtered_tools
        ]

    def get_tools(self) -> list[SubtotalTool]:
        """Get the tools in the toolkit."""
        return self._tools
