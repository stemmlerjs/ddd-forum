
import { LoginUserUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";
import { authService } from "../../services";
import { userRepo } from "../../repos";

async function test () {
  // const username = await authService.getUserNameFromRefreshToken(`*${"KbeS2mf9r4Sq1na6NI6QlTPSp1Fx7tVEQbNeXmFyrgiCvMUYgiy3p45V03gCluo320xMt1N6yef1VPT2cXRzlM8BMznPecTI4ofykUNdkYFGIlNreLVvCP8GFyyDSJ49A27qcFbPLnPQg9hJfZHH4vtT2b4Yi8k1blj30PbfqZ252dFiC4yYeKR5nbYX4l78ThuDK7hmwp9M2WzxoiitIoQkthe0AA8jIyL1ra8DypLaiddULNOI7n5JygEibAcf"}*`)
  // console.log(username);
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