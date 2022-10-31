/* 
   Script generated automatically from the NPM unit-test-script-generator package.

   Package version: 1.0.0
   Test framework: mocha
   Tested module: libToTest
   Date of file generation: 10/31/2022, 12:26:52 PM
*/ 

// import "regenerator-runtime/runtime";
const expect = require("chai").expect;
const libToTest = require("../libToTest");

// describeID: o0w7o4zhx
describe("Tests for module: libToTest", () => {
  it("test function sumFunc", () => { 
    expect(libToTest.sumFunc(1, 3)).to.equal(4);
  });

  it("test function multiplyFunc", () => { 
    expect(libToTest.multiplyFunc(1, 3)).to.equal(3);
  });

  it("test function eqFunc", () => { 
    expect(libToTest.eqFunc(2, 3)).to.equal(false);
  });

  it("test function eqFunc", () => { 
    expect(libToTest.eqFunc(3, 3)).to.equal(true);
  });

  it("test function eqFunc", () => { 
    expect(libToTest.eqFunc("string1", "string1")).to.equal(true);
  });

  const obj_f5w9w773h = {"id":1,"name":"ala"};
  const obj_97w793et4 = {"id":1,"name":"ala"};
  it("test function eqFunc", () => { 
    expect(libToTest.eqFunc(obj_f5w9w773h, obj_97w793et4)).to.equal(false);
  });

  const obj_yax8teslb = {"id":1,"name":"ala"};
  const obj_7h9t72rde = {"id":2,"name":"ela"};
  const resObject_orhqr9ug0 = {"result":false,"name":"eqFuncObj"};
  it("test function eqFuncObj", () => { 
    expect(libToTest.eqFuncObj(obj_yax8teslb, obj_7h9t72rde)).to.deep.equal(resObject_orhqr9ug0);
  });

  const obj_xnkpo6hqb = {"id":1,"name":"ala"};
  const obj_1r7sm5iay = {"id":2,"name":"ela"};
  const obj_5vxv3d08h = {"id":1,"name":"ala"};
  const obj_tphd986wa = {"id":2,"name":"ela"};
  it("async test function resolve promiseResolveFunc", async () => {
     expect(await libToTest.promiseResolveFunc(obj_xnkpo6hqb, obj_1r7sm5iay))
    .to.equal("promiseResolveFunc");
  });

  it("async test function reject promiseRejectFunc", async () => { 
    return libToTest.promiseRejectFunc(obj_5vxv3d08h, obj_tphd986wa)
    .catch(e => expect(JSON.parse(JSON.stringify(e))).to.equal("promiseRejectFunc"));
  });


});// describeID[o0w7o4zhx]
