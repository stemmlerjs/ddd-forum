"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const uuid = __importStar(require("uuid"));
const rand_token_1 = __importDefault(require("rand-token"));
const config_1 = require("../../../../config");
const abstractRedisClient_1 = require("./abstractRedisClient");
/**
 * @class JWTClient
 * @extends AbstractRedisClient
 * @desc This class is responsible for persisting jwts to redis
 * and for signing tokens. It should also be responsible for determining their
 * validity.
 */
class RedisAuthService extends abstractRedisClient_1.AbstractRedisClient {
    constructor(redisClient) {
        super(redisClient);
        this.jwtHashName = 'activeJwtClients';
    }
    createSessionId() {
        return uuid.v4();
    }
    createRefreshToken() {
        return rand_token_1.default.uid(256);
    }
    /**
     * @function signJWT
     * @desc Signs the JWT token using the server secret with some claims
     * about the current user.
     */
    signJWT(props) {
        const claims = {
            email: props.email,
            userId: props.userId,
            sessionId: props.sessionId ? props.sessionId : this.createSessionId(),
            adminUser: props.adminUser,
            isEmailVerified: props.isEmailVerified
        };
        return jwt.sign(claims, config_1.authConfig.secret, {
            expiresIn: config_1.authConfig.tokenExpiryTime
        });
    }
    /**
     * @method decodeJWT
     * @desc Decodes the JWT using the server secret. If successful decode,
     * it returns the data from the token.
     * @param {token} string
     * @return Promise<any>
     */
    decodeJWT(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config_1.authConfig.secret, (err, decoded) => {
                if (err)
                    return resolve(null);
                return resolve(decoded);
            });
        });
    }
    constructKey(email, sessionId) {
        return `session-${sessionId}.${this.jwtHashName}.${email}`;
    }
    /**
     * @method addToken
     * @desc Adds the token for this user to redis.
     *
     * @param {email} string
     * @param {sessionId} string
     * @param {token} string
     * @return Promise<any>
     */
    addToken(email, sessionId, token) {
        return this.set(this.constructKey(email, sessionId), token);
    }
    /**
     * @method clearAllTokens
     * @desc Clears all jwt tokens from redis. Usually useful for testing.
     * @return Promise<any>
     */
    async clearAllTokens() {
        const allKeys = await this.getAllKeys(`*${this.jwtHashName}*`);
        return Promise.all(allKeys.map((key) => this.deleteOne(key)));
    }
    /**
     * @method countSessions
     * @desc Counts the total number of sessions for a particular user.
     * @param {email} string
     * @return Promise<number>
     */
    countSessions(email) {
        return this.count(`*${this.jwtHashName}.${email}`);
    }
    /**
     * @method countTokens
     * @desc Counts the total number of sessions for a particular user.
     * @return Promise<number>
     */
    countTokens() {
        return this.count(`*${this.jwtHashName}*`);
    }
    /**
     * @method getTokens
     * @desc Gets the user's tokens that are currently active.
     * @return Promise<string[]>
     */
    async getTokens(email) {
        const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${email}`);
        return keyValues.map((kv) => kv.value);
    }
    /**
     * @method getToken
     * @desc Gets a single token for the user.
     * @param {email} string
     * @param {sessionId} string
     * @return Promise<string>
     */
    async getToken(email, sessionId) {
        return this.getOne(this.constructKey(email, sessionId));
    }
    /**
     * @method clearToken
     * @desc Deletes a single user's session token.
     * @param {email} string
     * @param {sessionId} string
     * @return Promise<string>
     */
    async clearToken(email, sessionId) {
        return this.deleteOne(this.constructKey(email, sessionId));
    }
    /**
     * @method clearAllSessions
     * @desc Clears all active sessions for the current user.
     * @param {email} string
     * @return Promise<any>
     */
    async clearAllSessions(email) {
        const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${email}`);
        const keys = keyValues.map((kv) => kv.key);
        return Promise.all(keys.map((key) => this.deleteOne(key)));
    }
    /**
     * @method sessionExists
     * @desc Checks if the session for this user exists
     * @param {email} string
     * @param {sessionId} string
     * @return Promise<boolean>
     */
    async sessionExists(email, sessionId) {
        const token = await this.getToken(email, sessionId);
        if (!!token) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.RedisAuthService = RedisAuthService;
//# sourceMappingURL=redisAuthService.js.map