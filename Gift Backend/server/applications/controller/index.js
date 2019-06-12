module.exports = function (Controller) {
	return class extends Controller {
		constructor() {
			super(...arguments);
        }

        async index() {
            return JSON.stringify(arguments);
        }
	}
}
