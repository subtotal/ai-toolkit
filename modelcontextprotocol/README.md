# Subtotal Model Context Protocol

The Subtotal [Model Context Protocol](https://modelcontextprotocol.com/) server allows you to integrate with Subtotal APIs through function calling.

## Setup

To run the Subtotal MCP server using npx, use the following command:

```bash
# To set up all available tools
npx -y @subtotal/mcp --tools=all --subtotal-key-id=<KEY-ID> --subtotal-secret-key=<SECRET-KEY>

# To set up specific tools
npx -y @subtotal/mcp --tools=get-purchases,get-purchase-details --subtotal-key-id=<KEY-ID> --subtotal-secret-key=<SECRET-KEY>
```

Make sure to replace `<KEY-ID>` and `<SECRET-KEY>` with your actual Subtotal API key ID and secret key value.
Alternatively, you could set the SUBTOTAL_KEY_ID and SUBTOTAL_SECRET_KEY in your environment variables.

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.

```
{
    “mcpServers”: {
        “subtotal”: {
            “command”: “npx”,
            “args”: [
                “-y”,
                “@subtotal/mcp”,
                “--tools=all”,
                “--subtotal-key-id=<KEY-ID>”,
                “--subtotal-secret-key=<SECRET-KEY>”
            ]
        }
    }
}
```

## Available tools

| Tool                       | Description                    |
| -------------------------- | ------------------------------ |
| `get-merchants`            | Get merchants                  |
| `create-connection`        | Create a new connection        |
| `create-merchant-link-url` | Create a new merchant link URL |
| `get-purchases`            | Get purchases                  |
| `get-purchase-details`     | Get purchase details           |

## Debugging the Server

To debug your server, you can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector).

First build the server

```
npm run build
```

Run the following command in your terminal:

```bash
# Start MCP Inspector and server with all tools
npx @modelcontextprotocol/inspector node dist/index.js --tools=all --subtotal-key-id=<KEY-ID> --subtotal-secret-key=<SECRET-KEY>
```

### Instructions

1. Replace `<KEY-ID>` and `<SECRET-KEY>` with your actual Subtotal API key ID and secret key value.
2. Run the command to start the MCP Inspector.
3. Open the MCP Inspector UI in your browser and click Connect to start the MCP server.
4. You can see the list of tools you selected and test each tool individually.
