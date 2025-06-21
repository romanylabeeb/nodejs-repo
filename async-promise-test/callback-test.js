const f1 = (cb) => {
  console.log("a");
  // settimeout add the cb to msg queue which will be executed after the current call stack is empty
  setTimeout(() => {
    cb();
  }, 0);
};

f1(() => {
  console.log("b");
});
console.log("c");


// setTimeout is used to delay the execution of the callback function
setTimeout(() => {
  const f2 = (cb) => {
    console.log("1");
    // cb executed immediately
    cb();
  };
  f2(() => {
    console.log("2");
  });
  console.log("3");
}, 1);
