import {main} from '../index';
import {parseArgs} from '../index';
import {SubtotalAIToolkit} from '@subtotal/ai-toolkit/modelcontextprotocol';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

const MISSING_KEY_ID_ERROR =
  'Subtotal API key data not provided. Please either pass it as an argument --subtotal-key-id=$KEY-ID and --subtotal-secret-key=$SECRET-KEY or set the SUBTOTAL_KEY_ID and SUBTOTAL_SECRET_KEY environment variables.';

describe('parseArgs function', () => {
  describe('success cases', () => {
    it('should parse key id and secret key and tools arguments correctly', () => {
      const args = [
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
        '--tools=all',
      ];
      const options = parseArgs(args);
      expect(options.subtotalKeyId).toBe('TEST_KEY_ID');
      expect(options.subtotalSecretKey).toBe('TEST_SECRET_KEY');
      expect(options.tools).toEqual(['all']);
    });

    it('should parse key id and tools arguments correctly', () => {
      process.env.SUBTOTAL_KEY_ID = 'TEST_KEY_ID';
      const args = ['--subtotal-secret-key=TEST_SECRET_KEY', '--tools=all'];
      const options = parseArgs(args);
      expect(options.subtotalKeyId).toBe('TEST_KEY_ID');
      expect(options.subtotalSecretKey).toBe('TEST_SECRET_KEY');
      expect(options.tools).toEqual(['all']);
      delete process.env.SUBTOTAL_KEY_ID;
    });

    it('should parse secret key and tools arguments correctly', () => {
      process.env.SUBTOTAL_SECRET_KEY = 'TEST_SECRET_KEY';
      const args = ['--subtotal-key-id=TEST_KEY_ID', '--tools=all'];
      const options = parseArgs(args);
      expect(options.subtotalKeyId).toBe('TEST_KEY_ID');
      expect(options.subtotalSecretKey).toBe('TEST_SECRET_KEY');
      expect(options.tools).toEqual(['all']);
      delete process.env.SUBTOTAL_SECRET_KEY;
    });

    it('should parse api key environment variables correctly', () => {
      process.env.SUBTOTAL_KEY_ID = 'TEST_KEY_ID';
      process.env.SUBTOTAL_SECRET_KEY = 'TEST_SECRET_KEY';
      const args = ['--tools=all'];
      const options = parseArgs(args);
      expect(options.subtotalKeyId).toBe('TEST_KEY_ID');
      expect(options.subtotalSecretKey).toBe('TEST_SECRET_KEY');
      expect(options.tools).toEqual(['all']);
      delete process.env.SUBTOTAL_KEY_ID;
      delete process.env.SUBTOTAL_SECRET_KEY;
    });

    it('if api key set in env variable but also passed into args, should prefer args key', () => {
      process.env.SUBTOTAL_KEY_ID = 'NOT_USED';
      process.env.SUBTOTAL_SECRET_KEY = 'NOT_USED';
      const args = [
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
        '--tools=all',
      ];
      const options = parseArgs(args);
      expect(options.subtotalKeyId).toBe('TEST_KEY_ID');
      expect(options.subtotalSecretKey).toBe('TEST_SECRET_KEY');
      expect(options.tools).toEqual(['all']);
      delete process.env.SUBTOTAL_KEY_ID;
      delete process.env.SUBTOTAL_SECRET_KEY;
    });

    it('should parse tools argument correctly if a list of tools is provided', () => {
      const args = [
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
        '--tools=get-purchases,create-connection',
      ];
      const options = parseArgs(args);
      expect(options.tools).toEqual(['get-purchases', 'create-connection']);
    });
  });

  describe('error cases', () => {
    it('should throw an error if key-id is not provided', () => {
      const args = ['--subtotal-secret-key=TEST_SECRET_KEY', '--tools=all'];
      expect(() => parseArgs(args)).toThrow(MISSING_KEY_ID_ERROR);
    });

    it('should throw an error if secret key is not provided', () => {
      const args = ['--subtotal-key-id=TEST_KEY_ID', '--tools=all'];
      expect(() => parseArgs(args)).toThrow(MISSING_KEY_ID_ERROR);
    });

    it('should throw an error if tools argument is not provided', () => {
      const args = [
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
      ];
      expect(() => parseArgs(args)).toThrow(
        'The --tools arguments must be provided.'
      );
    });

    it('should throw an error if an invalid argument is provided', () => {
      const args = [
        '--invalid-arg=value',
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
        '--tools=all',
      ];
      expect(() => parseArgs(args)).toThrow(
        'Invalid argument: invalid-arg. Accepted arguments are: subtotal-key-id, subtotal-secret-key, tools'
      );
    });

    it('should throw an error if tools is not in accepted tool list', () => {
      const args = [
        '--subtotal-key-id=TEST_KEY_ID',
        '--subtotal-secret-key=TEST_SECRET_KEY',
        '--tools=get-purchases,create-connection,fake.tool',
      ];
      expect(() => parseArgs(args)).toThrow(
        'Invalid tool: fake.tool. Accepted tools are: get-purchases, get-purchase-details, create-connection, create-merchant-link-url, get-merchants'
      );
    });
  });
});

jest.mock('@subtotal/ai-toolkit/modelcontextprotocol');
jest.mock('@modelcontextprotocol/sdk/server/stdio.js');

describe('main function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the server with tools=all correctly', async () => {
    process.argv = [
      'node',
      'index.js',
      '--subtotal-key-id=TEST_KEY_ID',
      '--subtotal-secret-key=TEST_SECRET_KEY',
      '--tools=all',
    ];

    await main();

    expect(SubtotalAIToolkit).toHaveBeenCalledWith({
      keyId: 'TEST_KEY_ID',
      secretKey: 'TEST_SECRET_KEY',
      configuration: {tools: ALL_TOOLS},
    });

    expect(StdioServerTransport).toHaveBeenCalled();
  });

  it('should initialize the server with specific list of tools correctly', async () => {
    process.argv = [
      'node',
      'index.js',
      '--subtotal-key-id=TEST_KEY_ID',
      '--subtotal-secret-key=TEST_SECRET_KEY',
      '--tools=get-purchases,create-connection',
    ];

    await main();

    expect(SubtotalAIToolkit).toHaveBeenCalledWith({
      keyId: 'TEST_KEY_ID',
      secretKey: 'TEST_SECRET_KEY',
      configuration: {
        tools: ['get-purchases', 'create-connection'],
      },
    });

    expect(StdioServerTransport).toHaveBeenCalled();
  });
});

const ALL_TOOLS = [
  'get-purchases',
  'get-purchase-details',
  'create-connection',
  'create-merchant-link-url',
  'get-merchants',
];
