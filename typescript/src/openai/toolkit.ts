import SubtotalAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';
import {zodToJsonSchema} from 'zod-to-json-schema';
import type {
  ChatCompletionTool,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
} from 'openai/resources';

class SubtotalAgentToolkit {
  private _subtotal: SubtotalAPI;

  tools: ChatCompletionTool[];

  constructor({
    keyId,
    secretKey,
    configuration,
  }: {
    keyId: string;
    secretKey: string;
    configuration: Configuration;
  }) {
    this._subtotal = new SubtotalAPI(keyId, secretKey, configuration);

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    this.tools = filteredTools.map((tool) => ({
      type: 'function',
      function: {
        name: tool.method,
        description: tool.description,
        parameters: zodToJsonSchema(tool.parameters),
      },
    }));
  }

  getTools(): ChatCompletionTool[] {
    return this.tools;
  }

  /**
   * Processes a single OpenAI tool call by executing the requested function.
   *
   * @param {ChatCompletionMessageToolCall} toolCall - The tool call object from OpenAI containing
   *   function name, arguments, and ID.
   * @returns {Promise<ChatCompletionToolMessageParam>} A promise that resolves to a tool message
   *   object containing the result of the tool execution with the proper format for the OpenAI API.
   */
  async handleToolCall(toolCall: ChatCompletionMessageToolCall) {
    const args = JSON.parse(toolCall.function.arguments);
    const response = await this._subtotal.run(toolCall.function.name, args);
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: response,
    } as ChatCompletionToolMessageParam;
  }
}

export default SubtotalAgentToolkit;
