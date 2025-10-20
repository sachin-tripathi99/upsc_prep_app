# Contributing to UPSC Prep App

Thank you for considering contributing to the UPSC Prep App! This document provides guidelines for contributing to this project.

## How Can You Contribute?

### 1. Content Contributions
- **Add More Flashcards**: Create flashcards for additional topics
- **Update News Articles**: Add recent news with UPSC analysis
- **Expand Roadmap**: Detail remaining months (3-15) with daily tasks
- **Add Mock Questions**: Create comprehensive mock test questions
- **Case Studies**: Add ethics case studies

### 2. Feature Enhancements
- **User Authentication**: Implement user login/signup
- **Database Integration**: Connect to MongoDB for persistent storage
- **News Scraping**: Implement automatic news fetching from The Hindu
- **Answer Writing Checker**: AI-based answer evaluation
- **Performance Analytics**: Advanced graphs and insights
- **Mobile App**: React Native version
- **Offline Mode**: PWA with offline capabilities
- **PDF Exports**: Export notes and compilations

### 3. Bug Fixes and Improvements
- Report bugs via GitHub Issues
- Fix existing issues
- Improve code quality
- Add unit tests
- Enhance UI/UX
- Optimize performance

## Getting Started

1. **Fork the Repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/upsc_prep_app.git
   cd upsc_prep_app
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a Pull Request
   - Describe your changes clearly
   - Reference any related issues

## Code Style Guidelines

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### CSS
- Use consistent naming conventions
- Organize styles logically
- Use CSS variables for colors
- Make responsive designs
- Avoid inline styles when possible

### API Routes
- Follow RESTful conventions
- Use proper HTTP methods
- Return consistent response format
- Add error handling
- Document endpoints

## Content Guidelines

### Adding Flashcards
```javascript
{
  question: "Clear, concise question",
  answer: "Detailed answer with key points\nUse line breaks for readability",
  category: "History", // or Polity, Geography, etc.
  difficulty: "Medium", // Easy, Medium, Hard
  topic: "Specific topic name",
  tags: ["tag1", "tag2"],
  source: "Source reference" // optional
}
```

### Adding News Articles
```javascript
{
  title: "Clear headline",
  content: "Detailed content with:\n- Key highlights\n- UPSC relevance\n- Analysis",
  category: "Economy", // subject category
  importance: "High", // High, Medium, Low
  date: new Date(),
  tags: ["GDP", "Growth"],
  relatedTopics: ["Indian Economy", "Fiscal Policy"]
}
```

### Adding Roadmap Days
```javascript
{
  day: 1,
  tasks: [
    "Specific, actionable task 1",
    "Specific, actionable task 2",
    // ... more tasks
  ],
  studyHours: 8,
  topics: ["Topic 1", "Topic 2"]
}
```

## Testing Guidelines

### Before Submitting PR
1. Test the server: `npm run server`
2. Test the client: `npm run client` 
3. Build the client: `npm run build`
4. Test all API endpoints
5. Check responsive design
6. Verify no console errors

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Data persists correctly
- [ ] Responsive on mobile/tablet
- [ ] No console errors/warnings
- [ ] API returns expected data

## Documentation

When adding new features:
- Update README.md if needed
- Update USAGE_GUIDE.md for user-facing features
- Add code comments for complex logic
- Update API documentation

## Community Guidelines

- Be respectful and inclusive
- Help other contributors
- Provide constructive feedback
- Follow the code of conduct
- Focus on UPSC aspirants' needs

## Reporting Issues

When reporting bugs:
- Use clear, descriptive titles
- Provide steps to reproduce
- Include expected vs actual behavior
- Add screenshots if applicable
- Mention your environment (OS, browser, etc.)

## Feature Requests

When requesting features:
- Explain the use case clearly
- Describe expected behavior
- Consider implementation complexity
- Think about UPSC exam relevance

## Priority Areas for Contribution

### High Priority
1. Complete daily tasks for Months 3-15 in roadmap
2. Add 500+ more flashcards
3. Add recent news articles (last 6 months)
4. Create 100+ mock test questions
5. Add 50+ ethics case studies

### Medium Priority
1. Implement user authentication
2. Connect MongoDB database
3. Add answer writing checker
4. Improve mobile responsiveness
5. Add more mock tests

### Future Enhancements
1. Mobile app development
2. Community forum
3. Study groups feature
4. Video lectures integration
5. Mentor connect platform

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## Questions?

- Open an issue for questions
- Email: [project email]
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make UPSC preparation easier for thousands of aspirants! 🙏

**Together, we can help more aspirants achieve their dream of serving the nation!** 🇮🇳
