import { downloadKDB, parseKDB, Lecture } from "twinte-parser";
import { ParsedLecture, ttl } from "./type";
import * as fs from 'fs'

/**
 * kdb.json
 */
async function fetchJson(): Promise<Lecture[]> {
    const csv = await downloadKDB(2019);
    const json = parseKDB(csv);
    fs.writeFileSync("kdb.json", JSON.stringify(json));
    return json;
}

/**
 * kdb.json
 * ↓
 * parse.json
 * @param obj
 */
function divide(obj: Lecture): ParsedLecture[] {
    const res: ParsedLecture[] = [];
    for (let i = 0; i < obj.details.length; i++) {
        const target = {
            lectureID: obj.lectureID,
            name: obj.name,
            instructor: obj.instructor,
            module: obj.details[i].module,
            day: obj.details[i].day,
            period: obj.details[i].period,
            room: obj.details[i].room
        };
        res.push(target)
    }
    return res;
}

/**
 * turtle形式に変換
 * parse.json
 * ↓
 * result.json
 * @param obj
 */
function make(lecture: ParsedLecture, id: number): ttl {
    const prefixs = ["ic:ID型", "ic:名称", "ud:担当者", "ud:期間", "ud:曜日", "ud:時限", "ic:開催場所"];
    const array = [`_:${id} a ud:授業型`];
    let i = 0;
    for (let k in lecture) {
        array.push(`${prefixs[i]} "${lecture[k]}"`);
        if (prefixs[i] === "ic:名称") {
            array.push(`rdfs:label "${lecture[k]}"`);
        }
        i++;
    }
    return array.join(" ;\n\t") + " .";
}

/**
 * kdb.json
 * ↓
 * result.json
 * @param file
 */
async function parseToLod(jsonObject: Lecture[]) {
    const parsedArray = await Promise.all(jsonObject
        .filter(o => o.lectureID.split('')[0] !== "0")
        .reduce((prev, obj) => {
            return [...prev, ...divide(obj)];
        }, []));
    const lod = await Promise.all(parsedArray.map(function (parsed, i) {
        return make(parsed, i);
    }));
    return lod.join("\n");
}

export { fetchJson, parseToLod };

/**

interface Lecture {
  lectureID: string
  name: string
  details: {
    module: Module
    day: Day
    period: number
    room: string
  }[]
  instructor: string
}

 */