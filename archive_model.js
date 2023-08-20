const {readFileSync} = require("fs");

let loadMagazines = () => JSON.parse(readFileSync("archive.json"));

module.exports = {loadMagazines};