"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginUseCase_1 = require("./LoginUseCase");
const LoginController_1 = require("./LoginController");
const services_1 = require("../../services");
const repos_1 = require("../../repos");
async function test() {
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
const loginUseCase = new LoginUseCase_1.LoginUserUseCase(repos_1.userRepo, services_1.authService);
exports.loginUseCase = loginUseCase;
const loginController = new LoginController_1.LoginController(loginUseCase);
exports.loginController = loginController;
//# sourceMappingURL=index.js.map