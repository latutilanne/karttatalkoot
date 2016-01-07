require("babel/register")

var context = require("./app/context")
var server = require("./app/server")

server(context)
