const Tag = require('./Tag');
const Json = require('./Json');
const fs = require('fs');
const path = require('path');

let html = new Tag("html", [{'lang':"pt-br"}]);
let head = new Tag("head")
head.appendChild(new Tag("title", [], "Titulo da pagina"));
html.appendChild(head);
html.appendChild(new Tag("body"))
console.log(html.toString());

let jsonDoc = fs.readFileSync(path.resolve(__dirname, "index.json"), 'utf8');
jsonDoc = JSON.parse(jsonDoc);

var jsonObject = new Json(jsonDoc);
var tags = jsonObject.toTag();

console.log('Json creation', tags);
console.log('Json creation', tags[0].toString());
console.log('Json creation', tags[1].toString());