# Subtotal AI Toolkit - Python

The Subtotal AI Toolkit library enables popular agent frameworks including LangChain and CrewAI to integrate with the Subtotal API through function calling. The library is not exhaustive of the entire Subtotal API.

## Installation

You don't need this source code unless you want to modify the package. If you just
want to use the package, just run:

```sh
pip install subtotal-ai-toolkit
```

### Requirements

- Python 3.11+

## Usage

The library needs to be configured with your account's secret API key which is
available in your [Subtotal Dashboard][api-keys].

```python
from subtotal_ai_toolkit.crewai.toolkit import SubtotalAIToolkit
from subtotal_ai_toolkit.configuration import Configuration, Tools

subtotal_toolkit = SubtotalAIToolkit(
    secret_key="YOUR_SECRET_KEY",
    configuration=Configuration(tools=[Tools.ALL])
)
```

The toolkit works with LangChain and CrewAI and can be passed as a list of tools. For example:

```python
from crewai import Agent, Task, Crew

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
```

Examples for LangChain and CrewAI are included in `/examples`.

[api-keys]: https://dashboard.subtotal.com/api-keys

## Development

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
