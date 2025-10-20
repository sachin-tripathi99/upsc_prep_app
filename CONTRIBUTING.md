# Contributing to UPSC Prep App

Thank you for considering contributing to the UPSC Prep App! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes:**
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

3. **Test your changes:**
   - Ensure all existing tests pass
   - Add new tests for new features
   - Test manually if applicable

4. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
   
   Follow conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if UI changes)
   - Checklist of changes made

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure
4. Start MongoDB
5. Run in development mode: `npm run dev`

## Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions
- Use async/await instead of callbacks
- Handle errors properly

### API Design
- Follow RESTful conventions
- Use appropriate HTTP methods and status codes
- Validate input data
- Return consistent response formats
- Include proper error messages

### Database
- Use meaningful collection and field names
- Add indexes for frequently queried fields
- Use mongoose virtuals for computed fields
- Validate data at schema level

## Testing

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Maintain test coverage above 70%
- Run tests before submitting PR: `npm test`

## Documentation

- Update README.md for user-facing changes
- Update API.md for API changes
- Add JSDoc comments for functions
- Update setup guides if installation changes

## Code Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, maintainers will merge your PR

## Community Guidelines

- Be respectful and constructive
- Help others when you can
- Follow the project's code of conduct
- Give credit where credit is due

## Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Reach out to maintainers

Thank you for contributing! 🎉
