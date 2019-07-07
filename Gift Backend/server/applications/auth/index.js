
module.exports = function (Auth) {
    return class extends Auth {
        constructor(app, session) {
            super(app, session);
        }
        async authenticate(username, password) {
            return super.authenticate(username, password)
                .then(async user => {
                    user.loginTime = this.session.payload.loginTime;
                    await user.save();
                    this.setSession(user);
                    return user;
                })
        }
        async checkActivated(user) {
            if(user.activated == 'pending') return this.error("Pending Activation", "Please wait until administrator accept your request.");
            if(user.activated == 'disallow') return this.error("Activation disallow", "You are the disallowed user.");
            if(user.activated == 'allow') return Promise.resolve(true);
            return this.error("Unknown activation", "You are not valid user");
        }
        setSession(user) {
            super.setSession(user);
            this.session.payload.displayName = user.username
            this.session.payload.expireCycle = user.expireCycle
            this.session.payload.photoURL = user.avatar
            this.session.payload.isActivated = user.activated
            this.session.payload.role = user.role
        }
        get isAuthenticated() {
            if (this.isLoggedIn) {
                var payload = this.session.payload;
                if (payload.expireCycle < 0) return true;
                var endTime = payload.loginTime + payload.expireCycle * 1000;
                if (endTime > Date.now()) return true;
            }
            return false;
        }
        
        get isSuperAuthenticated() {
            return this.isAuthenticated && this.session.payload.role == 'super';
        }
        get isAdminAuthenticated() {
            return this.isAuthenticated && this.session.payload.role == 'admin';
        }
        isSellerAuthenticated() {
            return this.isAuthenticated && this.session.payload.role == 'seller';
        }
        isDriverAuthenticated() {
            return this.isAuthenticated && this.session.payload.role == 'driver';
        }
        isBuyerAuthenticated() {
            return this.isAuthenticated;
        }

    }
}