/* 
   Script generated automatically from the NPM unit-test-script-generator package.

   Package version: 1.0.0
   Test framework: jest
   Tested module: libToTest
   Date of file generation: 10/31/2022, 11:56:39 AM
*/ 

// import "regenerator-runtime/runtime";
const libToTest = require("../libToTest");

// describeID: gc9vad6gw
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

  const obj_lqa57528n = {"id":1,"name":"ala"};
  const obj_3nlgmf8o8 = {"id":1,"name":"ala"};
  test("test function eqFunc", () => { 
    expect(libToTest.eqFunc(obj_lqa57528n, obj_3nlgmf8o8)).toBe(false);
  });

  const obj_dczqk7p0k = {"id":1,"name":"ala"};
  const obj_ogorda28p = {"id":2,"name":"ela"};
  const resObject_rwhbdckmr = {"result":false,"name":"eqFuncObj"};
  test("test function eqFuncObj", () => { 
    expect(libToTest.eqFuncObj(obj_dczqk7p0k, obj_ogorda28p)).toEqual(resObject_rwhbdckmr);
  });

  const obj_dhncv82um = {"id":1,"name":"ala"};
  const obj_9fj7u95a4 = {"id":2,"name":"ela"};
  const obj_mfkyr4vp1 = {"id":1,"name":"ala"};
  const obj_l3bh247ff = {"id":2,"name":"ela"};
  test("async test function resolve promiseResolveFunc", async () => {
     await expect(libToTest.promiseResolveFunc(obj_dhncv82um, obj_9fj7u95a4))
    .resolves.toBe("promiseResolveFunc");
  });

  test("async test function reject promiseRejectFunc", async () => { 
    expect.assertions(1); 
    return libToTest.promiseRejectFunc(obj_mfkyr4vp1, obj_l3bh247ff)
    .catch(e => expect(JSON.parse(JSON.stringify(e))).toBe("promiseRejectFunc"));
  });


});// describeID[gc9vad6gw]
