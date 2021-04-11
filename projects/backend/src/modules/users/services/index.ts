
import { redisConnection } from "./redis/redisConnection";
import { RedisAuthService } from "./redis/redisAuthService";

const authService = new RedisAuthService(
  redisConnection
)

// authService.getTokens('khalilstemmler@gmail.com')
// .then((t) => console.log(t))
// .catch((err) => console.log(err))

export { authService }