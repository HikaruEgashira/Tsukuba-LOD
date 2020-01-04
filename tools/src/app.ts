import { fetchJson, parseToLod } from '.';
import * as fs from 'fs';

main();

const prefix = `@prefix owl: <http://www.w3.org/2002/07/owl#> .
  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema> .
  @prefix cc: <http://creativecommons.org/ns#> .
  @prefix ic: <http://imi.go.jp/ns/core/rdf#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
  @prefix ud: <http://localhost:3030/univ#> .

  `;

async function main() {
  const json = await fetchJson();
  const ttl = prefix + (await parseToLod(json));
  fs.writeFileSync('kdb.ttl', ttl);
}
