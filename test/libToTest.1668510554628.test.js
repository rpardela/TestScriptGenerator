/* 
   Script generated automatically from the NPM unit-test-script-generator package.

   Package version: 1.1.0
   Test framework: mocha
   Tested module: libToTest
   ES6: True
   Date of file generation: 11/15/2022, 12:09:14 PM
*/ 

// import "regenerator-runtime/runtime";
import { expect } from "chai";
import libToTest from "../libToTest.js";

// describeID: dg11xe6h7
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

  const obj_b89bq47d6 = {"id":1,"name":"ala"};
  const obj_vhzh1bpdw = {"id":1,"name":"ala"};
  it("test function eqFunc", () => { 
    expect(libToTest.eqFunc(obj_b89bq47d6, obj_vhzh1bpdw)).to.equal(false);
  });

  const obj_bqoig3r6c = {"id":1,"name":"ala"};
  const obj_bfhejf3tg = {"id":2,"name":"ela"};
  const resObject_eb302a7fs = {"result":false,"name":"eqFuncObj"};
  it("test function eqFuncObj", () => { 
    expect(libToTest.eqFuncObj(obj_bqoig3r6c, obj_bfhejf3tg)).to.deep.equal(resObject_eb302a7fs);
  });

  const obj_atx7k4598 = {"id":1,"name":"ala"};
  const obj_ni7r56na0 = {"id":2,"name":"ela"};
  const obj_iz4rb91sm = {"id":1,"name":"ala"};
  const obj_8y5zu83tt = {"id":2,"name":"ela"};
  it("async test function resolve promiseResolveFunc", async () => {
     expect(await libToTest.promiseResolveFunc(obj_atx7k4598, obj_ni7r56na0))
    .to.equal("promiseResolveFunc");
  });

  it("async test function reject promiseRejectFunc", async () => { 
    return libToTest.promiseRejectFunc(obj_iz4rb91sm, obj_8y5zu83tt)
    .catch(e => expect(JSON.parse(JSON.stringify(e))).to.equal("promiseRejectFunc"));
  });


});// describeID[dg11xe6h7]
