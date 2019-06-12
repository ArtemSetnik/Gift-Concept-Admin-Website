
module.exports = function (routes) {
    routes.set('GET', '/aaa', {
        router: 'index/index',
        middleware: {
            before: 'test',
            after: function(req, res, next) {
                res.result = "hello";
                next();
            }
        }
    });
    routes.set('POST', '/seller/register', {
        
    })
    // routes.set('GET', '/users/test', 'users/test');
    // routes.set('GET', '/users/add_Data_id_To_post', 'users/add_Data_id_To_post');
}