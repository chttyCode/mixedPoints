const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
let server = http.createServer(function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:9999'
    });
    proxy.on('error', function (err) {
        console.log(err);
    });
});
server.listen(8888, '0.0.0.0');