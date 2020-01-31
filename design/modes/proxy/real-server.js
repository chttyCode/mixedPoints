const http = require('http');
let server = http.createServer(function (req, res) {
    res.end('9999');
});
server.listen(9999, '0.0.0.0');