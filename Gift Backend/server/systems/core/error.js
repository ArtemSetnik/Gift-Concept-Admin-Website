module.exports = function (app) {
    app.use(function (error, req, res, next) {
        if (error.code) {
            return res.json({ error });
        }
        console.log(error.status, 'error_status');
        console.log(error);

        res.status(error.status || 500);
        if (error.status === 200) {
            return res.json({data: res.data});
        }
        if (error.status) {
            return res.json(error.message);
        }
        
        if (process.env.NODE_ENV === "production") {
            console.error(error);
            res.end();
        } else {
            res.send(error);
        }
    })
}