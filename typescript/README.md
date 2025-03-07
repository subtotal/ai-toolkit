# Subtotal AI Toolkit - TypeScript

The Subtotal AI Toolkit enables popular agent frameworks including LangChain and Vercel's AI SDK to integrate with Subtotal APIs through function calling. It also provides tooling to quickly integrate metered billing for prompt and completion token usage.

## Installation

You don't need this source code unless you want to modify the package. If you just want to use the package run:

```
npm install @subtotal-inc/ai-toolkit
```

### Requirements

- Node 18+

## Usage

The library needs to be configured with your account's key id and secret key available in your [Subtotal Dashboard][api-keys]. Additionally, `configuration` enables you to specify the types of actions that can be taken using the toolkit.

```typescript
import {SubtotalAIToolkit} from '@subtotal-inc/ai-toolkit/langchain';

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: ['get-purchases', 'get-purchase-details'],
  },
});
```

### Tools

The toolkit works with LangChain and Vercel's AI SDK and can be passed as a list of tools. For example:

```typescript
import {AgentExecutor, createStructuredChatAgent} from 'langchain/agents';

const tools = subtotalAIToolkit.getTools();

const agent = await createStructuredChatAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});
```

## Model Context Protocol

The Subtotal AI Toolkit also supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.com/). See `/examples/modelcontextprotocol` for an example. The same configuration options are available, and the server can be run with all supported transports.

```typescript
import {SubtotalAIToolkit} from '@subtotal-inc/ai-toolkit/modelcontextprotocol';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: ['get-purchases', 'get-purchase-details'],
  },
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Subtotal MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
```

[api-keys]: https://dashboard.subtotal.com/api-keys
