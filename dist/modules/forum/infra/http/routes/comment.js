"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCommentByPostSlug_1 = require("../../../useCases/comments/getCommentByPostSlug");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/', (req, res) => getCommentByPostSlug_1.getCommentsByPostSlugContainer.execute(req, res));
commentRouter.post('/'); // post comment
commentRouter.post('/:commentId/reply'); // post reply
commentRouter.get('/:commentId'); // get comment by id
//# sourceMappingURL=comment.js.map