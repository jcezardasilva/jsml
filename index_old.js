const fs = require('fs');
const path = require('path');
require('./htmlFactory')

const OPENTAGS = ["!DOCTYPE", "img", "br", "hr"];

let jsonDoc = fs.readFileSync(path.resolve(__dirname, "index.json"), 'utf8');
jsonDoc = JSON.parse(jsonDoc);

/**
 * cria o elemento HTML
 * @param {*} name 
 * @param {*} children 
 * @param {*} options 
 */
function create(name, children = [], options = []) {
    if (OPENTAGS.indexOf(name) > -1) {
        return `<${name} ${options.join(" ")}>`;
    } else {
        return `<${name} ${options.join(" ")}>${children.join("")}</${name}>`;
    }
}

/**
 * converte os atributos do elemento para uma lista de string
 * @param {*} list 
 */
function convertAttributes(list) {
    let attributes = [];
    for (const attribute of list) {
        for (const key in attribute) {
            if (attribute[key] !== "") {
                attributes.push(`${key}="${attribute[key]}"`);
            } else {
                attributes.push(key);
            }
        }
    }
    return attributes;
}

let html = "";

for (const field in jsonDoc) {
    let children = [];
    let options = [];
    for (const subfield in jsonDoc[field]) {
        if (Array.isArray(jsonDoc[field][subfield])) {
            let obj = convertAttributes(jsonDoc[field][subfield]);
            options.push(obj);
        } else {
            children.push(create(subfield));
        }
    }
    html = html + create(field, children, options);
}
fs.writeFileSync(path.resolve(__dirname, "index.html"), html);
console.log(html);

module.exports ={create, convertAttributes}