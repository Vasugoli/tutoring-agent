import { MCPClient } from "@mastra/mcp";

export const mcp = new MCPClient({
  servers: {
    tavily: {
      command: "npx",
      args: ["-y", "tavily-mcp"],
      env: {
        TAVILY_API_KEY: "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", // if you're using dotenv
      }
    },
    // RAG Tool
    // rag: {
    //   command: "npx",
    //   args: ["-y", "@mastra/server-rag"]
    // },
    // Quiz Tool
    // quiz: {
    //   command: "npx",
    //   args: ["-y", "@mastra/server-quiz"]
    // },
    // Explanation Tool
    // explainer: {
    //   command: "npx",
    //   args: ["-y", "@mastra/server-explainer"]
    // },
    // Sequential Thinking (optional, for reasoning)
    // sequential: {
    //   command: "npx",
    //   args: ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    // }
  }
});
