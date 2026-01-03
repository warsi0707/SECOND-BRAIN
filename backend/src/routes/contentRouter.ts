import express from 'express'
import AuthChecker from '../middleware/AuthMiddleware.js';
import { deleteContent, getContents, postContent, sharedContent, sharedContents } from '../controllers/contentController.js';

const contentRouter = express.Router()

contentRouter.post("/", AuthChecker, postContent)
.get("/", AuthChecker, getContents)
.get("/shared/contents", sharedContents)
.get("/shared/:id", sharedContent)
.delete("/:id", AuthChecker, deleteContent)


export default contentRouter;