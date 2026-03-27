# Contributing to DexVault

Thank you for your interest in contributing to DexVault! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Styleguides](#styleguides)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by the [DexVault Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under Issues.
- If you're unable to find an open issue addressing the problem, open a new one.

### Suggesting Enhancements

- Open a new issue with a clear title and detailed description.
- Provide as much context as possible about the enhancement.

### Pull Requests

- Fork the repo and create your branch from `main`.
- If you've added code that should be tested, add tests.
- Ensure the test suite passes.
- Make sure your code lints.
- Issue that pull request!

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/singularraritylabs/dexvault.git
cd dexvault

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file.test.ts

# Run tests in watch mode
npm run test:watch
```

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the CHANGELOG.md with a note describing your changes.
3. The PR will be merged once you have the sign-off of at least one other developer.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic

### Documentation Styleguide

- Use Markdown for documentation
- Reference methods and classes in markdown with the custom `{@link}` syntax

## Community

- Join our [Discord](https://discord.gg/dexvault) for discussions
- Follow us on [Twitter](https://twitter.com/dexvault) for updates

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
