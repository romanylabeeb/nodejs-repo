const promiseRace = (promises) => {
  if (promises.length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      if (!(p instanceof Promise)) {
        p = Promise.resolve(p);
      }
      p.then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  });
};
const { calcPromise } = require("./calcPromise");

const p1 = calcPromise(3000, 1);
const p2 = calcPromise(2000, 2);
const p3 = calcPromise(1000, 3);
const a=[p1,p2,p3];
Promise.race(a).then((data) => {
  console.log(data);
});
