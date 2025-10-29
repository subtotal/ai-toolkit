import {tool} from 'ai';
import {z} from 'zod';
import SubtotalAPI from '../shared/api';

export default function SubtotalTool(
  subtotalApi: SubtotalAPI,
  method: string,
  description: string,
  schema: z.ZodObject<any, any, any, any, {[x: string]: any}>
) {
  return tool({
    description: description,
    inputSchema: schema,
    executeAsync: async (arg: z.output<typeof schema>) => {
      // eslint-disable-next-line no-return-await
      return await subtotalApi.run(method, arg);
    },
  } as any);
}
