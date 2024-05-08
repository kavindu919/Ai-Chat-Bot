import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configOpenAI } from "../utils/openai.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const genarateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //config open ai
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    //grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    //sending all chats with new one to api(openai api)
    const config = configOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
    //get lastest response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
