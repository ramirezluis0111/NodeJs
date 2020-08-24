//kill -9 $(lsof -i tcp:7005 | grep "node" | cut -d" " -f5,5)

var http = require ('http')
const {read} = require('fs')
var count = 0
var users = []

function buildHtml(dict) {
    var header = "<tr><th>User</th><th>Visits</th></tr>"
    var body = ""

    for (let index = 0; index < dict.length; index++) {
        var body = body + `<tr><td>${dict[index].name}</td><td>${dict[index].visits}</td></tr>`
    }
  
    return '<table>' + header + body + '</table>'
  }

function searchUser(dict, usr) {
    var index = 0
    var find = false
    while (dict.length > index && !find) {
        if (dict[index].name.includes(usr)) {
            find = true
        } else {
            index++
        }
    }
    return find
}

function indexUser(dict, usr) {
    var index = 0
    var find = false
    while (dict.length > index && !find) {
        if (dict[index].name.includes(usr)) {
            find = true
        } else {
            index++
        }
    }
    return index
}

//Esta funcion recibe 2 parametros, Req pedido, res respuesta.
function peticion(req, res) {
    if (req.url == "/contar") {
        count++
        res.end("Sume correctamente")
    } else if (req.url == "/cons") {
        res.end("Hola sos el visitante: " + count) // interpreta lenguaje html
    } else if (req.url == "/listar") {
        res.end(buildHtml(users))//)
        // res.end("<tr><td>Jill</td><td>Smith</td></tr>")
    } else {
        res.end("Welcome: " + req.url)
        if (req.url != "/favicon.ico") {
            if (!searchUser(users, req.url)) {
                users.push({
                    name: `${req.url}`,
                    visits: 1
                });
            } else {
                users[indexUser(users, req.url)].visits++
            }
            console.log(users)
        }
    }
}

var server = http.createServer(peticion)

server.listen(8000)