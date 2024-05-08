import { Configuration } from "openai";

export const configOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPEN_AI_ORGANIZATIONID,
  });
  return config;
};
