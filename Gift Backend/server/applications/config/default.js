module.exports = {
	authentication: {
		active: true,
		name: 'email',
		password: 'password',
		model: 'users',
		activated: 'activated',
		loginStatus: 'loginStatus',
	},
	router: {
		override: false, // only allow routes in router file.
	}
}