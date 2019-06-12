const fs = require('fs');

module.exports = function (app) {
    app.routes = new Routes(app);
    require('rootpath')();
    var filenames = fs.readdirSync('server/applications/router');
    filenames.forEach(filename => {
        require('../../applications/router/' + filename)(app.routes);
    });

    app.all('*', async function (req, res, next) {
        
        var { method, body, params, query } = req;
        const prefix_url = app.config.prefix_url || "";
        var param = params[0];
        if (prefix_url != "") param = param.replace(new RegExp("^" + prefix_url), "");

        var { class_name, func_name, middleware } = app.routes.get(method, param);

        function customNext(isError) {
            if(isError !== undefined) next(isError);

            if (!class_name) return next();

            var Class = app.controls.get(class_name);
            if (!Class) return next();
    
            var controller = new Class(app, req, res, next);
    
            if (!controller[func_name] || typeof controller[func_name] != 'function')
                return next();
    
            var _params = param.split('/').slice(3);
            controller[func_name](..._params).then(result => {
                res.result = result;
                middleware.runAfter(req, res, next);
            }).catch(error => {
                next(error);
            })
        }

        middleware.runBefore(req, res, customNext)

    })
}

class Routes {
    constructor(app) {
        this.container = {};
        this.config = app.config.router;
        this.override = (this.config && this.config.override) || false;
        this.default_class = 'index';
        this.default_func = 'index';

        ['GET', 'PUT', 'POST', 'DELETE', 'PARAMS']
            .forEach(method => this.container[method] = {});
    }

    get(method, param) {
        method = method.toUpperCase();
        var infos = this.container[method][this._renderParam(param)];
        if(infos) {
            if(!infos.exist) infos.renderFuncInfo(param);
        } else {
            if(!this.override) return new Router(param);
        }
        return infos || {};
    }

    set(method, param, router) {

        method = method.toUpperCase();
        this.container[method][this._renderParam(param)] = new Router(router);
    }

    _renderParam(param) {
        var rendered_param = param.split('/').slice(1, 3);
        // if(!rendered_param[0]) rendered_param[0] = this.default_class;
        if (!rendered_param[1]) rendered_param[1] = this.default_func;

        return rendered_param.join('/');
    }

}

class Router {
    constructor(param) {
        this.exist = false;
        if (typeof param != "object") {
            this.renderFuncInfo(param);
            this.middleware = new MiddleWareOption();
        }
        else {
            this.renderFuncInfo(param.router);
            this.middleware = new MiddleWareOption(param.middleware);
        }
    }

    renderFuncInfo(func_info) {
        if(func_info === undefined) return;
        this.exist = true;
        var infos = func_info.split('/'),
            class_name = infos[0],
            func_name = infos[1];

        if (infos[0] == '') {
            class_name = infos[1];
            func_name = infos[2];
        }

        if (class_name == '') class_name = "index";
        if (func_name == '' || !func_name) func_name = "index";
        this.class_name = class_name;
        this.func_name = func_name;
    }

}

class MiddleWareOption {

    constructor(middleware) {
        this.before = null;
        this.after = null;
        if (middleware) this._render(middleware);
    }
    _render(middleware) {
        if (typeof middleware != "object") {
            this.before = middleware;
        } else {
            this.before = this._getMiddleware(middleware.before);
            this.after = this._getMiddleware(middleware.after);
        }
    }
    _getMiddleware(target) {
        if(typeof target == 'function') {
            return target;
        } else if(typeof target == 'string') {
            return require('../../applications/middleware/' + target + '.js');
        }
    }

    runBefore(req, res, next) {
        if(this.before) this.before(req, res, next);
        else next();
    }
    runAfter(req, res, next) {
        if(this.after) this.after(req, res, next);
        else next();
    }
}