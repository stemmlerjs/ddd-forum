"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postSlug_1 = require("./postSlug");
const postTitle_1 = require("./postTitle");
let postSlug;
let postSlugOrError;
let postTitle;
let postTitleOrError;
test('Should be able to create a post slug', () => {
    postTitleOrError = postTitle_1.PostTitle.create({ value: "HTML Developers" });
    expect(postTitleOrError.isSuccess).toBe(true);
    postTitle = postTitleOrError.getValue();
    postSlugOrError = postSlug_1.PostSlug.create(postTitle);
    expect(postSlugOrError.isSuccess).toBe(true);
    postSlug = postSlugOrError.getValue();
    expect(postSlug.value).toContain("html-developers");
});
test('Should be able to parse out any bad characters not suitable for a slug', () => {
    postTitleOrError = postTitle_1.PostTitle.create({ value: "K^ha^l#il^^#'s Job" });
    expect(postTitleOrError.isSuccess).toBe(true);
    postTitle = postTitleOrError.getValue();
    postSlugOrError = postSlug_1.PostSlug.create(postTitle);
    expect(postSlugOrError.isSuccess).toBe(true);
    postSlug = postSlugOrError.getValue();
    expect(postSlug.value).toContain("khalils-job");
});
//# sourceMappingURL=postSlug.spec.js.map