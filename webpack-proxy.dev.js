var url = require('url');
var proxy = require('proxy-middleware');

var baseUri = "http://localhost:9000";

var proxyRoutes = [
    '/projects',
    '/cities',
    '/upload'
];

var proxies = proxyRoutes.map(function (r) {
    var options = url.parse(baseUri + r);
    options.route = r;
    options.preserveHost = true;
    return proxy(options);
});

module.exports = proxies;