import unittest
from subtotal_ai_toolkit.configuration import is_tool_allowed, Configuration, Tools
from subtotal_ai_toolkit.tools import Tool
from pydantic import BaseModel


def create_test_tool(method: str) -> Tool:
    return {
        "method": method,
        "name": "Create Connection",
        "description": "test prompt",
        "args_schema": BaseModel,
    }


class TestConfigurations(unittest.TestCase):
    def test_allowed(self):
        tool = create_test_tool("get_merchants")
        configuration = Configuration(tools=[Tools.GET_MERCHANTS])
        self.assertTrue(is_tool_allowed(tool, configuration))

    def test_allowed_all(self):
        tool = create_test_tool("get_merchants")
        configuration = Configuration(tools=[Tools.ALL])
        self.assertTrue(is_tool_allowed(tool, configuration))

    def test_not_allowed(self):
        tool = create_test_tool("get_merchants")
        configuration = Configuration(tools=[Tools.GET_PURCHASES])
        self.assertFalse(is_tool_allowed(tool, configuration))

    def test_not_allowed_all(self):
        tool = create_test_tool("not-a-valid-tool")
        configuration = Configuration(tools=[Tools.ALL])
        self.assertFalse(is_tool_allowed(tool, configuration))


if __name__ == "__main__":
    unittest.main()
