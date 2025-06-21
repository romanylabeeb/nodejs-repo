const { calcPromise } = require("./calcPromise");

const p1 = calcPromise(3000, 1);
const p2 = calcPromise(2000, 2);
const p3 = calcPromise(1000, 3);

// Promise.allSettled([p1, p2, p3])
//   .then((res) => {
//     console.log("res=", res);
//   })
//   .catch((err) => {
//     console.error("Error in one of the promises:", err);
//   });

Promise.all([]).then((res) => console.log(res));
/**
 * // * Custom implementation of Promise.allSettled
 * // * It takes an array of promises and returns a promise that resolves when all the promises have settled (either fulfilled or rejected).
 * // * The result is an array of objects, each containing the status and value or reason of the promise.
 * @param {*} promises 
 * @returns 
 */
const promiseAllSettled = (promises) => {
  let count = 0;
  if (promises.length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const result = [];
    promises.forEach((p, index) => {
      if (!(p instanceof Promise)) {
        p = Promise.resolve(p);
      }
      p.then((res) => {
        count++;
        result[index] = { status: "fulfilled", value: res };

        if (count === promises.length) {
          resolve(result);
        }
      }).catch((err) => {
        count++;
        result[index] = { status: "rejected", reason: err };

        if (count === promises.length) {
          resolve(result);
        }
      });
    });
  });
};
  promiseAllSettled([p1, p2, p3])
    .then((res) => {
      console.log("res=", res);
    })
    .catch((err) => {
      console.error("Error in one of the promises:", err);
    });
promiseAllSettled([4,5,6]).then((res) => {
  console.log("res=", res);
}
).catch((err) => {
  console.error("Error in one of the promises:", err);
});