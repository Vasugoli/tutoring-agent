import { cerebras } from "@ai-sdk/cerebras";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { mcp } from "../mcp/mcp";

const llm = cerebras("llama3.1-8b");


let TOOLS : Record<string, any> = await mcp.getTools();
if (TOOLS.sequential_sequentialthinking && !TOOLS.sequential_sequentialthinking.outputSchema) {
  TOOLS.sequential_sequentialthinking.outputSchema = z.object({
    answer: z.string(), // Must match what the tool actually returns
  }).strict();
}
console.log(TOOLS);

export const tutoringAgent = new Agent({
	name: "Tutoring Agent",
	instructions: `
    You are an intelligent educational assistant.

    - Use 'tavily_tavily-search' for current topics.
    - Use 'rag_rag-search' to retrieve documents and answer questions.
    - Use 'quiz_generate-quiz' to generate practice questions.
    - Use 'explainer_explain' to explain answers or topics in depth.

    Always explain your reasoning clearly and encourage follow-up questions.
    `,
	model: llm,
	tools: TOOLS,
	// Configure memory to store interactions and context
	memory: new Memory({
		// Configure memory settings as needed
		storage: new LibSQLStore({
			url: "file:../mastra.db",
		}),
	}),
});
