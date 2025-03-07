import {SubtotalAIToolkit, Tools} from '@subtotal-inc/ai-toolkit/openai';
import OpenAI from 'openai';
import type {ChatCompletionMessageParam} from 'openai/resources';

require('dotenv').config();

const openai = new OpenAI();

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: [Tools.getPurchases, Tools.getPurchaseDetails],
  },
});

(async (): Promise<void> => {
  let messages: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: `Get the purchase details for the purchase with id 1234567890`,
    },
  ];

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools: subtotalAIToolkit.getTools(),
    });

    const message = completion.choices[0].message;

    messages.push(message);

    if (message.tool_calls) {
      // eslint-disable-next-line no-await-in-loop
      const toolMessages = await Promise.all(
        message.tool_calls.map((tc) => subtotalAIToolkit.handleToolCall(tc))
      );
      messages = [...messages, ...toolMessages];
    } else {
      console.log(completion.choices[0].message);
      break;
    }
  }
})();
