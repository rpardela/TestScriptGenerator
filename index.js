'use strict';
import fs from 'fs';

const JEST_PROVIDER = 'jest';
const MOCHA_PROVIDER = 'mocha';

let fileSuffix = '.' + Date.now() + '.test.js';
let defaultTestScriptsPath = './testScripts/';
let defaultModulePath = '../';
let defaultTestFramework = JEST_PROVIDER;

class TestScriptGenerator {
    name = 'TestScriptGenerator'
    version = '1.1.0' // synchronize version with package.json
    testFileName
    fileNameIn
    generateFiles
    testScriptsPath
    modulePath
    testFramework
    describeID

    /**
     * Generate file with unit test script
     * result file name: moduleName + .timestamp + .test.js, eg: libToTest.1666085133268.test.js
     * 
     * @param {boolean} generateFiles false if the result file should not be generated
     * @param {string} moduleName module where are located tested functions
     * @param {object} options (optional) {testFramework = 'jest', testScriptsPath = './testScripts/', modulePath = '../'}
     * @returns 
     */
    constructor(generateFiles, moduleName, options = null) {
        this.generateFiles = generateFiles;
        //this, this.describeID = uuid(10);
        this.describeID = uuid(10);
        if (!this.generateFiles) { return }

        this.testScriptsPath = (options?.testScriptsPath) ? options.testScriptsPath : defaultTestScriptsPath
        this.modulePath = (options?.modulePath) ? options.modulePath : defaultModulePath
        this.testFramework = (options?.testFramework) ? options.testFramework : defaultTestFramework

        if (!fs.existsSync(this.testScriptsPath)) {
            fs.mkdirSync(this.testScriptsPath);
        }

        this.fileNameIn = moduleName;
        this.testFileName = this.testScriptsPath + this.fileNameIn + fileSuffix;
        fs.rm(this.testFileName, () => { }); // remove file if exists
        saveHeader(this);
        fs.appendFileSync(this.testFileName, '// import "regenerator-runtime/runtime";' + '\n');
        if (this.testFramework === MOCHA_PROVIDER) {
            //fs.appendFileSync(this.testFileName, 'const expect = require("chai").expect;' + '\n');
            fs.appendFileSync(this.testFileName, 'import { expect } from "chai";' + '\n');
        }
        // fs.appendFileSync(this.testFileName, 'const ' + moduleName + ' = require("' + this.modulePath + moduleName + '");' + '\n\n');
        fs.appendFileSync(this.testFileName, 'import ' + moduleName + ' from "' + this.modulePath + moduleName + '.js";' + '\n\n');
        fs.appendFileSync(this.testFileName, '// describeID: ' + this.describeID + '\n');
        fs.appendFileSync(this.testFileName, 'describe("Tests for module: ' + moduleName + '", () => {' + '\n');
    }

    /**
     * @param {function} function to call
     * @param {*} arguments called function arguments (don't use cyclic object values)
     * @returns {*} return original returned value from called function
     */
    generateTestForFunc() {
        let { args, toPass, name } = prepareArguments(arguments, this.generateFiles, this.testFileName);

        if (!this.generateFiles) { return arguments[0](...args); } // return original result

        let resultOrg = arguments[0](...args);
        let { resultType, result } = prepareResult(resultOrg, this.testFileName);

        let comment = 'test function ' + name;

        let ret = '';
        let matcher;
        switch (this.testFramework) {
            case JEST_PROVIDER:
                matcher = (resultType === 'object') ? 'toEqual' : 'toBe';

                ret = '  test("' + comment + '", () => { \n'
                    + '    expect(' + this.fileNameIn + '.' + name + '(' + toPass + ')).' + matcher + '(' + result + ');\n'
                    + '  });' + '\n\n';
                break;
            case MOCHA_PROVIDER:
                matcher = (resultType === 'object') ? 'to.deep.equal' : 'to.equal';

                ret = '  it("' + comment + '", () => { \n'
                    + '    expect(' + this.fileNameIn + '.' + name + '(' + toPass + ')).' + matcher + '(' + result + ');\n'
                    + '  });' + '\n\n';
                break;
            default:
                break;
        }

        fs.appendFileSync(this.testFileName, ret);
        setFinishDescribe(this.testFileName, this.describeID);
        return resultOrg;
    }

    /**
     * @param {function} function to call async
     * @param {*} arguments called function arguments (don't use cyclic object values)
     * @returns {*} return original resolve value from called function
     */
    async generateTestForFuncAsyncResolve() {
        let { args, toPass, name } = prepareArguments(arguments, this.generateFiles, this.testFileName);

        if (!this.generateFiles) { return await arguments[0](...args); } // return original result

        let resultOrgTmp = await arguments[0](...args);
        let resultOrg = resultOrgTmp;//{ result: resultOrgTmp };

        let { resultType, result } = prepareResult(resultOrg, this.testFileName);

        let comment = 'async test function resolve ' + name;

        let ret = '';
        let matcher;
        switch (this.testFramework) {
            case JEST_PROVIDER:
                matcher = (resultType === 'object') ? 'toEqual' : 'toBe';

                ret = '  test("' + comment + '", async () => {\n'
                    + '     await expect(' + this.fileNameIn + '.' + name + '(' + toPass + '))\n'
                    + '    .resolves.' + matcher + '(' + result + ');\n'
                    + '  });' + '\n\n';
                break;
            case MOCHA_PROVIDER:
                matcher = (resultType === 'object') ? 'to.deep.equal' : 'to.equal';

                ret = '  it("' + comment + '", async () => {\n'
                    + '     expect(await ' + this.fileNameIn + '.' + name + '(' + toPass + '))\n'
                    + '    .' + matcher + '(' + result + ');\n'
                    + '  });' + '\n\n';
                break;
            default:
                break;
        }

        fs.appendFileSync(this.testFileName, ret);
        return resultOrg;
    }

