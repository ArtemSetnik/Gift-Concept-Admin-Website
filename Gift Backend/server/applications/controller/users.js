module.exports = function (Controller) {
    return class extends Controller {
        constructor() {
            super(...arguments);
        }
        async login() {
            var { email, password } = this.postData();
            if (this.auth.isAuthenticated) {
                return this.error("Duplicated login", "You already logged in. \n At first, please log out");
            }
            return this.auth.authenticate(email, password)
                .then(() => {
                    return {
                        payload: this.session.payload
                    }
                })
        }

        async register() {
            var userdata = this.postData();
            return this.users_Model.register(userdata)
                .then(user => {
                    return Promise.resolve('OK');
                })
        }

        async findAllByQuery() {
            const objQueries = this.getAllQuery();
            return this.users_Model.retrieveByQueries(objQueries);
        }
    }
}
