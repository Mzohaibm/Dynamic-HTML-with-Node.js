const http = require("http");
const fs = require("fs");
const { performance } = require('perf_hooks');

const start = performance.now();
const server = http.createServer((req, res) => {
    console.log("Server started");
    console.log(req.url);
    switch (req.url) {
        case "/":
            res.setHeader("Content-Type", "text/html");
            res.setHeader("hey", "hello");
            fs.readFile("./index.html", "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("Error loading HTML");
                } else {
                    res.end(data);
                }
            });
            break;
        case "/api":
            res.setHeader("Content-Type", "application/json");
            res.setHeader("hey", "hey");
            fs.readFile("./data.json", "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("Error loading JSON data");
                } else {
                    res.end(data);
                }
            });
            break;
        default:
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 404;
            res.end("Not Found");
    }
});

const port = 5000;
server.listen(port, () => {
    const end = performance.now();
    const elapsedTime = (end - start).toFixed(2);
    console.log(`Server listening on port ${port}`);
    console.log(`Server started in ${elapsedTime} ms`);
});
