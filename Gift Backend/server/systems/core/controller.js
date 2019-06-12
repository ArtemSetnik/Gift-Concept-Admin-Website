const fs = require('fs');
const Controller = require('../classes/controller');

module.exports = function (app) {
    app.controls = new Controls();
    
    require('rootpath')();
    var filenames = fs.readdirSync('server/applications/controller');
    filenames.forEach(filename => {
        var class_name = filename.slice(0, -3);
        var Class = require('../../applications/controller/' + filename)(Controller);
        app.controls.add(class_name, Class);
    });

}

class Controls {
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