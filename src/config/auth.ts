
const authConfig = {
  secret: process.env.DDD_FORUM_APP_SECRET,
  tokenExpiryTime: 300, // seconds => 5 minutes
  redisServerPort: process.env.DDD_FORUM_REDIS_PORT || 6379,
  redisServerURL: process.env.DDD_FORUM_REDIS_URL,
  redisConnectionString: process.env.REDIS_URL
}

export { authConfig }