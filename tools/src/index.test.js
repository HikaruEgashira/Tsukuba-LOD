const app = require('.');
const fs = require("fs");

test.skip('make', () => {
    const lecture = {
        "lectureID": "GB41911",
        "name": "知識処理概論",
        "module": "春A",
        "period": 4,
        "day": "火",
        "room": "3A306",
        "instructor": "狩野 均"
    }
    const lod = fs.readFileSync("src/sample/make.txt", 'utf8');
    expect(app.make(lecture, 1)).toMatch(lod);
})

test.skip("divide", () => {
    const target = JSON.parse(fs.readFileSync("src/sample/kdb.json", 'utf8'));
    const res = JSON.parse(fs.readFileSync("src/sample/parsed.json", 'utf8'));
    expect(app.divide(target)).toEqual(res);
})

test("result", () => {
    const res = fs.readFileSync("src/sample/result.txt", 'utf8');
    expect(app.parceToLod("src/sample/kdb.json")).toMatch(res);
})