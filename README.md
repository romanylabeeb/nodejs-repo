# Node.js Express Application

A comprehensive Node.js learning project demonstrating Express.js middleware, routing, and asynchronous programming concepts.

## Quick Start

```bash
npm install
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
├── app.js              # Main application entry point
├── controllers/        # Route controllers
├── models/            # Data models
├── routes/            # Route definitions
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS)
├── data/              # JSON data files
└── documents/         # Documentation
```

## Features

- **Express.js Server**: Basic HTTP server with middleware
- **Routing**: Admin, shop, and authentication routes
- **Templating**: EJS view engine
- **Static Files**: CSS and JavaScript assets
- **Data Management**: JSON-based data storage

## Current App.js Implementation

The main application demonstrates Express middleware execution:

- **First Middleware**: Logs requests and passes control
- **Second Middleware**: Sends HTML response
- **Login Route**: Basic route handler (currently unreachable due to middleware order)

### Middleware Behavior

When accessing any route, requests flow through middleware in order:
1. First middleware logs and calls `next()`
2. Second middleware logs and sends response
3. Subsequent routes won't execute (response already sent)

**Note**: Browsers typically make two requests - one for the page and one for favicon.ico, which is why you see duplicate middleware logs.

## Documentation

### Core Concepts
- [Event Loop & Execution](./documents/EVENT-LOOP-README.md) - Understanding JavaScript's asynchronous execution model
- [Promises & Async/Await](./documents/PROMISE-ASYNC-README.md) - Comprehensive guide to Promise methods and async patterns

### Additional Resources
- [Async Promise Examples](./async-promise-test/README.md) - Practical examples and tests

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
git clone <repository-url>
cd nodejs-repo
npm install
```

### Running the Application
```bash
node app.js
# or
npm start
```

### Project Scripts
- `run-script.sh` - Custom run script for development

## Learning Objectives

This project covers:
- Express.js fundamentals
- Middleware concepts and execution order
- Routing and controllers
- Template engines (EJS)
- Asynchronous JavaScript patterns
- Promise handling and async/await
- Event loop understanding

## Contributing

This is a learning project. Feel free to experiment with different patterns and implementations.