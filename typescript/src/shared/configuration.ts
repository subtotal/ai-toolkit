import type {Tool} from './tools';

// Configuration provides various settings and options for the integration
// to tune and manage how it behaves.
export type Configuration = {
  tools?: string[];
};

export const isToolAllowed = (
  tool: Tool,
  configuration: Configuration
): boolean => {
  let isPermitted = false;
  for (const permittedTool of configuration.tools || []) {
    if (permittedTool === tool.method) {
      isPermitted = true;
      break;
    }
  }
  return isPermitted;
};
