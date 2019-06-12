const fs = require('fs');
const Model = require('../classes/model');

module.exports = function (app) {
    app.models = new Models();
    
    require('rootpath')();
    var filenames = fs.readdirSync('server/applications/model');
    filenames.forEach(filename => {
        var class_name = filename.slice(0, -3);
        var Class = require('../../applications/model/' + filename)(Model);
        app.models.add(class_name, Class);
    });
}

class Models {
    constructor() {
        this.container = {};
    }
    get(class_name) {
        return this.container[class_name];
    }
    add(class_name, Class) {
        this.container[class_name] = Class;
    }
}
