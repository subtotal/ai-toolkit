import {SubtotalAIToolkit, Tools} from '@subtotal/ai-toolkit/ai-sdk';
import {openai} from '@ai-sdk/openai';
import {generateText} from 'ai';

require('dotenv').config();

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: [Tools.getPurchases, Tools.getPurchaseDetails],
  },
});

const model = openai('gpt-4o');

(async () => {
  const result = await generateText({
    model: model,
    tools: {...subtotalAIToolkit.getTools()},
    maxSteps: 3,
    prompt:
      'Get the purchase details for the last purchase for ' +
      'connection ID "01JNHY5M3Q5207QEF9YYV909MG" and give a ' +
      'product recommendation based on the contents of that purchase',
  });
  console.log(JSON.stringify(result, null, 2));
})();
