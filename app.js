const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log('Server created');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    switch (req.url) {
        case '/':
            res.write('<h1>Hello World!</h1>');
            break;
        case '/about':
            res.write('<h1>This is the about page</h1>');
            break;
        case '/contact':
            res.write('<h1>This is the contact page</h1>');
            break;
        default:
            res.statusCode = 404;
            res.write('<h1>404 page not found</h1>');
            break;
    }

    res.end();
});

server.listen(port, (error) => {
    error ? console.log(error) : console.log('Server is listening on port ' + port);
});