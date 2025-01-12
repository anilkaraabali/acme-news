# Acme News

Your trusted source for breaking news, trending stories, and comprehensive reports from across the globe.

## Prerequisites

Before starting, make sure your system meets the following requirements:

1. Node.js: Version `>=18.20.4`. You can download it from [nodejs.org](nodejs.org).
2. Package Manager: This project requires pnpm instead of npm or yarn. If you don’t have pnpm installed, you can install it using the following command:

```bash
npm install -g pnpm
```

Ensure these prerequisites are set up before proceeding to the next steps.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/anilkaraabali/acme-news.git
cd acme-news
pnpm install
```

Then, start the development server:

```bash
pnpm dev
```

## Running Tests

This project uses Jest for running unit and integration tests.

To run the tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project and output the results in the terminal.

### Running Tests in Watch Mode

If you want to run the tests continuously as you make changes, you can use the following command:

```bash
pnpm test:watch
```

This will watch for changes to your test files and automatically rerun the tests.

### Running Tests with Coverage

To run the tests with coverage reports, use:

```bash
pnpm test:coverage
```

This will generate a code coverage report that shows how much of your code is covered by tests.

## TypeScript Validation

To check for TypeScript errors in your project, you can run:

```bash
pnpm validate-types
```

This will use the TypeScript compiler to validate your types and show any errors or warnings related to type issues in your code.
