module.exports = function (Controller) {
    return class extends Controller {
        constructor() {
            super(...arguments);
            this.model("admin");
        }

        async setup() {
            var user_data = this.postData();
            if(await this.isSetAdmin()) {
                return this.error("Permission Failed", "this website already is set.");
            }
            
            return this.admin_Model.validateRegisterData(user_data)
                .then(() => {
                    user_data.role = 'super';
                    user_data.activated = 'allow';
                    return this.auth.register(user_data);
                })
                .then(() => Promise.resolve(true));
        }

        async isSetAdmin() {
            return this.admin_Model.existSuperAdmin()
        }

    }
}
