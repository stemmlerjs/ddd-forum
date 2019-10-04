
import { RedisClient } from 'redis';
import * as jwt from 'jsonwebtoken'
import * as uuid from "uuid"
import randtoken from 'rand-token'
import { authConfig } from '../../../../config';
import { AbstractRedisClient } from './abstractRedisClient';
import { IAuthService } from '../authService';
import { SessionId, RefreshToken, JWTToken, JWTClaims } from '../../domain/jwt';

/**
 * @class JWTClient
 * @extends AbstractRedisClient
 * @desc This class is responsible for persisting jwts to redis
 * and for signing tokens. It should also be responsible for determining their
 * validity.
 */

export class RedisAuthService extends AbstractRedisClient implements IAuthService {
  
  public jwtHashName: string  = 'activeJwtClients';
  
  constructor (redisClient: RedisClient) {
    super(redisClient);
  }

  public createSessionId (): SessionId {
    return uuid.v4() as SessionId;
  }

  public createRefreshToken (): RefreshToken {
    return randtoken.uid(256) as RefreshToken;
  }

  /**
   * @function signJWT
   * @desc Signs the JWT token using the server secret with some claims
   * about the current user.
   */

  public signJWT (props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      email: props.email,
      userId: props.userId,
      sessionId: props.sessionId ? props.sessionId : this.createSessionId(),
      adminUser: props.adminUser,
      isEmailVerified: props.isEmailVerified
    };

    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime
    });
  }

  /**
   * @method decodeJWT
   * @desc Decodes the JWT using the server secret. If successful decode,
   * it returns the data from the token.
   * @param {token} string
   * @return Promise<any>
   */

  public decodeJWT (token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    })
  }

  private constructKey (email: string, sessionId: string): string {
    return `session-${sessionId}.${this.jwtHashName}.${email}`
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

  public addToken (email: string, sessionId: string, token: JWTToken): Promise<any> {
    return this.set(this.constructKey(email, sessionId), token);
  }

  /**
   * @method clearAllTokens
   * @desc Clears all jwt tokens from redis. Usually useful for testing.
   * @return Promise<any>
   */

  public async clearAllTokens (): Promise<any> {
    const allKeys = await this.getAllKeys(`*${this.jwtHashName}*`);
    return Promise.all(
      allKeys.map((key) => this.deleteOne(key))
    )
  }

  /**
   * @method countSessions
   * @desc Counts the total number of sessions for a particular user.
   * @param {email} string
   * @return Promise<number>
   */

  public countSessions(email: string): Promise<number> {
    return this.count(`*${this.jwtHashName}.${email}`);
  }

  /**
   * @method countTokens
   * @desc Counts the total number of sessions for a particular user.
   * @return Promise<number>
   */

  public countTokens (): Promise<number> {
    return this.count(`*${this.jwtHashName}*`);
  } 

  /**
   * @method getTokens
   * @desc Gets the user's tokens that are currently active.
   * @return Promise<string[]>
   */

  public async getTokens (email: string): Promise<string[]> {
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

  public async getToken(email: string, sessionId: string): Promise<string> {
    return this.getOne(this.constructKey(email, sessionId));
  }

  /**
   * @method clearToken
   * @desc Deletes a single user's session token.
   * @param {email} string
   * @param {sessionId} string
   * @return Promise<string>
   */
  
  public async clearToken(email: string, sessionId: string): Promise<any> {
    return this.deleteOne(this.constructKey(email, sessionId));
  }

  /**
   * @method clearAllSessions
   * @desc Clears all active sessions for the current user.
   * @param {email} string
   * @return Promise<any>
   */

  public async clearAllSessions (email: string): Promise<any> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${email}`);
    const keys = keyValues.map((kv) => kv.key);
    return Promise.all(
      keys.map((key) => this.deleteOne(key))
    )
  }

  /**
   * @method sessionExists
   * @desc Checks if the session for this user exists
   * @param {email} string
   * @param {sessionId} string
   * @return Promise<boolean>
   */

  public async sessionExists (email: string, sessionId: string): Promise<boolean> {
    const token = await this.getToken(email, sessionId);
    if (!!token) {
      return true;
    } else {
      return false;
    }
  }
}