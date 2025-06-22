# Promise Methods Comparison

## Overview
JavaScript provides four main Promise methods for handling multiple promises: `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`. Each serves different use cases.

## Promise.all()
**Behavior**: Resolves when ALL promises resolve, rejects if ANY promise rejects.

**Use Case**: When you need all operations to succeed.

**Example**:
```javascript
// Fetching user data and settings - both must succeed
Promise.all([fetchUser(), fetchSettings()])
  .then(([user, settings]) => console.log('Both loaded'))
  .catch(err => console.log('One failed:', err));
```

## Promise.allSettled()
**Behavior**: Always resolves when ALL promises settle (resolve or reject).

**Use Case**: When you want results from all promises regardless of success/failure.

**Example**:
```javascript
// Processing multiple files - want to know which succeeded/failed
Promise.allSettled([processFile1(), processFile2(), processFile3()])
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`File ${i} processed:`, result.value);
      } else {
        console.log(`File ${i} failed:`, result.reason);
      }
    });
  });
```

## Promise.race()
**Behavior**: Resolves/rejects with the first promise that settles.

**Use Case**: When you want the fastest response or need timeouts.

**Example**:
```javascript
// Timeout pattern
Promise.race([
  fetchData(),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
])
.then(data => console.log('Got data:', data))
.catch(err => console.log('Failed or timed out:', err));
```

## Promise.any()
**Behavior**: Resolves with the first promise that resolves, rejects only if ALL promises reject.

**Use Case**: When you need at least one success from multiple attempts.

**Example**:
```javascript
// Try multiple servers - succeed if any responds
Promise.any([
  fetch('https://api1.example.com/data'),
  fetch('https://api2.example.com/data'),
  fetch('https://api3.example.com/data')
])
.then(response => console.log('Got response from one server'))
.catch(err => console.log('All servers failed'));
```

## Quick Reference

| Method | Resolves When | Rejects When | Use Case |
|--------|---------------|--------------|----------|
| `all()` | All resolve | Any rejects | All must succeed |
| `allSettled()` | All settle | Never | Want all results |
| `race()` | First settles | First rejects | Need fastest |
| `any()` | First resolves | All reject | Need one success |

## Async/Await

### What is Async/Await?
Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code.

### How Event Loop Handles Async/Await

1. **Function Declaration**: `async` functions always return a Promise
2. **Await Execution**: When `await` is encountered, the function execution pauses
3. **Event Loop**: Control returns to the event loop while waiting for the Promise
4. **Resume**: Once the Promise resolves, execution resumes from where it paused

```javascript
async function example() {
  console.log('1'); // Executes immediately
  const result = await fetch('/api'); // Pauses here, returns control to event loop
  console.log('2'); // Executes after fetch resolves
  return result;
}
```

### Promise vs Async/Await Examples

**Using Promises**:
```javascript
function fetchUserData() {
  return fetchUser()
    .then(user => fetchProfile(user.id))
    .then(profile => fetchSettings(profile.id))
    .then(settings => ({ user, profile, settings }))
    .catch(err => console.error('Error:', err));
}
```

**Using Async/Await**:
```javascript
async function fetchUserData() {
  try {
    const user = await fetchUser();
    const profile = await fetchProfile(user.id);
    const settings = await fetchSettings(profile.id);
    return { user, profile, settings };
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### Pros and Cons

#### Pros of Async/Await
- **Readability**: Code looks synchronous and is easier to read
- **Error Handling**: Use familiar try/catch blocks
- **Debugging**: Easier to set breakpoints and step through code
- **No Callback Hell**: Eliminates nested .then() chains

#### Cons of Async/Await
- **Sequential Execution**: Can make parallel operations slower if not handled properly
- **Error Propagation**: Errors can be silently swallowed if not caught
- **Browser Support**: Requires modern browsers or transpilation

### Common Patterns

**Sequential vs Parallel Execution**:
```javascript
// Sequential (slower) - each waits for previous
async function sequential() {
  const user = await fetchUser();     // 100ms
  const posts = await fetchPosts();   // 200ms
  const comments = await fetchComments(); // 150ms
  // Total: ~450ms
}

// Parallel (faster) - all start simultaneously
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),     // 100ms
    fetchPosts(),    // 200ms  
    fetchComments()  // 150ms
  ]);
  // Total: ~200ms (longest operation)
}
```

**Error Handling**:
```javascript
async function handleErrors() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (err) {
    if (err.code === 'NETWORK_ERROR') {
      return await fallbackOperation();
    }
    throw err; // Re-throw if can't handle
  }
}
```