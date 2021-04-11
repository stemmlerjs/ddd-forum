
import { RefreshAccessToken } from "./RefreshAccessToken";
import { userRepo } from "../../repos";
import { authService } from "../../services";
import { RefreshAccessTokenController } from "./RefreshAccessTokenController";

const refreshAccessToken = new RefreshAccessToken(userRepo, authService);

const refreshAccessTokenController = new RefreshAccessTokenController(
  refreshAccessToken
)

export {
  refreshAccessToken,
  refreshAccessTokenController
}