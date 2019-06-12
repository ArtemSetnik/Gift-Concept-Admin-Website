const Model = require('./model');
const Pagination = require('../library/pagination');

module.exports = class extends Model {

    constructor(app, req, res, next) {
        super(app);
        this.req = req;
        this.res = res;
        this.next = next;
        this.session = this.req.session;
        this.auth = app.auth(req.session);
    }

    getQueryFromRequest(name) {
        var method = this.req.method.toUpperCase();
        if (method === 'POST') return this.req.body[name];
        else if (method === 'GET') return this.req.query[name];
        else return this.req.body[name];
    }
    postData(name) {
        if (name) return this.req.body[name];
        return this.req.body;
    }
    getData(name) {
        if (name) return this.req.query[name];
        return this.req.query;
    }

    getAllQuery() {
        var method = this.req.method.toUpperCase();
        if (method === 'POST') return this.req.body;
        else if (method === 'GET') return this.req.query;
        else return this.req.body;
    }

    pagination(Model, Query, complete) {
        var page = this.getQueryFromRequest('page') || 1,
            size = this.getQueryFromRequest('size') || 10;
        return Pagination(Model, Query, page, size, complete);
    }

    requestLogin(url, message) {
        return { result: 'request-login', url, message }
    }

}