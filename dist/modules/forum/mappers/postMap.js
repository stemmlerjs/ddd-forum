"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostMap {
    static toDomain(raw) {
        // TODO: 
        return null;
    }
    static toPersistence(post) {
        return {
            updatedAt: new Date(),
            title: post.title.value,
            post_id: post.postId.id.toString(),
            member_id: post.memberId.id.toString(),
            text: post.isTextPost() ? post.text.value : null,
            slug: post.slug.value,
            points: post.points,
            type: post.type,
            link: post.isLinkPost() ? post.link.url : null,
        };
    }
}
exports.PostMap = PostMap;
//# sourceMappingURL=postMap.js.map