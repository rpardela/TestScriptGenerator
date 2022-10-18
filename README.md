# Description:

Test script generator allows you to generate files containing unit test scripts.
Currently, only the "jest" framework is supported.

# Installation:

`npm -i "unit-test-script-generator"`

# Usage:

1. Import the library:<br>
   `const testGenerator = require('./index.js')`

2. Initialize the generator:<br>
   `const tg = new testGenerator.TestScriptGenerator(true, 'libToTest');`<br>

   **parameters:** <br>
   _generateFiles_ - false if the result file should not be generated.<br>
   _moduleName_ - module where are located tested functions<br>
   _options_ - You can specify an optional configuration as the third parameter of the call:
   _testScriptPath_ - path to the folder where the test scripts will be saved<br>
   _modulePath_ - path to the location where the module whose functions you will test is located<br>
   _testFramework_ - framework that supports unit tests (currently only 'jest')<br>
   e.g.: `const tg = new testGenerator.TestScriptGenerator(true, 'libToTest', {testScriptPath: './testScripts/', modulePath: '../core/'});`

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

   The functions that generate scripts (generateTestForFunc + Async) always return values like the original functions (tested). This allows you to permanently define script generation, and if you don't need scripts then set the 'generateFiles' parameter to **false**

4. Run js file with test generator<br>
   `node demo.js`

   After running, you will get a new ....test.js file in the ./testScripts directory

# Demostration:

The _demo.js_ file contains a sample call to the script generator that runs on the _libToTest.js_ test library.

After running _demo.js_, a ./testScripts/libtotest.<timestamp>.test.js file will be generated

Now you can run unit tests with the "jest" command.

# Problems:

This is the early version of the project and although it has been tested you are likely to encounter problems.
Let me know if you encounter any problems other than those described below.

Some of them are described here:

1. Sometimes you need to bind a function to a module e.g:

   `const funcToCall = libToTest.sumFunc;` <br>
   `const funcBinded = funcToCall.bind(libToTest);`<br>
   `await tg.generateTestForFunc(funcBinded, 1, 3);`

2. Sometimes you will have to make changes to the test scripts and supplement it with, for example, initialization of the libraries you use.
   For example, if a 'yourLib' library requires the init function to be called before running other functions, you must take care of this in your test scripts.<br>
   `yourLib.init();` <br>

   and now test scripts <br>
   `test("test function sumFunc", () => { expect(yourLib.sumFunc(1, 3)).toBe(4); });`

3. In functions that generate test cases (e.g. generateTestForFunc) do not pass cyclic object values in the parameters. The objects must be serializable by JSON.stringify

4. In case of problems, you can always manually modify the generated test scenarios. You can use them just as a template.

5. Make sure that the framework 'jest' looking for test scripts in the ./testScripts folder (or any other folder you jump in the configuration)
