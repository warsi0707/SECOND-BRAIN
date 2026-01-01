import express from 'express'
import AuthChecker from '../middleware/AuthMiddleware.js';
import { deleteContent, getContents, postContent, sharedContent } from '../controllers/contentController.js';

const contentRouter = express.Router()

contentRouter.post("/", AuthChecker, postContent)
.get("/", AuthChecker, getContents)
.get("/shared/:id", AuthChecker, sharedContent)
.delete("/:id", AuthChecker, deleteContent)

export default contentRouter;