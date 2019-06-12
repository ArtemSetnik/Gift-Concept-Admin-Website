module.exports = function (Contoller) {
    return class extends Contoller {
        async register() {
            var data = this.postData();
            var userData = {
                username: data.username,
                email: data.email,
                password: data.password,
                role: 'seller'
            }
            await this.auth.register(userData);
            return Promise.resolve(true);
        }
    }
}