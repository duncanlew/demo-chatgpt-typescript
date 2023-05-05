import { Configuration, OpenAIApi } from 'openai';
import * as readline from 'readline';
import * as dotenv from "dotenv";
// const readline = require("readline");

// *******************************************************
// dotenv.config();
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: "Hello what are you doing?" }],
  // });
  // console.log(completion.data.choices[0].message);
  // console.log(completion.data);
  // console.log('*****************************\nSomething else');
  // console.log(completion);
  // *******************************************************

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const messages: string[] = [];
userInterface.prompt();
userInterface.on("line", async (input) => {
  console.log('You entered >> ', input);
  messages.push(input);
  console.log('Current messages:');
  console.log(messages);
  console.log('*************************');
  userInterface.prompt();
});
