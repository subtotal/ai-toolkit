# type: ignore
import os

from dotenv import load_dotenv
from openai import OpenAI

from subtotal_ai_toolkit.configuration import Configuration, Tools
from subtotal_ai_toolkit.openai.toolkit import SubtotalAIToolkit

load_dotenv()

secret_key = os.getenv("SUBTOTAL_SECRET_KEY")
if not secret_key:
    raise ValueError("SUBTOTAL_SECRET_KEY environment variable is required")

subtotal_ai_toolkit = SubtotalAIToolkit(secret_key=secret_key, configuration=Configuration(tools=[Tools.ALL]))

client = OpenAI()

messages = [{"role": "user", "content": "Get the list of merchants supported by the Subtotal API."}]

while True:
    completion = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=subtotal_ai_toolkit.get_tools()
    )

    message = completion.choices[0].message
    messages.append(
        {
            "role": message.role,
            "content": message.content,
            "tool_calls": message.tool_calls,
        }
    )

    if message.tool_calls:
        tool_messages = [subtotal_ai_toolkit.handle_tool_call(tc) for tc in message.tool_calls]
        messages.extend(tool_messages)
    else:
        print(completion.choices[0].message.content)
        break
