# JavaScript Event Loop & Execution

## What is the Event Loop?

The Event Loop is JavaScript's mechanism for handling asynchronous operations in a single-threaded environment. It manages the execution of code, events, and callbacks.

## JavaScript Execution Model

### Call Stack
- **LIFO** (Last In, First Out) structure
- Stores function calls and execution contexts
- Only **one thing** executes at a time

### Web APIs / Node.js APIs
- Handle asynchronous operations (timers, HTTP requests, DOM events)
- Run **outside** the main JavaScript thread

### Callback Queue (Task Queue)
- **FIFO** (First In, First Out) structure
- Stores callbacks ready to execute

### Microtask Queue
- **Higher priority** than callback queue
- Handles Promise callbacks, queueMicrotask()

## Event Loop Process

1. **Execute** synchronous code on call stack
2. **Check** if call stack is empty
3. **Process** all microtasks first
4. **Take** one task from callback queue
5. **Repeat**

## Simple Example

```javascript
console.log('1'); // Synchronous

setTimeout(() => console.log('2'), 0); // Callback Queue

Promise.resolve().then(() => console.log('3')); // Microtask Queue

console.log('4'); // Synchronous

// Output: 1, 4, 3, 2
```

**Execution Flow:**
1. `console.log('1')` → Call Stack → Output: **1**
2. `setTimeout` → Web API → Callback Queue (after 0ms)
3. `Promise.then` → Microtask Queue
4. `console.log('4')` → Call Stack → Output: **4**
5. Call Stack empty → Process Microtasks → Output: **3**
6. Process Callback Queue → Output: **2**

## Complex Example

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

Promise.resolve().then(() => {
  console.log('Promise 3');
  setTimeout(() => console.log('Timeout 3'), 0);
});

console.log('End');

// Output: Start, End, Promise 1, Promise 3, Promise 2, Timeout 1, Timeout 2, Timeout 3
```

## Async/Await and Event Loop

```javascript
async function example() {
  console.log('1');
  
  await new Promise(resolve => {
    console.log('2');
    resolve();
  });
  
  console.log('3');
}

console.log('Start');
example();
console.log('End');

// Output: Start, 1, 2, End, 3
```

**Why this order?**
1. `console.log('Start')` executes
2. `example()` called → `console.log('1')` and `console.log('2')` execute
3. `await` pauses function, returns control to event loop
4. `console.log('End')` executes
5. Promise resolves → `console.log('3')` executes from microtask queue

## Common Pitfalls

### Blocking the Event Loop
```javascript
// BAD - Blocks event loop
function heavyTask() {
  for (let i = 0; i < 1000000000; i++) {
    // Heavy computation
  }
}

// GOOD - Non-blocking
function heavyTaskAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      for (let i = 0; i < 1000000000; i++) {
        // Heavy computation
      }
      resolve();
    }, 0);
  });
}
```

### Microtask Queue Starvation
```javascript
// BAD - Infinite microtasks prevent callback queue processing
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks);
}

setTimeout(() => console.log('This will never run'), 0);
infiniteMicrotasks();
```

## Key Takeaways

1. **Single Thread**: JavaScript executes one thing at a time
2. **Microtasks First**: Always processed before callback queue
3. **Non-blocking**: Use async operations to avoid blocking
4. **Order Matters**: Understanding execution order prevents bugs

## Visual Summary

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│ Call Stack  │    │  Web APIs    │    │ Callback Queue  │
│             │    │              │    │                 │
│ [function]  │ ←→ │ setTimeout   │ → │ [callback]      │
│ [function]  │    │ HTTP Request │    │ [callback]      │
└─────────────┘    │ DOM Events   │    └─────────────────┘
                   └──────────────┘             ↑
                                               │
                   ┌──────────────┐            │
                   │ Microtask    │            │
                   │ Queue        │ ───────────┘
                   │              │ (Higher Priority)
                   │ [Promise]    │
                   │ [Promise]    │
                   └──────────────┘
```