import { Router } from "express";
import { verifyToken } from "../utils/token.manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { genarateChatCompletion } from "../controllers/chat.controller.js";
//protected routs
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, genarateChatCompletion);
export default chatRoutes;
//# sourceMappingURL=chat.routes.js.map