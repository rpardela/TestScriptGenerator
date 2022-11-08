# Description

Performing unit tests of your code is very important. At the same time, creating unit test scripts is quite tedious and there is usually not enough time for it.

This test script generator allows you to automatically generate files containing unit test scripts using minimal effort.

You can insert the generator configuration at the place of the actual function calls you want to test. The generator will use the real values as test parameters and match the unit tests to their type.

You can also use this generator to mock unit tests.

Currently, only the "is" and "mocha" (with "chai") frameworks are supported.

# <br> Prerequisites

This library generates unit test scripts. These scripts will be used when running unit tests in your project.
Remember to install and configure your favorite testing framework ("jest" or "mocha & chai") in your enviroment.

# <br>Installation

`npm -i "unit-test-script-generator"`

# <br>Usage

Create a new generator file (similar to the demo.js file presented in the following section), and then edit this file according to the list below.<br>

1. Import the library:<br>
   `const testGenerator = require('unit-test-script-generator')`

2. Initialize the generator:<br>
   `const tg = new testGenerator.TestScriptGenerator(true, 'libToTest');`<br>

   **parameters:** <br>
   _generateFiles_ - false if the result file should not be generated. Sometimes you may not want to generate test scripts for certain libraries. Instead of removing them from the generator file, maybe set this parameter to false.<br>
   _moduleName_ - module where are located tested functions<br>
   <br>**config** - You can specify an optional configuration as the third parameter of the call:<br>
   _testScriptPath_ - path to the folder where the test scripts will be saved<br>
   _modulePath_ - path to the location where the module whose functions you will test is located<br>
   _testFramework_ - framework that supports unit tests (currently 'jest' and 'mocha', for 'mocha' you should also have chai installed).<br>
   <br>Optional configuration example:<br> `const tg = new testGenerator.TestScriptGenerator(true, 'libToTest', {testFramework: 'mocha', testScriptPath: './test/', modulePath: '../core/'});`
   <br><br>
   You can simultaneously initialize multiple generators for different libraries, for example:

   ```
   const tg = new testGenerator.TestScriptGenerator(true, 'libToTest');
   const tg2 = new testGenerator.TestScriptGenerator(true, 'libToTest2');
   const tg3 = new testGenerator.TestScriptGenerator(true, 'libToTest3');

   tg.generateTestForFunc(libToTest.sumFunc, 1, 3);
   tg2.generateTestForFunc(libToTest.multiplyFunc, 1, 3);
   tg3.generateTestForFunc(libToTest.eqFunc, 2, 3);
   ```

   The above code will create 3 unit test files (as long as you have libraries: libToTest, libToTest2, libToTest3).

      <br>

3. Call the function for which you want to generate a unit test: <br>
   example typical function call <br>
   `libToTest.sumFunc(1, 3)` <br>
   replace with <br>
   `tg.generateTestForFunc(libToTest.sumFunc, 1, 3);`

   Functions for asynchronous calls have also been prepared:<br>
   `generateTestForFuncAsyncResolve` - for calls that terminate without error<br>
   `generateTestForFuncAsyncReject` - for calls that end with an error

   example call: <br>
   `await tg.generateTestForFuncAsyncResolve(libToTest.sumFunc, 1, 3);`

   Important: The functions that generate scripts (generateTestForFunc + Async) always return values like the original (tested) functions. This allows you to permanently define script generation, and if you don't need to generate scripts then set the 'generateFiles' parameter to **false**

4. Run js file with test generator<br>
   `node demo.js`

   After running, you will get a new ....test.js file in the _testScriptPath_ directory

# <br>Example

The _demo.js_ file contains a sample call to the script generator that runs on the _libToTest.js_ test library.

After running _demo.js_, a ./testScripts/libtotest.<timestamp>.test.js file will be generated

Now you can run unit tests with the "jest" command.

<br>**demo.js**

```
const testGenerator = require('unit-test-script-generator');
const libToTest = require('./libtoTest.js');

console.log('START DEMO');
const tg = new testGenerator.TestScriptGenerator(true, 'libToTest', { testFramework: 'mocha', testScriptsPath: './test/' }); // mocha&chai script
//const tg = new testGenerator.TestScriptGenerator(true, 'libToTest'); // jest script
tg.generateTestForFunc(libToTest.sumFunc, 1, 3);
tg.generateTestForFunc(libToTest.multiplyFunc, 1, 3);
tg.generateTestForFunc(libToTest.eqFunc, 2, 3);
tg.generateTestForFunc(libToTest.eqFunc, 3, 3);
tg.generateTestForFunc(libToTest.eqFunc, "string1", "string1");
tg.generateTestForFunc(libToTest.eqFunc, { id: 1, name: "ala" }, { id: 1, name: "ala" });
tg.generateTestForFunc(libToTest.eqFuncObj, { id: 1, name: "ala" }, { id: 2, name: "ela" });
tg.generateTestForFuncAsyncResolve(libToTest.promiseResolveFunc, { id: 1, name: "ala" }, { id: 2, name: "ela" });
tg.generateTestForFuncAsyncReject(libToTest.promiseRejectFunc, { id: 1, name: "ala" }, { id: 2, name: "ela" });
console.log('FINISH DEMO');
```

<br>**libToTest.js**

```
const sumFunc = (a, b) => {
    return a + b;
}

const multiplyFunc = (a, b) => {
    return a * b;
}

const eqFunc = (a, b) => {
    return a === b;
}

const eqFuncObj = (a, b) => {
    return { result: a === b, name: 'eqFuncObj' };
}

const promiseResolveFunc = (a, b) => {
    return new Promise((resolve, reject) => {
        resolve('promiseResolveFunc')
    })
}

const promiseRejectFunc = (a, b) => {
    return new Promise((resolve, reject) => {
        reject('promiseRejectFunc')
    })
}

module.exports = {
    sumFunc,
    multiplyFunc,
    eqFunc,
    eqFuncObj,
    promiseResolveFunc,
    promiseRejectFunc
}
```

<br>**Result (generated script) for JEST framework**

```
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
```

# <br>Problems

This is the early version of the project and although it has been tested you are likely to encounter problems. <br>
Let me know if you encounter any problems other than those described below or have ideas for changes to the module (<a href="mailto:testscriptgenerator@gmail.com">testscriptgenerator@</a>).

Some of them are described here:

1. Sometimes you need to bind a function to a module e.g:

```
   const funcToCall = libToTest.sumFunc;
   const funcBinded = funcToCall.bind(libToTest);
   await tg.generateTestForFunc(funcBinded, 1, 3);
```

2. Sometimes you will have to make changes to your test scripts and supplement them with initialization of the libraries you use, for example. For example, if the library "yourLib" requires the init function to be called before running other functions, you will need to take care of this in your test scripts (check how to perform this correctly in your favorite testing framework).<br>
   `yourLib.init();` <br>

   and now test scripts <br>
   `test("test function sumFunc", () => { expect(yourLib.sumFunc(1, 3)).toBe(4); });`

3. In functions that generate test cases (e.g. generateTestForFunc) do not pass cyclic object values in the parameters. The objects must be serializable by JSON.stringify

4. In case of problems, you can always manually modify the generated test scenarios. You can use them just as a template.

5. Make sure that the framework 'jest' looking for test scripts in the ./testScripts folder (or any other folder you set in the configuration)
