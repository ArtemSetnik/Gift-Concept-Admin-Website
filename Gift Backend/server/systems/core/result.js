module.exports = function (app) {
    app.use(function (req, res, next) {
        if (res.result !== undefined) {
            return res.json({ data: res.result });
        }
        next();
    })
}