var crypto = require('crypto');

module.exports = class {

    constructor(app) {
        this.app = app;
    }

    mongoose(mongoose_name, rename) {
        rename || (rename = mongoose_name + '_Mongo');

        if (this[rename]) return this[rename];

        return this[rename] = this.app.mongoose.model(mongoose_name);
    }
    
    model(model_name, rename) {

        rename || (rename = model_name + '_Model');

        if (this[rename]) return this[rename];

        var Class = this.app.models.get(model_name);
        return this[rename] = new Class(this.app);
    }

    md5(data) {
        return crypto.createHash('md5').update(data).digest("hex");
    }

    library(library_name, rename) {
        rename || (rename = library_name + '_Library');
        if(this[rename]) return this[rename];

        return this[rename] = require('../library/'+library_name+'.js');
    }
    error(error_code, message) {
        return Promise.reject({code: error_code, message});
    }
}