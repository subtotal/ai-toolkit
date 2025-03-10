#!/usr/bin/env node

import {
  SubtotalAIToolkit,
  Tools,
} from '@subtotal-inc/ai-toolkit/modelcontextprotocol';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {green, red, yellow} from 'colors';

type ToolkitConfig = {
  tools: string[];
  context?: {
    account: string;
  };
};

type Options = {
  tools?: string[];
  subtotalSecretKey?: string;
};

const ACCEPTED_ARGS = ['subtotal-secret-key', 'tools'];

export function parseArgs(args: string[]): Options {
  const options: Options = {};

  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');

      if (key == 'tools') {
        options.tools = value.split(',');
      } else if (key == 'subtotal-secret-key') {
        options.subtotalSecretKey = value;
      } else {
        throw new Error(
          `Invalid argument: ${key}. Accepted arguments are: ${ACCEPTED_ARGS.join(
            ', '
          )}`
        );
      }
    }
  });

  // Check if required tools arguments is present
  if (!options.tools) {
    throw new Error('The --tools arguments must be provided.');
  }

  // Validate tools against accepted enum values
  const acceptedTools = Object.values(Tools) as string[];
  options.tools.forEach((tool: string) => {
    if (tool == 'all') {
      return;
    }
    const trimmedTool = tool.trim();
    if (!acceptedTools.includes(trimmedTool)) {
      throw new Error(
        `Invalid tool: ${tool}. Accepted tools are: ${Object.values(Tools).join(
          ', '
        )}`
      );
    }
  });

  // Get Subtotal API Credentials
  const subtotalSecretKey =
    options.subtotalSecretKey || process.env.SUBTOTAL_SECRET_KEY;
  if (!subtotalSecretKey) {
    throw new Error(
      'Subtotal API key not provided. Please either pass it as an argument --subtotal-secret-key=$SECRET-KEY or set the SUBTOTAL_SECRET_KEY environment variable.'
    );
  }
  options.subtotalSecretKey = subtotalSecretKey;
  return options;
}

function handleError(error: any) {
  console.error(red('\n🚨  Error initializing Subtotal MCP server:\n'));
  console.error(yellow(`   ${error.message}\n`));
}

export async function main() {
  const options = parseArgs(process.argv.slice(2));

  // Create the SubtotalAIToolkit instance
  const selectedTools = options.tools!;
  const configuration: ToolkitConfig = {tools: []};

  if (selectedTools.includes('all')) {
    configuration.tools = [...Object.values(Tools)];
  } else {
    configuration.tools = [...selectedTools];
  }

  const server = new SubtotalAIToolkit({
    secretKey: options.subtotalSecretKey!,
    configuration: configuration,
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  // We use console.error instead of console.log since console.log will output to stdio, which will confuse the MCP server
  console.error(green('✅ Subtotal MCP Server running on stdio'));
}

if (require.main === module) {
  main().catch((error) => {
    handleError(error);
  });
}
