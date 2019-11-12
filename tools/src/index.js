const parcer = require("twinte-parser");
const fs = require('fs');

/**
 * kdb.json
 */
async function fetchJson() {
    const csv = await parcer.downloadKDB(2019);
    const json = await parcer.parseKDB(csv);
    fs.writeFileSync("kdb.json", JSON.stringify(json));
}

/**
 * kdb.json
 * ↓
 * result.json
 * @param file
 */
async function parceToLod(file = "./kdb.json") {
    const jsonObject = JSON.parse(fs.readFileSync(file, 'utf8'));
    const parsedArray = [];
    const lod = [];
    for (let i = 0; i < jsonObject.length; i++) {
        parsedArray.push(divide(jsonObject[i]));
    }
    for (let i = 0; i < parsedArray.length; i++) {
        lod.push(make(parsedArray[i], i));
    }
    fs.writeFileSync("kdb.ttl", lod.join("\n"));
}

/**
 * kdb.json
 * ↓
 * parse.json
 * @param obj
 */
function divide(obj) {
    const res = [];
    for (let i = 0; i < obj.details.length; i++) {
        const target = {
            lectureID: obj.lectureID,
            name: obj.name,
            instructor: obj.instructor
        };
        Object.assign(target, obj.details[i]);
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
function make(lecture, id) {
    const prefixs = ["ic:ID型", "ic:名称", "ud:期間", "ud:曜日", "ud:時限", "ic:開催場所", "ud:担当者"];
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

module.exports = { divide, fetchJson, make, parceToLod };

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