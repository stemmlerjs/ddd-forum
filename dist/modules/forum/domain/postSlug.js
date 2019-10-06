"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const slug_1 = __importDefault(require("slug"));
const TextUtils_1 = require("../../../shared/utils/TextUtils");
slug_1.default.defaults.mode = 'pretty';
slug_1.default.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: false,
    lower: true,
    charmap: slug_1.default.charmap,
    multicharmap: slug_1.default.multicharmap // replace multi-characters 
};
class PostSlug extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static createFromExisting(slugName) {
        if (!!slugName === true) {
            return Result_1.Result.ok(new PostSlug({ value: slugName }));
        }
        else {
            return Result_1.Result.fail('No slug passed in');
        }
    }
    static create(postTitle) {
        let returnSlug = "";
        // Run the slug algorithm here to create a slug
        // Strip all non alphabetic characters such as . / ; ,
        returnSlug = postTitle.value.replace(/[\W_]+/g, " ");
        returnSlug = TextUtils_1.TextUtils.createRandomNumericString(7) + "-" + slug_1.default(postTitle.value);
        return Result_1.Result.ok(new PostSlug({ value: returnSlug }));
    }
}
exports.PostSlug = PostSlug;
//# sourceMappingURL=postSlug.js.map