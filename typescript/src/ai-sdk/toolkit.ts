import SubtotalAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';
import type {
  CoreTool,
} from 'ai';
import SubtotalTool from './tool';

class SubtotalAgentToolkit {
  private _subtotal: SubtotalAPI;

  tools: {[key: string]: CoreTool};

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
    this.tools = {};

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      // @ts-ignore
      this.tools[tool.method] = SubtotalTool(
        this._subtotal,
        tool.method,
        tool.description,
        tool.parameters
      );
    });
  }

  getTools(): {[key: string]: CoreTool} {
    return this.tools;
  }
}

export default SubtotalAgentToolkit;
