import {SubtotalAIToolkit} from '@subtotal/ai-toolkit/ai-sdk';
import {openai} from '@ai-sdk/openai';
import {
  generateText,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from 'ai';

require('dotenv').config();

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: ['get-purchases', 'get-purchase-details'],
  },
});

const model = openai('gpt-4o');

(async () => {
  const result = await generateText({
    model: model,
    tools: {
      ...subtotalAIToolkit.getTools(),
    },
    maxSteps: 5,
    prompt:
      'Get the purchase details for the purchase with id 1234567890',
  });

  console.log(result);
})();
