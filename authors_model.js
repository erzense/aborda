const {readFileSync} = require("fs");

let loadAuthors = () => JSON.parse(readFileSync("authors.json"));

module.exports = {loadAuthors};