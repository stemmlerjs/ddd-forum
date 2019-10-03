"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("shared/domain/AggregateRoot");
const Guard_1 = require("shared/core/Guard");
const Result_1 = require("shared/core/Result");
const userId_1 = require("./userId");
const userCreated_1 = require("./events/userCreated");
const userLoggedIn_1 = require("./events/userLoggedIn");
class User extends AggregateRoot_1.AggregateRoot {
    get userId() {
        return userId_1.UserId.create(this._id)
            .getValue();
    }
    get email() {
        return this.props.email;
    }
    get username() {
        return this.props.username;
    }
    get password() {
        return this.props.password;
    }
    get jwtToken() {
        return this.props.jwtToken;
    }
    setCurrentAccessToken(token) {
        this.addDomainEvent(new userLoggedIn_1.UserLoggedIn(this));
        this.props.jwtToken = token;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.username, argumentName: 'username' },
            { argument: props.email, argumentName: 'email' }
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const isNewUser = !!id === false;
        const user = new User(props, id);
        if (isNewUser) {
            user.addDomainEvent(new userCreated_1.UserCreated(user));
        }
        return Result_1.Result.ok(user);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map