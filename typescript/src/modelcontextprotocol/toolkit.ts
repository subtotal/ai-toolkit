import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {RequestHandlerExtra} from '@modelcontextprotocol/sdk/shared/protocol.js';
import {Configuration, isToolAllowed} from '../shared/configuration';
import SubtotalAPI from '../shared/api';
import tools from '../shared/tools';

class SubtotalAgentToolkit extends McpServer {
  private _subtotal: SubtotalAPI;

  constructor({
    keyId,
    secretKey,
    configuration,
  }: {
    secretKey: string;
    configuration: Configuration;
  }) {
    super({
      name: 'Subtotal',
      version: '0.1.0',
    });

    this._subtotal = new SubtotalAPI(keyId, secretKey, configuration);

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      this.tool(
        tool.method,
        tool.description,
        tool.parameters.shape,
        async (arg: any, _extra: RequestHandlerExtra) => {
          const result = await this._subtotal.run(tool.method, arg);
          return {
            content: [
              {
                type: 'text' as const,
                text: String(result),
              },
            ],
          };
        }
      );
    });
  }
}

export default SubtotalAgentToolkit;
