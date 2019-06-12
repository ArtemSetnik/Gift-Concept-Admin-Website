
const socketio = require('socket.io');
const http = require('http');
const express_session = require('express-session');
const shared_session = require('express-socket.io-session');
const auth = require('../classes/auth');

const EVENTS = {
    connection: 'connection',
    disconnect: 'disconnect',
    authenticate: 'authenticate'
}
const SessionId = function (socket) {
    return socket.handshake.session.id;
}

class ODCServer {
    constructor(app, options) {
        this.app = app;
        this.options = options;
        this.initialize();
    }
    initialize() {
        this._initializeElements();
        this._initializeServer();
        this._initializeEvents();
    }
    on(event, callback) {
        this._event(event).push(callback);
    }
    auth(session) {
        return new auth(this, session);
    }

    emitBySession(session_id, event_name, data) {
        var sockets = this._getSocketsBySession(session_id);
        for (const socket_id in sockets) {
            if (sockets.hasOwnProperty(socket_id)) {
                const socket = sockets[socket_id];
                socket.emit(event_name, data);
            }
        }
    }
    
    channel(name) {
        if (!this._channels[name]) {
            this._channels[name] = new ODCChannel(name);
        }
        return this._channels[name];
    }
    configure(setting) {
        setting(this);
    }
    service(name) {

    }

    // override methods
    listen() {
        this.server.listen(...arguments);
        return this.server;
    }
    set() {
        return this.app.set(...arguments);
    }
    get() {
        return this.app.get(...arguments);
    }
    post() {
        return this.app.post(...arguments);
    }
    use() {
        return this.app.use(...arguments);
    }
    all() {
        return this.app.all(...arguments);
    }
    _initializeElements() {
        this._events = {};
        this._channels = {};
        this._sockets = {};
        this.server = http.createServer(this.app);
        this.io = socketio(this.server);
    }
    _initializeServer() {
        const session = express_session({
            secret: "my-secret",
            resave: true,
            saveUninitialized: true
        });
        this.use(session);
        this.io.use(shared_session(session, {
            autoSave: true
        }));
    }
    _initializeEvents() {
        this.post('/api/socket.io', (req, res, next) => {
            res.json("pre-request");
        })
        this.io.on(EVENTS.connection, (socket) => {
            console.log("connection", socket.handshake.session.id, socket.id);
            socket.auth = this.auth(socket.handshake.session);
            this._event(EVENTS.connection).forEach(callback => callback(socket));

            socket.on(EVENTS.disconnect, () => {
                console.log("disconnect", socket.handshake.session.id, socket.id);
                this._event(EVENTS.disconnect).forEach(callback => callback(socket));
            })
            socket.on(EVENTS.authenticate, (data) => { })
        })
    }
    initializeApi(callback) {
        callback(this.app);
    }
    _event(event) {
        if (!this._events[event]) this._events[event] = [];
        return this._events[event];
    }
    add(socket) {
        this._getSocketsBySession(SessionId(socket))[socket.id] = socket;
    }
    remove(socket) {
        var session_id = SessionId(socket);
        if(this._sockets[session_id]) {
            delete this._sockets[session_id][socket.id];
            if(Object.keys(this._sockets[session_id]).length == 0) {
                delete this._sockets[session_id];
            }
        }
    }
    _getSocketsBySession(session_id) {
        if(!this._sockets[session_id]) {
            this._sockets[session_id] = {};
        }
        return this._sockets[session_id];
    }
}

class ODCChannel {
    constructor(name) {
        this.name = name;
        this.container = {};
    }
    join(socket) {
        this.container[socket.id] = socket;
    }
    leave(socket) {
        delete this.container[socket.id];
    }
    emit(event, data) {

    }
    on(event, data) {

    }
}


class ODCService {

}

class ODCApi {

}

module.exports = function (app, options = {}) {
    return new ODCServer(app, options);
}
module.exports.ODCServer = ODCServer;