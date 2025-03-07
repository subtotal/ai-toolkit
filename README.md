# Subtotal AI Toolkit

The Subtotal AI Toolkit enables popular agent frameworks including LangChain,
CrewAI, Vercel's AI SDK, and Model Context Protocol (MCP) to integrate with Subtotal APIs through function calling. The
library is not exhaustive of the entire Subtotal API. It currently includes support for TypeScript with Python coming soon.

Included below are basic instructions, but refer to the [TypeScript](/typescript) package for more information.

## TypeScript

### Installation

You don't need this source code unless you want to modify the package. If you just
want to use the package run:

```
npm install @subtotal/ai-toolkit
```

#### Requirements

- Node 18+

### Usage

The library needs to be configured with your account's secret key credentials which is available in your [Subtotal Dashboard][api-keys]. Additionally, `configuration` enables you to specify the types of actions that can be taken using the toolkit.

```typescript
import { SubtotalAIToolkit } from "@subtotal/ai-toolkit/langchain";

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: [
      "create-connection",
      "create-merchant-link-url",
      "get-purchases",
      "get-purchase-details"
    ],
  },
});
```

#### Tools

The toolkit works with LangChain and Vercel's AI SDK and can be passed as a list of tools. For example:

```typescript
import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";

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

The Subtotal AI Toolkit also supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.com/).

To run the Subtotal MCP server using npx, use the following command:

```bash
npx -y @subtotal/mcp --tools=all --subtotal-key-id=<KEY_ID> --subtotal-secret-key=<SECRET_KEY>
```

Replace `<KEY_ID>` and `<SECRET_KEY>` with your actual Subtotal key ID and secret key. Or, you could set the SUBTOTAL_KEY_ID and SUBTOTAL_SECRET_KEY in your environment variables.

Alternatively, you can set up your own MCP server. For example:

```typescript
import { SubtotalAIToolkit } from "@subtotal/ai-toolkit/modelcontextprotocol";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: [
      "create-connection",
      "create-merchant-link-url",
      "get-purchases",
      "get-purchase-details"
    ],
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Subtotal MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

## Supported API methods

- [Get merchants](https://www.subtotal.com/docs/api-reference/merchants/get-merchants)
- [Create a connection](https://www.subtotal.com/docs/api-reference/connection/create-connection)
- [Create a merchant link URL](https://www.subtotal.com/docs/api-reference/connection/create-connection-token)
- [Get purchases](https://www.subtotal.com/docs/api-reference/purchases/get-purchases)
- [Get purchase details](https://www.subtotal.com/docs/api-reference/purchases/get-purchase)

[api-keys]: https://dashboard.subtotal.com/api-keys
