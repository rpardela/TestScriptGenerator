/* 
   Script generated automatically from the NPM unit-test-script-generator package.

   Package version: 0.0.7
   Test framework: jest
   Tested module: libToTest
   Date of file generation: 10/22/2022, 12:28:24 PM
*/

// import "regenerator-runtime/runtime";
const libToTest = require("../libToTest");

// describeID: uvxei8dgd
describe("Tests for module: libToTest", () => {
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

  const obj_2tfvy5jy5 = { "id": 1, "name": "ala" };
  const obj_63br394v2 = { "id": 1, "name": "ala" };
  test("test function eqFunc", () => {
    expect(libToTest.eqFunc(obj_2tfvy5jy5, obj_63br394v2)).toBe(false);
  });

  const obj_9oh7vblx1 = { "id": 1, "name": "ala" };
  const obj_a6cur57z8 = { "id": 2, "name": "ela" };
  const resObject_v5u402udi = { "result": false, "name": "eqFuncObj" };
  test("test function eqFuncObj", () => {
    expect(libToTest.eqFuncObj(obj_9oh7vblx1, obj_a6cur57z8)).toEqual(resObject_v5u402udi);
  });


});// describeID[uvxei8dgd]
