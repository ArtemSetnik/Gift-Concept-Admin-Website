const Model = require('./model');
const Auth = require('../../applications/auth');

class _Auth extends Model {

    constructor(app, session) {
        super(app);
        this.session = session;
        this.config = app.config.authentication;
        this.activated = this.config.activated;
        this.model_key = this.config.model;
        this.username_key = this.config.name;
        this.password_key = this.config.password;
        this.loginStatus_key = this.config.loginStatus;
        this.mongooseModel = this.mongoose(this.model_key);
        this.errors = [];
    }
    async authenticate(username, password) {
        return this.mongooseModel.findOne({ [this.username_key]: username })
            .then(async user => {

                if (!user) return Promise.reject({ code: 'User Invalid', message: `The user didn't regist.` });

                await this.checkActivated(user);

                if (user[this.password_key] == this.encodePassword(password)) {
                    user[this.loginStatus_key] = true;
                    await user.save();
                    this.setSession(user);
                    return Promise.resolve(user);
                }
                return Promise.reject({ code: 'PasswordInvalid', message: "The password is invalid." });
            })
    }
    async checkActivated(user) {
        if (user[this.activated])
            return Promise.resolve(true);
        else
            return this.error("Activation Failed", "You are not activated user");
    }

    async register(userdata) {
        var encoded_password = this.encodePassword(userdata[this.password_key]);
        userdata[this.password_key] = encoded_password;
        return this.mongooseModel.create(userdata);
    }

    encodePassword(password) {
        return this.md5(password);
    }

    setSession(user) {
        this.session.payload = {
            username: user[this.username_key],
            loginTime: Date.now(),
            loginStatus: true
        }
    }

    resetSession() {
        this.session.payload = {}
    }
    async logout() {
        if (this.isLoggedIn && this.username) {
            this.resetSession();
            return this.mongooseModel.updateOne({ [this.username_key]: this.username }, { [this.loginStatus_key]: false })
                .then(() => {
                    return true;
                })
        }
        return Promise.resolve(true);
    }
    async currentUser() {
        if (this.isLoggedIn && this.username) {
            return this.mongooseModel.findOne({
                [this.username_key]: this.username
            });
        }
        return Promise.resolve(null);
    }
    get isLoggedIn() {
        var payload = this.session.payload;
        return payload && payload.user && payload.user.loginStatus;
    }
    get username() {
        if (this.isLoggedIn) {
            return this.session.payload.user.username;
        }
        return null;
    }
}

module.exports = Auth(_Auth);