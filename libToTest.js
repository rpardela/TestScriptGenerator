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