"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostMap {
    static toDomain(raw) {
        // TODO: 
        return null;
    }
    static toPersistence(post) {
        return {
            post_id: post.postId.id.toString(),
            member_id: post.memberId.id.toString(),
            text: post.title.value,
            slug: post.slug.value,
            points: post.points
        };
    }
}
exports.PostMap = PostMap;
//# sourceMappingURL=postMap.js.map