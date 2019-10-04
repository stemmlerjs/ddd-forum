"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractRedisClient {
    constructor(client) {
        this.tokenExpiryTime = 604800;
        this.client = client;
    }
    async count(key) {
        const allKeys = await this.getAllKeys(key);
        return allKeys.length;
    }
    exists(key) {
        return new Promise((resolve, reject) => {
            return this.count(key)
                .then((count) => {
                return resolve(count >= 1 ? true : false);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    getOne(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, reply) => {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(reply);
                }
            });
        });
    }
    getAllKeys(wildcard) {
        return new Promise((resolve, reject) => {
            this.client.keys(wildcard, async (error, results) => {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(results);
                }
            });
        });
    }
    getAllKeyValue(wildcard) {
        return new Promise((resolve, reject) => {
            this.client.keys(wildcard, async (error, results) => {
                if (error) {
                    return reject(error);
                }
                else {
                    const allResults = await Promise.all(results.map(async (key) => {
                        const value = await this.getOne(key);
                        return { key, value };
                    }));
                    return resolve(allResults);
                }
            });
        });
    }
    set(key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (error, reply) => {
                if (error) {
                    return reject(error);
                }
                else {
                    this.client.expire(key, this.tokenExpiryTime);
                    return resolve(reply);
                }
            });
        });
    }
    deleteOne(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (error, reply) => {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(reply);
                }
            });
        });
    }
    testConnection() {
        return new Promise((resolve, reject) => {
            this.client.set('test', 'connected', (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.AbstractRedisClient = AbstractRedisClient;
//# sourceMappingURL=abstractRedisClient.js.map