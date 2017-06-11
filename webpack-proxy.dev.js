/**
 * Webpack proxy for redirect all ajax request.
 * 
 * @author Philippe Wronski <philippe.wronski@gmail.com
 */

var url = require('url');
var proxy = require('proxy-middleware');

// Redirect Url.
var baseUri = "http://localhost:9000";

// Routes to redirect.
var proxyRoutes = [
    '/route_1',
    '/route_2'
];

// Create a proxy function by route.
var proxies = proxyRoutes.map(function (r) {
    var options = url.parse(baseUri + r);
    options.route = r;
    options.preserveHost = true;
    return proxy(options);
});

module.exports = proxies;