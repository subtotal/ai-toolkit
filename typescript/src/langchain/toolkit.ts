import {BaseToolkit} from '@langchain/core/tools';
import SubtotalTool from './tool';
import SubtotalAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';

class SubtotalAIToolkit implements BaseToolkit {
  private _subtotal: SubtotalAPI;

  tools: SubtotalTool[];

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

    this.tools = filteredTools.map(
      (tool) =>
        new SubtotalTool(
          this._subtotal,
          tool.method,
          tool.description,
          tool.parameters
        )
    );
  }

  getTools(): SubtotalTool[] {
    return this.tools;
  }
}

export default SubtotalAIToolkit;
