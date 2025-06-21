const calcPromise = (time, val) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("in promise:", val);
      if (val === 2) reject(val);
      resolve(val);
    }, time);
  });
};

exports.calcPromise = calcPromise;