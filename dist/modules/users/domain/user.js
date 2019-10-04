"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userId_1 = require("./userId");
const userCreated_1 = require("./events/userCreated");
const userLoggedIn_1 = require("./events/userLoggedIn");
const userDeleted_1 = require("./events/userDeleted");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
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
    get accessToken() {
        return this.props.accessToken;
    }
    get isDeleted() {
        return this.props.isDeleted;
    }
    get isEmailVerified() {
        return this.props.isEmailVerified;
    }
    get isAdminUser() {
        return this.props.isAdminUser;
    }
    get lastLogin() {
        return this.props.lastLogin;
    }
    isLoggedIn() {
        return !!this.props.accessToken && !!this.props.refreshToken;
    }
    setAccessToken(token, refreshToken) {
        this.addDomainEvent(new userLoggedIn_1.UserLoggedIn(this));
        this.props.accessToken = token;
        this.props.refreshToken = refreshToken;
        this.props.lastLogin = new Date();
    }
    delete() {
        if (!this.props.isDeleted) {
            this.addDomainEvent(new userDeleted_1.UserDeleted(this));
            this.props.isDeleted = true;
        }
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
        const user = new User(Object.assign(Object.assign({}, props), { isDeleted: props.isDeleted ? props.isDeleted : false, isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false, isAdminUser: props.isAdminUser ? props.isAdminUser : false }), id);
        if (isNewUser) {
            user.addDomainEvent(new userCreated_1.UserCreated(user));
        }
        return Result_1.Result.ok(user);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map