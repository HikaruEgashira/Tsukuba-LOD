import { fetchJson, parseToLod } from ".";
import * as fs from "fs";
import { Lecture } from "twinte-parser";

main();

const prefix =
  "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema> .\n@prefix cc: <http://creativecommons.org/ns#> .\n@prefix ic: <http://imi.go.jp/ns/core/rdf#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix ud: <http://localhost:3030/univ#> .\n\n";

async function main() {
  const json: Lecture[] = await fetchJson();
  const ttl = prefix + (await parseToLod(json));
  fs.writeFileSync("kdb.ttl", ttl);
}
