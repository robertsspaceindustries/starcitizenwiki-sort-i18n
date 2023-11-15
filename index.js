import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
if (!input) throw new Error("No input");
const inputPath = path.resolve(input);
if (!inputPath) throw new Error("Couldn't find input file");
if (path.extname(inputPath) !== ".json") throw new Error("Wrong file extension");

const json = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
json.data = json.data.sort(function (a, b) {
	var nameA = a[0].toUpperCase();
	var nameB = b[0].toUpperCase();
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
});

fs.writeFileSync(path.join(path.dirname(inputPath), "output.json"), JSON.stringify(json, 0, 4));
