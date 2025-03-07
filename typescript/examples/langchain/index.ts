import {SubtotalAIToolkit, Tools} from '@subtotal/ai-toolkit/langchain';
import {ChatOpenAI} from '@langchain/openai';
import type {ChatPromptTemplate} from '@langchain/core/prompts';
import {pull} from 'langchain/hub';
import {AgentExecutor, createStructuredChatAgent} from 'langchain/agents';

require('dotenv').config();

const llm = new ChatOpenAI({
  model: 'gpt-4o',
});

const subtotalAIToolkit = new SubtotalAIToolkit({
  keyId: process.env.SUBTOTAL_KEY_ID!,
  secretKey: process.env.SUBTOTAL_SECRET_KEY!,
  configuration: {
    tools: [Tools.getPurchases, Tools.getPurchaseDetails],
  },
});

(async (): Promise<void> => {
  const prompt = await pull<ChatPromptTemplate>(
    'hwchase17/structured-chat-agent'
  );

  const tools = subtotalAIToolkit.getTools();

  const agent = await createStructuredChatAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const response = await agentExecutor.invoke({
    input: `
      Get the purchase details for the purchase with id 1234567890
    `,
  });

  console.log(response);
})();
