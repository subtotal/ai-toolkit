"""Subtotal AI Toolkit."""

import json
from typing import List

from openai.types.chat import ChatCompletionMessageToolCall, ChatCompletionToolMessageParam, ChatCompletionToolParam
from pydantic import PrivateAttr

from ..api import SubtotalAPI
from ..configuration import Configuration, is_tool_allowed
from ..tools import tools


class SubtotalAIToolkit:
    _tools: List[ChatCompletionToolParam] = PrivateAttr(default=[])
    _subtotal_api: SubtotalAPI

    def __init__(self, secret_key: str, configuration: Configuration):
        super().__init__()

        self._subtotal_api = SubtotalAPI(secret_key=secret_key, configuration=configuration)

        filtered_tools = [tool for tool in tools if is_tool_allowed(tool, configuration)]

        self._tools = [
            {
                "type": "function",
                "function": {
                    "name": tool["method"],
                    "description": tool["description"],
                    "parameters": tool["args_schema"].model_json_schema(),
                },
            }
            for tool in filtered_tools
        ]

    def get_tools(self) -> List[ChatCompletionToolParam]:
        """Get the tools in the toolkit."""
        return self._tools

    def handle_tool_call(self, tool_call: ChatCompletionMessageToolCall) -> ChatCompletionToolMessageParam:
        """Process a single OpenAI tool call and return its execution result.

        This method takes a tool call object, extracts and parses its arguments,
        executes the corresponding API function, and formats the response
        as a tool message for the chat completion.

        Args:
            tool_call: A ChatCompletionMessageToolCall object containing the function
                    name and arguments to be executed.

        Returns:
            A dictionary containing the tool execution result in the format
            required by the chat completion API, including role, tool_call_id,
            and content fields.
        """
        args = json.loads(tool_call.function.arguments)
        response = self._subtotal_api.run(tool_call.function.name, **args)
        return {"role": "tool", "tool_call_id": tool_call.id, "content": response}
