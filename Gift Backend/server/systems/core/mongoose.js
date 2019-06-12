const mongoose = require('mongoose'),
	fs = require('fs');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = function (app, callback) {
	var DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
	mongoose.Promise = global.Promise;
	// mongoose.set('debug', true);
	app.set('mongooseClient', mongoose);

	app.mongoose = mongoose.createConnection(DB_URL, { useNewUrlParser: true }, function (error) {
		if(error) {
			console.log(error);
			return;
		}
		// Generate mongoose models
		require('rootpath')();
		var mongooseClient = app.get('mongooseClient'),
			{ Schema } = mongooseClient,
			filenames = fs.readdirSync('server/applications/mongoose');

		filenames.forEach(name => {
			var info = require('../../applications/mongoose/' + name);
			var schema = new Schema(info.Schema, info.options);
			schema.plugin(uniqueValidator);
			if (info.callback) info.callback(schema);
			var documentName = info.documentName || name.slice(0, -3);
			var model = mongooseClient.model(documentName, schema);
			// if (info.initialized) info.initialized(model);
		});
		console.log(`Mongoose connected successfully to ${DB_URL}`);

		callback();
	});
}