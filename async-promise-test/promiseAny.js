// Description: Implementing a custom promiseAny function that mimics Promise.any behavior.// 
//     * The any function returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an AggregateError
//     * if no promises are fulfilled.
const promiseAny = (promises) => {
  if (promises.length === 0) return Promise.reject(new AggregateError([], "All promises were rejected"));
  return new Promise((resolve, reject) => {
    let errorsCount = 0;
    const errors = [];
    promises.forEach((p, i) => {
      if (!(p instanceof Promise)) {
        p = Promise.resolve(p);
      }

      p.then((res) => {
        resolve(res);
      }).catch((err) => {
        errors[i] = err;
        errorsCount+= 1;
        if (errorsCount === promises.length) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};
const { calcPromise } = require("./calcPromise");

const p1 = calcPromise(3000, 1);
const p2 = calcPromise(2000, 2);
const p3 = calcPromise(3000, 3);

const a = [p1, p2, p3];
// promiseAny(a).then((res) => console.log(res));
Promise.any([]).then((res) => console.log(res));
promiseAny([]).then((res) => console.log(res));