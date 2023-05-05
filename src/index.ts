import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import * as readline from "readline";
import * as dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messages: ChatCompletionRequestMessage[] = [];

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.setPrompt("\nSend a message:\n");
userInterface.prompt();

userInterface
  .on("line", async (input) => {
    const requestMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: input,
    };

    messages.push(requestMessage);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const responseMessage = completion.data.choices[0].message;
    if (responseMessage) {
      console.log(chalk.green(responseMessage.content));
      messages.push({
        role: responseMessage.role,
        content: responseMessage.content,
      });
    }
    userInterface.prompt();
  })
  .on("close", () => {
    console.log("Thank you for using this Demo");
  });
