import { fetchJson, parseToLod } from ".";
import * as fs from 'fs'
import { Lecture } from "twinte-parser";

main();

async function main() {
    const json: Lecture[] = await fetchJson();  
    const ttl = await parseToLod(json);
    fs.writeFileSync("kdb.ttl", ttl)
}