module.exports = function (Model) {
    return class extends Model {
        constructor() {
            super(...arguments);

            this.mongoose('users');
            this.protectFields = [this.app.config.authentication.password, '_id'];
        }


        async login(email, password) {
            return this.auth.authentication(email, password)
                .then(() => {
                    return { payload: this.session.payload }
                })
        }
        register(userdata) {
            return this.users_Mongo.create(userdata);
        }

        encodePassword(password) {
            return md5(password);
        }

        getDefaultProtectedSelection() {
            var defaultSelection = {};
            this.protectFields.forEach(field => { defaultSelection[field] = 0; });
            return defaultSelection;
        }

        retrieveByQueries(objQueries) {
            var whereCondition = {}, protectedSelection = this.getDefaultProtectedSelection();

            for (const key in objQueries) {
                if (objQueries.hasOwnProperty(key)) {
                    const element = objQueries[key];
                    const regElement = new RegExp(element.toString(), "i")
                    whereCondition[key] = regElement;
                }
            }

            return this.users_Mongo.find(whereCondition).select(protectedSelection)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log('Error Occured : ', err);
                })
        }
    }
}