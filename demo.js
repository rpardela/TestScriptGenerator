const libToTest = require('./libtoTest.js');
const testGenerator = require('unit-test-script-generator');// or index.js for development

console.log('START DEMO');
const tg = new testGenerator.TestScriptGenerator(true, 'libToTest');
tg.generateTestForFunc(libToTest.sumFunc, 1, 3);
tg.generateTestForFunc(libToTest.multiplyFunc, 1, 3);
tg.generateTestForFunc(libToTest.eqFunc, 2, 3);
tg.generateTestForFunc(libToTest.eqFunc, 3, 3);
tg.generateTestForFunc(libToTest.eqFunc, "string1", "string1");
tg.generateTestForFunc(libToTest.eqFunc, { id: 1, name: "ala" }, { id: 1, name: "ala" });
tg.generateTestForFunc(libToTest.eqFuncObj, { id: 1, name: "ala" }, { id: 2, name: "ela" });
console.log('FINISH DEMO');