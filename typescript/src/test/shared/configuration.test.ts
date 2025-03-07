import z from 'zod';
import {isToolAllowed, Tools} from '../../shared/configuration';

describe('isToolAllowed', () => {
  it('should return true if all permissions are allowed', () => {
    const tool = {
      method: 'test',
      name: 'Test',
      description: 'Test',
      parameters: z.object({
        foo: z.string(),
      }),
    };

    const configuration = {
      tools: ['test'],
    };

    expect(isToolAllowed(tool, configuration)).toBe(true);
  });

  it('should return false if the tool is not in the configuration', () => {
    const tool = {
      method: 'test',
      name: 'Test',
      description: 'Test',
      parameters: z.object({
        foo: z.string(),
      }),
    };

    const configuration = {
      tools: ['test2'],
    };

    expect(isToolAllowed(tool, configuration)).toBe(false);
  });
});
