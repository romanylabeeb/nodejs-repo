const { calcPromise } = require("./calcPromise");


const p1 = calcPromise(3000, 1);
const p2 = calcPromise(2000, 2);
const p3 = calcPromise(1000, 3);

// Promise.all([p1, p2, p3])
//   .then((res) => {
//     console.log("res=", res);
//   })
//   .catch((err) => {
//     console.error("Error in one of the promises:", err);
//   });

Promise.all([]).then((res) => console.log(res));

const promisAll = (promises) => {
  let count = 0;
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    const result = [];
    promises.forEach((p1, index) => {
      if (!(p1 instanceof Promise)) {
        p1 = Promise.resolve(p1);
      }

      p1.then((out) => {
        result[index] = out;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
};

promisAll([p1, p2, p3])
  .then((res) => {
    console.log("res=", res);
  })
  .catch((err) => {
    console.error("Error in one of the promises:", err);
  });
