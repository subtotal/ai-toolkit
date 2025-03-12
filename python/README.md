# Subtotal AI Toolkit - Python

The Subtotal AI Toolkit library enables popular agent frameworks including LangChain and CrewAI to integrate with the Subtotal API through function calling. The library is not exhaustive of the entire Subtotal API.

## Installation

You don't need this source code unless you want to modify the package. If you just
want to use the package, just run:

```sh
pip install subtotal-ai-toolkit
```

You can specify the specific optional dependencies you need if you'd like them to be installed by this package. For example, if you intend on using the OpenAI integration, you can run:

```sh
pip install subtotal-ai-toolkit[openai]
```

Optional dependencies include:

- `openai`
- `langchain`
- `crewai`

If you'd like to only install all optional dependencies, you can run:

```sh
pip install subtotal-ai-toolkit[all]
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

**NOTE:** The toolkit works with LangChain, CrewAI, and OpenAI. The above example is for CrewAI. Use the correct import depending on which framework you're using.

```python
# CrewAI
from subtotal_ai_toolkit.crewai.toolkit import SubtotalAIToolkit

# LangChain
from subtotal_ai_toolkit.langchain.toolkit import SubtotalAIToolkit

# OpenAI
from subtotal_ai_toolkit.openai.toolkit import SubtotalAIToolkit
```

The toolkit can be passed as a list of tools. For example (using CrewAI):

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

Examples for LangChain, CrewAI, and OpenAI are included in the `examples` directory.

[api-keys]: https://dashboard.subtotal.com/api-keys

## Development

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
