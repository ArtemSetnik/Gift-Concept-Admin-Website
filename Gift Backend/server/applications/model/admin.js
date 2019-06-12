module.exports = function (Model) {
    return class extends Model {
        constructor() {
            super(...arguments);

            this.mongoose('users');
        }

        getAdmin() {
            return this.users_Mongo.findOne({role: 'admin'})
        }
        existSuperAdmin() {
            return this.users_Mongo.findOne({role: 'super'})
                .then(admin => {
                    if(admin) return Promise.resolve(true);
                    return Promise.resolve(false);
                })
        }
        addSuperAdmin(user_data) {
            return this.validateRegisterData(user_data)
                .then(() => {
                    user_data.role = 'super';
                    user_data.activated = 'allow';
                    return this.users_Mongo.create(user_data)
                })
        }
        addAdmin(userData) {
            return this.validateRegisterData(userData)
                .then(() => {
                    userData.role = "admin";
                    return this.users_Mongo.create(userData)
                })
        }
        validateRegisterData(userData) {
            if(userData.username == "") return Promise.reject("Username is required but it is empty.");
            if(userData.email == "") return Promise.reject("Email is required but it is empty");
            if(userData.password == "") return Promise.reject("Password is required but it is empty");
            return Promise.resolve(true);
        }
    }
}