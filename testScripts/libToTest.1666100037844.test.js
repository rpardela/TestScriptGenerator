// import "regenerator-runtime/runtime";
const libToTest = require("../libToTest");

test("test function sumFunc", () => {
    expect(libToTest.sumFunc(1, 3)).toBe(4);
});

test("test function multiplyFunc", () => {
    expect(libToTest.multiplyFunc(1, 3)).toBe(3);
});

test("test function eqFunc", () => {
    expect(libToTest.eqFunc(2, 3)).toBe(false);
});

test("test function eqFunc", () => {
    expect(libToTest.eqFunc(3, 3)).toBe(true);
});

test("test function eqFunc", () => {
    expect(libToTest.eqFunc("string1", "string1")).toBe(true);
});

const obj_26q26cdy6 = { "id": 1, "name": "ala" };
const obj_2656ydu9q = { "id": 1, "name": "ala" };
test("test function eqFunc", () => {
    expect(libToTest.eqFunc(obj_26q26cdy6, obj_2656ydu9q)).toBe(false);
});

const obj_qfoc1fhz2 = { "id": 1, "name": "ala" };
const obj_69wogani9 = { "id": 2, "name": "ela" };
const resObject_ae3pdah5p = { "result": false, "name": "eqFuncObj" };
test("test function eqFuncObj", () => {
    expect(libToTest.eqFuncObj(obj_qfoc1fhz2, obj_69wogani9)).toEqual(resObject_ae3pdah5p);
});

