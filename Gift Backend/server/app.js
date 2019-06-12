const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

const ODCServer = require('./systems/ODCServer');

const app = ODCServer(express());

require('dotenv').config();
const port = process.env.PORT || 3030;
app.set('port', port);

app.config = require('./applications/config/default');

switch (process.env.NODE_ENV) {
    case "development":
        _.extend(app.config, require('./applications/config/development')); break;
    case "staging":
        _.extend(app.config, require('./applications/config/staging')); break;
    case "production":
        _.extend(app.config, require('./applications/config/production')); break;
}

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



require('./systems/core/channel')(app);

require('./systems/core/mongoose')(app, () => {

    require('./systems/core/middleware')(app);

    require('./systems/core/model')(app);

    require('./systems/core/controller')(app);

    require('./systems/core/router')(app);

    require('./systems/core/authenticate')(app);

    require('./systems/core/result')(app);

    require('./systems/core/error')(app);

    module.exports = app.listen(3030, () => {
        console.log("Server is running on 3030 port.");
    })
});

