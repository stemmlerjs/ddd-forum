
import { authConfig } from "./auth";

const isProduction = process.env.DDD_FORUM_IS_PRODUCTION;

export {
  isProduction,
  authConfig
}