"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const v1_1 = require("./api/v1");
const config_1 = require("../../../config");
const origin = {
    origin: config_1.isProduction ? 'https://dddforum.com' : '*',
};
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default(origin));
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(morgan_1.default('combined'));
app.use('/api/v1', v1_1.v1Router);
const port = process.env.PORT || 9215;
app.listen(port, () => {
    console.log(`[App]: Listening on port ${port}`);
});
//# sourceMappingURL=app.js.map