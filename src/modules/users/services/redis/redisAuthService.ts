
import { RedisClient } from 'redis';
import * as jwt from 'jsonwebtoken'
import * as uuid from "uuid"
import randtoken from 'rand-token'
import { authConfig } from '../../../../config';
import { AbstractRedisClient } from './abstractRedisClient';
import { IAuthService } from '../authService';
import { RefreshToken, JWTToken, JWTClaims } from '../../domain/jwt';
import { User } from '../../domain/user';

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

  public async refreshTokenExists (refreshToken: RefreshToken): Promise<boolean> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    return keys.length !== 0;
  }

  public async getUserNameFromRefreshToken (refreshToken: RefreshToken): Promise<string> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    const exists = keys.length !== 0;
    
    if (!exists) throw new Error("Username not found for refresh token.");

    const key = keys[0];

    return key.substring(key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1)
  }

  public async saveAuthenticatedUser (user: User): Promise<void> {
    if (user.isLoggedIn()) {
      await this.addToken(user.username.value, user.refreshToken, user.accessToken);
    }
  }

  public async deAuthenticateUser(username: string): Promise<void> {
    await this.clearAllSessions(username);
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
      username: props.username,
      userId: props.userId,
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

  private constructKey (username: string, refreshToken: RefreshToken): string {
    return `refresh-${refreshToken}.${this.jwtHashName}.${username}`
  }

  /**
   * @method addToken
   * @desc Adds the token for this user to redis.
   * 
   * @param {username} string
   * @param {refreshToken} string
   * @param {token} string
   * @return Promise<any>
   */

  public addToken (username: string, refreshToken: RefreshToken, token: JWTToken): Promise<any> {
    return this.set(this.constructKey(username, refreshToken), token);
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
   * @param {username} string
   * @return Promise<number>
   */

  public countSessions(username: string): Promise<number> {
    return this.count(`*${this.jwtHashName}.${username}`);
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

  public async getTokens (username: string): Promise<string[]> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`);
    return keyValues.map((kv) => kv.value);
  }

  /**
   * @method getToken
   * @desc Gets a single token for the user.
   * @param {username} string
   * @param {refreshToken} string
   * @return Promise<string>
   */

  public async getToken(username: string, refreshToken: string): Promise<string> {
    return this.getOne(this.constructKey(username, refreshToken));
  }

  /**
   * @method clearToken
   * @desc Deletes a single user's session token.
   * @param {username} string
   * @param {refreshToken} string
   * @return Promise<string>
   */
  
  public async clearToken(username: string, refreshToken: string): Promise<any> {
    return this.deleteOne(this.constructKey(username, refreshToken));
  }

  /**
   * @method clearAllSessions
   * @desc Clears all active sessions for the current user.
   * @param {username} string
   * @return Promise<any>
   */

  public async clearAllSessions (username: string): Promise<any> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`);
    const keys = keyValues.map((kv) => kv.key);
    return Promise.all(
      keys.map((key) => this.deleteOne(key))
    )
  }

  /**
   * @method sessionExists
   * @desc Checks if the session for this user exists
   * @param {username} string
   * @param {refreshToken} string
   * @return Promise<boolean>
   */

  public async sessionExists (username: string, refreshToken: string): Promise<boolean> {
    const token = await this.getToken(username, refreshToken);
    if (!!token) {
      return true;
    } else {
      return false;
    }
  }
}