/* 
   Script generated automatically from the NPM unit-test-script-generator package.

   Package version: 1.1.0
   Test framework: jest
   Tested module: libToTest
   ES6: True
   Date of file generation: 11/15/2022, 12:06:49 PM
*/ 

// import "regenerator-runtime/runtime";
import libToTest from "../libToTest.js";

// describeID: r5g245np7
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

  const obj_0fwr05acy = {"id":1,"name":"ala"};
  const obj_o5br3gd8y = {"id":1,"name":"ala"};
  test("test function eqFunc", () => { 
    expect(libToTest.eqFunc(obj_0fwr05acy, obj_o5br3gd8y)).toBe(false);
  });

  const obj_acf69da31 = {"id":1,"name":"ala"};
  const obj_y1oyjcttf = {"id":2,"name":"ela"};
  const resObject_b1tjhcg46 = {"result":false,"name":"eqFuncObj"};
  test("test function eqFuncObj", () => { 
    expect(libToTest.eqFuncObj(obj_acf69da31, obj_y1oyjcttf)).toEqual(resObject_b1tjhcg46);
  });

  const obj_i5aercmgx = {"id":1,"name":"ala"};
  const obj_wkzdscv1x = {"id":2,"name":"ela"};
  const obj_7o9vye2u3 = {"id":1,"name":"ala"};
  const obj_2ish6ciq4 = {"id":2,"name":"ela"};
  test("async test function resolve promiseResolveFunc", async () => {
     await expect(libToTest.promiseResolveFunc(obj_i5aercmgx, obj_wkzdscv1x))
    .resolves.toBe("promiseResolveFunc");
  });

  test("async test function reject promiseRejectFunc", async () => { 
    expect.assertions(1); 
    return libToTest.promiseRejectFunc(obj_7o9vye2u3, obj_2ish6ciq4)
    .catch(e => expect(JSON.parse(JSON.stringify(e))).toBe("promiseRejectFunc"));
  });


});// describeID[r5g245np7]
