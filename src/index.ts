import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import * as readline from "readline";
import * as dotenv from "dotenv";
import chalk from "chalk";

// *******************************************************
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{ role: "user", content: "Hello what are you doing?" }],
// });
// console.log(completion.data.choices[0].message);
// console.log("*****************************\nOne part of the data");
// console.log(completion.data);
// console.log("*****************************\nWhole completion");
// console.log(completion);
// *******************************************************

const messages: ChatCompletionRequestMessage[] = [];

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.setPrompt("\n Send a message:\n");
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
    console.log(chalk.green(responseMessage?.content));

    if (responseMessage) {
      messages.push({
        role: responseMessage.role, 
        content: responseMessage.content});
    }

    console.log("You entered >> ", input);
    console.log("Current messages:");
    console.log(messages);
    console.log("*************************");
    userInterface.prompt();
  })
  .on("close", () => {
    console.log("Thank you for using this Demo");
  });
