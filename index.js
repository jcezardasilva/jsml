const Json = require('./JsmlJson');
const fs = require('fs');
const path = require('path');

let jsonDoc = fs.readFileSync(path.resolve(__dirname, "index.json"), 'utf8');
jsonDoc = JSON.parse(jsonDoc);

var indexhtml = new Json(jsonDoc).toString();
console.log( indexhtml);
fs.writeFileSync(path.resolve(__dirname, "index.html"), indexhtml);
