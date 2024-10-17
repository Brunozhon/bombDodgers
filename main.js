const http = require("http")
const fs = require("fs")
const url = require("url")

http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.statusCode = 200
    
    var path = url.parse(req.url, true).pathname
    if (path == "/") path = "/index.html"

    fs.readFile("." + path, (err, data) => {
        if (err) {
            res.writeHead(404, {"Content-Type": "text/html"})
            return res.end("404 Not Found")
        }

        if (path.endsWith(".js")) {
            res.writeHead(200, {"Content-Type": "application/javascript"})
        } else if (path.endsWith(".png")) {
            res.writeHead(200, {"Content-Type": "image/png"})
        } else {
            res.writeHead(200, {"Content-Type": "text/html"})
        }

        console.log("Handled request to " + path)

        res.write(data)
        return res.end()
    })
}).listen(8080)