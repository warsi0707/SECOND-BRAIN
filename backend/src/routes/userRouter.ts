import express from 'express'
import { getContent, signin, userSignup } from '../controllers/userController.js';
import AuthChecker from '../middleware/AuthMiddleware.js';
import { sharedContent, sharedContents } from '../controllers/contentController.js';

const userRouter = express.Router()

userRouter.post("/signup", userSignup)
.post("/signin", signin)
.get("/content", AuthChecker, getContent)


export default userRouter;