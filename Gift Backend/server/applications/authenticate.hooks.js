module.exports = {
    async before (req, res, next) {
        // Type here
        // ...
        next();
    },
    async after (req, res, next) {
        // Type here
        // ...
        delete res.result.pwd;
        next();
    },
    async error (error, req, res, next) {
        // Type here
        // ...
        next(error);
    }
}