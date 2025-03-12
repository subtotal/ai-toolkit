import os
from dotenv import load_dotenv

from crewai import Agent, Task, Crew
from subtotal_ai_toolkit.crewai.toolkit import SubtotalAIToolkit
from subtotal_ai_toolkit.configuration import Configuration, Tools

load_dotenv()

secret_key = os.getenv("SUBTOTAL_SECRET_KEY")
if not secret_key:
    raise ValueError("SUBTOTAL_SECRET_KEY environment variable is required")

subtotal_ai_toolkit = SubtotalAIToolkit(secret_key=secret_key, configuration=Configuration(tools=[Tools.ALL]))

subtotal_agent = Agent(
    role="Subtotal Agent",
    goal="Integrate with the Subtotal API effectively to support our business.",
    backstory="You have been using the Subtotal API for a long time.",
    tools=[*subtotal_ai_toolkit.get_tools()],
    allow_delegation=False,
    verbose=True,
)

get_merchants = Task(
    description="Get the list of merchants supported by the Subtotal API.",
    expected_output="merchants",
    agent=subtotal_agent,
)

crew = Crew(
    agents=[subtotal_agent],
    tasks=[get_merchants],
    verbose=True,
    planning=True,
)

crew.kickoff()
