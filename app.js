//import testProvider from "./testProvider/testProvider.mjs";
const libToTest = require('./libtoTest.js');
const testProvider = require('./testScriptGenerator/testScriptGenerator')

const testP = new testProvider.TestScriptGenerator(true, 'libToTest');
testP.generateTestForFunc(libToTest.sumFunc, 1, 3);
testP.generateTestForFunc(libToTest.multiplyFunc, 1, 3);
testP.generateTestForFunc(libToTest.eqFunc, 2, 3);
testP.generateTestForFunc(libToTest.eqFunc, 3, 3);
testP.generateTestForFunc(libToTest.eqFunc, "string1", "string1");
testP.generateTestForFunc(libToTest.eqFunc, { id: 1, name: "ala" }, { id: 1, name: "ala" });
testP.generateTestForFunc(libToTest.eqFuncObj, { id: 1, name: "ala" }, { id: 2, name: "ela" });
