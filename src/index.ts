import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import * as readline from "readline";
import * as dotenv from "dotenv";
import chalk from "chalk";

// Load OpenAI API key from environment variable
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize messages array
const messages: ChatCompletionRequestMessage[] = [];

// Initialize readline interface
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Set prompt for user
userInterface.setPrompt(`\n${chalk.blue("Send a message:")}\n`);
userInterface.prompt();

userInterface.on("line", async (input) => {
  // Create request message and add it to messages array
  const requestMessage: ChatCompletionRequestMessage = {
    role: "user",
    content: input,
  };
  messages.push(requestMessage);

  // Call OpenAI API to generate response
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  // Display response message to user
  const responseMessage = completion.data.choices[0].message;
  if (responseMessage) {
    console.log(chalk.green(responseMessage.content));
    messages.push({
      role: responseMessage.role,
      content: responseMessage.content,
    });
  }

  // Prompt user for next message
  userInterface.prompt();
});

// Handle program exit
userInterface.on("close", () => {
  console.log(chalk.blue("Thank you for using this Demo"));
});
