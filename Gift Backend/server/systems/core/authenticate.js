const md5 = require('md5');

// class Authentication {
// 	constructor(app) {
// 		app.Auth = this;
// 		this.config = app.config.authentication;
// 		this.model = app.mongoose.model(this.config.model);
// 		if (!this.model) {
// 			throw new Error(`${this.config.model} model doesn't exist`);
// 		}
// 	}

// 	login(req, res, next) {
// 		var where = {};
// 		const { in_name, in_password } = this.getCredentialFromRequest(req);

// 		if (!in_name) return next({ status: 501, message: `Input the ${this.config.name}.` });
// 		if (!in_password) return next({ status: 502, message: `Innput the ${this.config.password}.` });
	
// 		where[this.config.name] = in_name;
		
// 		return this.model.findOne(where)
// 			.then(user => {	
// 				if (user == null) return next({ status: 503, message: "Invalid User." });
// 				if (user[this.config.password] != in_password) return next({ status: 504, message: 'Incorrect Password.' });

// 				req.session.user = user;
// 				res.result = this.protectFields(user);
// 				this.createSession(req);
// 				this.setAccessToken(req, res);
// 				next();
// 			})
// 			.catch(error => { next(error); })
// 	}

// 	logout(req, res, next) {
// 		req.session.destroy(function (err) {
// 			// will have a new session here
// 			next();
// 		})
// 	}

// 	jwt(req, res, next) {
// 		if (!this.validAccessToken(req)) {
// 			return next({ status: 401, message: 'Invalid Authentication.' });
// 		}
// 		this.updateSession(req);
// 		this.setAccessToken(req, res);
// 		res.send(true);
// 	}

// 	removeJWT(req) {
// 		req.session.confirmView = req.session.view;
// 	}

// 	createAccessToken(req) {
// 		var accessToken = req.sessionID + req.session.viewTime + '-Shadow-' + req.session.view;
// 		return md5(accessToken);
// 	}

// 	createSession(req) {
// 		req.session.viewTime = Date.now();
// 		req.session.view = 0;
// 		req.session.confirmView = 0;
// 	}

// 	updateSession(req) {
// 		req.session.viewTime = Date.now();
// 		req.session.view++;
// 	}

// 	setAccessToken(req, res) {
// 		res.cookie('accessToken', this.createAccessToken(req));
// 	}

// 	getCredentialFromRequest(req){
// 		var { method, body, query } = req,
// 			credential = {};
// 		if ( method.toUpperCase() === 'GET' ) credential = query;
// 		else if ( method.toUpperCase() === 'GET' ) credential = body;
// 		else credential = body;

// 		return {
// 			in_name: credential[this.config.name],
// 			in_password: md5(credential[this.config.password])
// 		}

// 		var name = '',
// 			password = md5(req)

// 	}

// 	validAccessToken(req) {
// 		var accessToken = this.createAccessToken(req);
// 		console.log('Session ID:', req.sessionID);
// 		return accessToken === req.cookies.accessToken;
// 	}

// 	authenticate(req, res, next){
//         if (!this.validAccessToken(req)) return next({ status: 505, message: 'Invalid Access.' });
//         next();
// 	}

// 	protectFields(protectedMe){
// 		if ( protectedMe._doc ) delete protectedMe._doc[this.config.password];
// 		else delete protectedMe[this.config.password];
//         return protectedMe;
// 	}

// 	verifyAccessToken(req, res, next){
// 		if (!this.validAccessToken(req)) return next({ status: 505, message: 'Invalid Access.' });
// 		res.result = req.session.user;
// 		next();
//     }
// }

module.exports = function (app) {
	// if(!app.config.authentication.active) return;
	// const prefix_url = app.config.prefix_url || "";

	// const Auth = new Authentication(app),
	// 	Auth_Hooks = require('../../applications/authenticate.hooks');

	// app.all(prefix_url + '/authenticate', 
	// 	Auth_Hooks.before,
	// 	function (req, res, next) { Auth.login(req, res, next); },
	// 	Auth_Hooks.after);

	// app.use(prefix_url + '/authenticate', Auth_Hooks.error);

	// // app.all(prefix_url + '/authenticate', function(req, res, next){ Auth.authenticate(req, res, next); });
	// app.all(prefix_url + '/jwt', function (req, res, next) { Auth.jwt(req, res, next); })
	// app.all(prefix_url + '/verifyAccessToken', function(req, res, next){ Auth.verifyAccessToken(req, res, next); });
	// app.post(prefix_url + '/logout', function (req, res, next) { Auth.logout(req, res, next); })

    // app.use(function (req, res, next) {
    //     app.Auth.removeJWT(req);
    //     next();
    // })
}
