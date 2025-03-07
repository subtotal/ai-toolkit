import {z} from 'zod';
import {StructuredTool} from '@langchain/core/tools';
import {CallbackManagerForToolRun} from '@langchain/core/callbacks/manager';
import {RunnableConfig} from '@langchain/core/runnables';
import SubtotalAPI from '../shared/api';

class SubtotalTool extends StructuredTool {
  subtotalAPI: SubtotalAPI;

  method: string;

  name: string;

  description: string;

  schema: z.ZodObject<any, any, any, any>;

  constructor(
    subtotalAPI: SubtotalAPI,
    method: string,
    description: string,
    schema: z.ZodObject<any, any, any, any, {[x: string]: any}>
  ) {
    super();

    this.subtotalAPI = subtotalAPI;
    this.method = method;
    this.name = method;
    this.description = description;
    this.schema = schema;
  }

  _call(
    arg: z.output<typeof this.schema>,
    _runManager?: CallbackManagerForToolRun,
    _parentConfig?: RunnableConfig
  ): Promise<any> {
    return this.subtotalAPI.run(this.method, arg);
  }
}

export default SubtotalTool;
