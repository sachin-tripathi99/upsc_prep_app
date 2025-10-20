const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import models
const User = require('./server/models/User');
const Subject = require('./server/models/Subject');
const Topic = require('./server/models/Topic');
const Test = require('./server/models/Test');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/upsc_prep';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Topic.deleteMany({});
    await Test.deleteMany({});

    console.log('Existing data cleared...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@upscprep.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created:', adminUser.email);

    // Create sample student
    const studentPassword = await bcrypt.hash('student123', 10);
    const studentUser = await User.create({
      name: 'Demo Student',
      email: 'student@upscprep.com',
      password: studentPassword,
      role: 'student',
      targetExam: 'IAS',
      targetYear: 2026,
    });

    console.log('Student user created:', studentUser.email);

    // Create subjects
    const history = await Subject.create({
      name: 'History',
      code: 'HIST',
      description: 'Ancient, Medieval and Modern Indian History',
      examType: 'Both',
      isOptional: false,
    });

    const geography = await Subject.create({
      name: 'Geography',
      code: 'GEO',
      description: 'Physical and Human Geography of India and World',
      examType: 'Both',
      isOptional: false,
    });

    const polity = await Subject.create({
      name: 'Polity',
      code: 'POL',
      description: 'Indian Polity and Governance',
      examType: 'Both',
      isOptional: false,
    });

    console.log('Subjects created...');

    // Create topics for History
    const topic1 = await Topic.create({
      name: 'Indus Valley Civilization',
      subject: history._id,
      description: 'Early civilizations in Indian subcontinent',
      difficulty: 'Easy',
      estimatedTime: 3,
      resources: [
        {
          title: 'NCERT Class 11 - Ancient India',
          type: 'Book',
          url: 'https://ncert.nic.in',
        },
      ],
    });

    const topic2 = await Topic.create({
      name: 'Mughal Empire',
      subject: history._id,
      description: 'Rise and fall of Mughal Empire in India',
      difficulty: 'Medium',
      estimatedTime: 5,
      resources: [
        {
          title: 'NCERT Class 12 - Medieval India',
          type: 'Book',
          url: 'https://ncert.nic.in',
        },
      ],
    });

    // Update subject with topics
    await Subject.findByIdAndUpdate(history._id, {
      $push: { topics: { $each: [topic1._id, topic2._id] } },
    });

    console.log('Topics created...');

    // Create a sample test
    const test = await Test.create({
      title: 'History Mock Test - Ancient India',
      description: 'Comprehensive test on Ancient Indian History',
      type: 'Mock Test',
      examType: 'Prelims',
      subject: history._id,
      duration: 60,
      totalMarks: 100,
      questions: [
        {
          questionText: 'Which of the following was the largest Indus Valley Civilization site?',
          options: [
            { text: 'Harappa', isCorrect: false },
            { text: 'Mohenjo-daro', isCorrect: false },
            { text: 'Dholavira', isCorrect: true },
            { text: 'Kalibangan', isCorrect: false },
          ],
          correctAnswer: 'Dholavira',
          explanation: 'Dholavira is the largest Indus Valley Civilization site in India.',
          marks: 2,
          negativeMarks: 0.66,
        },
        {
          questionText: 'The Indus Valley people traded with which civilization?',
          options: [
            { text: 'Egyptian', isCorrect: false },
            { text: 'Mesopotamian', isCorrect: true },
            { text: 'Chinese', isCorrect: false },
            { text: 'Greek', isCorrect: false },
          ],
          correctAnswer: 'Mesopotamian',
          explanation: 'Archaeological evidence shows trade relations between Indus Valley and Mesopotamian civilizations.',
          marks: 2,
          negativeMarks: 0.66,
        },
        {
          questionText: 'Which metal was NOT known to Indus Valley people?',
          options: [
            { text: 'Copper', isCorrect: false },
            { text: 'Bronze', isCorrect: false },
            { text: 'Iron', isCorrect: true },
            { text: 'Gold', isCorrect: false },
          ],
          correctAnswer: 'Iron',
          explanation: 'Iron came into use in India during the later Vedic period, not during Indus Valley Civilization.',
          marks: 2,
          negativeMarks: 0.66,
        },
      ],
      isActive: true,
    });

    console.log('Sample test created...');

    console.log('\n=== Seed Data Summary ===');
    console.log('Admin Email: admin@upscprep.com');
    console.log('Admin Password: admin123');
    console.log('Student Email: student@upscprep.com');
    console.log('Student Password: student123');
    console.log('Subjects created: 3');
    console.log('Topics created: 2');
    console.log('Tests created: 1');
    console.log('=========================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => {
  seedData();
});
