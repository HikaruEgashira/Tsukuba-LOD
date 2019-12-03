const a = require('../dist/index');
const fs = require("fs");

test('make', () => {
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
    expect(app.make(lecture, 1)).toBe(lod);
})

test("divide", () => {
    const target = JSON.parse(fs.readFileSync("src/sample/kdb.json", 'utf8'));
    const res = JSON.parse(fs.readFileSync("src/sample/parsed.json", 'utf8'));
    expect(app.divide(target)).toEqual(res);
})

test("result", async () => {
    const json = JSON.parse(fs.readFileSync("src/sample/kdb.json", 'utf8'));
    const res = fs.readFileSync("src/sample/result.txt", 'utf8');
    expect(app.parseToLod(json)).toBe(res);
})