import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from "dotenv";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listModels();

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello what are you doing?" }],
});
console.log(completion.data.choices[0].message);


console.log(completion.data);
console.log('*****************************\nSomething else');
console.log(completion);
