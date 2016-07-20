var express = require('express')

var app = express()

app.get('/', function(req, res){
    res.send('Go to /api/whoami to get some basic info')
})

app.get('/api/whoami', function(req, res){
    var headers = Object.keys(req.headers)
    if (headers.indexOf("x-forwarded-for")===-1 | headers.indexOf("accept-language")===-1 | headers.indexOf("user-agent")===-1) {
        req.end('<h3> Header parser failed, displaying request headers: </h3> <p>' + JSON.stringify(req.headers) + '</p>')
        return
    }
    var ip = req.headers["x-forwarded-for"],
        language = req.headers["accept-language"],
        software = req.headers["user-agent"]
        
    var output = {}
    output["ipaddress"] = ip
    output["language"] = language
    output["software"] = software
    
    res.send(output)
})

app.listen(8080)