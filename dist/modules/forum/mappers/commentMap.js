"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentMap {
    static toPersistence(comment) {
        return {
            comment_id: comment.commentId.id.toString(),
            member_id: comment.memberId.id.toString(),
            parent_comment_id: comment.parentCommentId ? comment.parentCommentId.id.toString() : null,
            text: comment.text.value,
            points: comment.points
        };
    }
    static toDomain(raw) {
        // TODO:
        return null;
    }
}
exports.CommentMap = CommentMap;
//# sourceMappingURL=commentMap.js.map