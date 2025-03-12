"""
This tool allows agents to interact with the Subtotal API.
"""

from __future__ import annotations

from typing import Any, Optional, Type

from crewai_tools import BaseTool
from pydantic import BaseModel

from ..api import SubtotalAPI


class SubtotalTool(BaseTool):
    """Tool for interacting with the Subtotal API."""

    subtotal_api: SubtotalAPI
    method: str
    name: str = ""
    description: str = ""
    args_schema: Optional[Type[BaseModel]] = None

    def _run(
        self,
        *args: Any,
        **kwargs: Any,
    ) -> str:
        """Use the Subtotal API to run an operation."""
        return self.subtotal_api.run(self.method, *args, **kwargs)
