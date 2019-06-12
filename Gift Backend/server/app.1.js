const express = require('express')

// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const favicon = require('serve-favicon')
const path = require('path')
const $ = require('./systems/library/jquery')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

require('dotenv').config();
const port = process.env.PORT || 3030;
const host = process.env.HOST || "127.0.0.1";
app.set('port', port);
app.set('host', host);

app.config = require('./applications/config/default');

switch (process.env.NODE_ENV) {
	case "development":
		$.extend(true, app.config, require('./applications/config/development')); break;
	case "staging":
		$.extend(true, app.config, require('./applications/config/staging')); break;
	case "production":
		$.extend(true, app.config, require('./applications/config/production')); break;
}

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../public')));


app.use(bodyParser.json())

app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());

app.use(passport.session());

let users = [
    {
        id: 1,
        name: "Jude",
        email: "user@email.com",
        password: "password"
    },
    {
        id: 2,
        name: "Emma",
        email: "emma@email.com",
        password: "password2"
    }
]

// app.post("/api/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return next(err);
//         }

//         if (!user) {
//             return res.status(400).send([user, "Cannot log in", info]);
//         }

//         req.login(user, err => {
//             res.send("Logged in");
//         });
//     })(req, res, next);
// });

// app.get("/api/logout", function (req, res) {
//     req.logout();

//     console.log("logged out")

//     return res.send();
// });

// const authMiddleware = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         res.status(401).send('You are not authenticated')
//     } else {
//         return next()
//     }
// }

// app.get("/api/user", authMiddleware, (req, res) => {
//     console.log(req.session);
//     let user = users.find(user => {
//         return user.id === req.session.passport.user
//     })
//     res.send({ user: user })
// })

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },

        (username, password, done) => {
            console.log({username, password});
            let user = users.find((user) => {
                return user.email === username && user.password === password
            })

            if (user) {
                done(null, user)
            } else {
                done(null, false, { message: 'Incorrect username or password' })
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    let user = users.find((user) => {
        return user.id === id
    })

    done(null, user)
})

require('./systems/core/mongoose')(app);

require('./systems/core/middleware')(app);

require('./systems/core/model')(app);

require('./systems/core/controller')(app);

require('./systems/core/router')(app);

require('./systems/core/authenticate')(app);

require('./systems/core/result')(app);

require('./systems/core/error')(app);

module.exports = app.listen(3030, () => {
    console.log("Example app listening on port 3000")
})
