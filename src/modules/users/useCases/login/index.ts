
import { LoginUserUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";
import { authService } from "../../services";
import { userRepo } from "../../repos";

async function test () {
  await authService
  // await authService.clearAllSessions('stemmlerjs4')
  // const user = await userRepo.getUserByUserName('stemmlerjs4');

  // const accessToken = authService.signJWT({
  //   username: user.username.value,
  //   email: user.email.value,
  //   isEmailVerified: user.isEmailVerified,
  //   userId: user.userId.toString(),
  //   adminUser: user.isAdminUser,
  // });

  // const refreshToken = authService
  //   .createRefreshToken();

  // user.setAccessToken(accessToken, refreshToken);
  
  // await authService.saveAuthenticatedUser(user);
  // console.log('Done');
  // const tokens = await authService.getTokens('stemmlerjs');
  // console.log(tokens);
}

test();

const loginUseCase = new LoginUserUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase }