import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI

from subtotal_ai_toolkit.langchain.toolkit import SubtotalAIToolkit
from subtotal_ai_toolkit.configuration import Configuration, Tools

from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

secret_key = os.getenv("SUBTOTAL_SECRET_KEY")
if not secret_key:
    raise ValueError("SUBTOTAL_SECRET_KEY environment variable is required")

llm = ChatOpenAI(
    model="gpt-4o",
)

subtotal_ai_toolkit = SubtotalAIToolkit(secret_key=secret_key, configuration=Configuration(tools=[Tools.ALL]))

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant that can use the Subtotal API to answer questions."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
)

agent = create_tool_calling_agent(llm, subtotal_ai_toolkit.get_tools(), prompt)
agent_executor = AgentExecutor(agent=agent, tools=subtotal_ai_toolkit.get_tools())
result = agent_executor.invoke({"input": "Get the list of merchants supported by the Subtotal API."})

print(result)