    /**
     * @param {function} function to call async
     * @param {*} arguments called function arguments (don't use cyclic object values)
     * @returns {*} return original rejected value from called function
     */
    async generateTestForFuncAsyncReject() {
        let { args, toPass, name } = prepareArguments(arguments, this.generateFiles, this.testFileName);

        if (!this.generateFiles) { return await arguments[0](...args); } // return original result

        let resultOrg;
        await arguments[0](...args)
            .catch(err => {
                resultOrg = err;
            })

        let { resultType, result } = prepareResult(resultOrg, this.testFileName);

        let comment = 'async test function reject ' + name;

        let ret = '';
        let matcher;
        switch (this.testFramework) {
            case JEST_PROVIDER:
                matcher = (resultType === 'object') ? 'toEqual' : 'toBe';

                ret = '  test("' + comment + '", async () => { \n'
                    + '    expect.assertions(1); \n'
                    + '    return ' + this.fileNameIn + '.' + name + '(' + toPass + ')\n'
                    + '    .catch(e => expect(JSON.parse(JSON.stringify(e))).' + matcher + '(' + result + '));\n'
                    + '  });' + '\n\n';
                break;
            case MOCHA_PROVIDER:
                matcher = (resultType === 'object') ? 'to.deep.equal' : 'to.equal';

                ret = '  it("' + comment + '", async () => { \n'
                    + '    return ' + this.fileNameIn + '.' + name + '(' + toPass + ')\n'
                    + '    .catch(e => expect(JSON.parse(JSON.stringify(e))).' + matcher + '(' + result + '));\n'
                    + '  });' + '\n\n';
                break;
            default:
                break;
        }

        fs.appendFileSync(this.testFileName, ret);
        return resultOrg; // return original result
    }

    getVersion = () => {
        return this.name + ' ' + this.version;
    }
}

export {
    TestScriptGenerator
}

const saveHeader = (m) => {
    fs.appendFileSync(m.testFileName,
        '/* \n'
        + '   Script generated automatically from the NPM unit-test-script-generator package.' + '\n\n'
        + '   Package version: ' + m.version + '\n'
        + '   Test framework: ' + m.testFramework + '\n'
        + '   Tested module: ' + m.fileNameIn + '\n'
        + '   ES6: ' + 'True' + '\n'
        + '   Date of file generation: ' + new Date(Date.now()).toLocaleString() + '\n'
        + '*/ \n\n'
    );
}
/**
 * Prepare function arguments and name
 * @param {array} argsLocal Array of arguments to call function 
 * @param {boolean} generateFiles generate script files? 
 * @param {string} testFileName Test script file name
 * @returns {object} args, toPass, name
 */
const prepareArguments = (argsLocal, generateFiles, testFileName) => {
    let args = [];
    let toPass = '';

    for (let i = 1; i < argsLocal.length; i++) {
        let item = argsLocal[i];
        args.push(item);
        if (generateFiles) {
            if (i > 1) {
                toPass += ' ';
            }
            if (typeof item === 'string') {
                toPass += '"' + item + '"';
            } else if (typeof item === 'object' && item !== null) {
                let itemObjectDef;
                let objName = 'obj_' + uuid(10);
                let objTest = item;
                itemObjectDef = '  const ' + objName + ' = ' + JSON.stringify(objTest) + ';'
                fs.appendFileSync(testFileName, itemObjectDef + '\n');
                toPass += objName;
            } else {
                toPass += item;
            }
            toPass += ',';
        }
    }

    toPass = toPass.substring(0, toPass.length - 1); // remove last comma
    let nameTmp = argsLocal[0].name.split(' ');// gets only second part without 'bounded'        
    let name = '';
    if (nameTmp.length > 1) {
        name = nameTmp[1];
    } else {
        name = argsLocal[0].name;
    }
    return { args: args, toPass: toPass, name: name }
}

/**
 * Prepare result of function to save
 * @param {*} resultOrg Original function result
 * @param {string} testFileName Test script file name
 * @returns {object} resultType, result
 */
const prepareResult = (resultOrg, testFileName) => {
    let result;
    let resultType;

    if (typeof resultOrg === 'string') {
        resultType = 'string';
        result = '"' + resultOrg + '"';
    } else if (typeof resultOrg === 'object' && resultOrg !== null) {
        resultType = 'object';
        let itemObjectDef;
        let objName = 'resObject_' + uuid(10);
        let objTest = resultOrg;
        itemObjectDef = '  const ' + objName + ' = ' + JSON.stringify(objTest) + ';'
        fs.appendFileSync(testFileName, itemObjectDef + '\n');
        result = objName;
    } else {
        resultType = 'other';
        result = resultOrg;
    }
    return { resultType: resultType, result: result }
}

/**
 * Set finish code for describe
 * @param {string} testFileName 
 * @param {string} describeID 
 */
const setFinishDescribe = (testFileName, describeID) => {
    fs.readFile(testFileName, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let result = '';
        let dataArr = data.split('\n');
        dataArr.map((line) => {
            if (!line.includes('[' + describeID + ']')) {
                result += line + '\n';
                // if (line !== '') {
                //     result += '\n';
                // }
            }
        })
        result += '});// describeID[' + describeID + ']' + '\n';
        fs.writeFile(testFileName, result.toString(), 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

const uuid = (len) => {
    const min = Math.ceil(100000000);
    const max = Math.floor(999999999);

    let uid = (Math.floor(Math.random() * (max - min + 1)) + min).toString(36);

    do {
        uid += (Math.floor(Math.random() * (max - min + 1)) + min).toString(36);
    } while (uid.length < len);

    return uid.substring(1, len);
}