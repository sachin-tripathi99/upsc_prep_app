// Extended Roadmap Data for Months 3-15
// This provides the structure for the remaining months

const extendedRoadmapMonths = [
  {
    month: 3,
    theme: "Society, Security & Disaster Management",
    overview: "Focus on Indian society, internal security, and disaster management topics",
    weeklyGoals: [
      { week: 9, focus: "Indian Society & Social Issues", daysCount: 7 },
      { week: 10, focus: "Internal Security Challenges", daysCount: 7 },
      { week: 11, focus: "Disaster Management Framework", daysCount: 7 },
      { week: 12, focus: "Science & Technology Applications", daysCount: 7 }
    ],
    keyTopics: [
      "Caste system and its impact",
      "Gender issues and women empowerment",
      "Population and migration",
      "Poverty and inequality",
      "Terrorism and extremism",
      "Border management",
      "Cyber security",
      "Disaster types and mitigation",
      "Recent technological developments"
    ]
  },
  {
    month: 4,
    theme: "Governance & Ethics Foundation",
    overview: "Complete governance topics and start Ethics preparation",
    weeklyGoals: [
      { week: 13, focus: "E-Governance and Digital India", daysCount: 7 },
      { week: 14, focus: "Public Administration Basics", daysCount: 7 },
      { week: 15, focus: "Ethics Theory and Case Studies", daysCount: 7 },
      { week: 16, focus: "Month 1-4 Comprehensive Revision", daysCount: 7 }
    ],
    keyTopics: [
      "E-governance initiatives",
      "Digital India mission",
      "Good governance principles",
      "Transparency and accountability",
      "Ethics and human interface",
      "Attitude and thought",
      "Emotional intelligence",
      "First 4 months revision"
    ]
  },
  {
    month: 5,
    theme: "Optional Subject Foundation (If applicable) & Advanced Geography",
    overview: "Start optional subject preparation and complete advanced geography",
    weeklyGoals: [
      { week: 17, focus: "World Geography - Part 1", daysCount: 7 },
      { week: 18, focus: "World Geography - Part 2", daysCount: 7 },
      { week: 19, focus: "Economic Geography", daysCount: 7 },
      { week: 20, focus: "Optional Subject Introduction", daysCount: 7 }
    ],
    studyHoursPerDay: 9,
    note: "Increase study hours to 9 per day from Month 5"
  },
  {
    month: 6,
    theme: "Answer Writing & Test Series Begin",
    overview: "Intensive answer writing practice and first mock test series",
    weeklyGoals: [
      { week: 21, focus: "Answer Writing Techniques", daysCount: 7 },
      { week: 22, focus: "GS Paper 1 Answer Practice", daysCount: 7 },
      { week: 23, focus: "GS Paper 2 Answer Practice", daysCount: 7 },
      { week: 24, focus: "First Full Mock Test", daysCount: 7 }
    ],
    dailyAnswerWriting: 4,
    mockTests: 1,
    note: "Join a test series from this month"
  },
  {
    month: 7,
    theme: "Advanced Economy & International Relations",
    overview: "Complete advanced topics in economy and international relations",
    weeklyGoals: [
      { week: 25, focus: "Banking and Financial System", daysCount: 7 },
      { week: 26, focus: "Government Budgeting", daysCount: 7 },
      { week: 27, focus: "India's Foreign Relations", daysCount: 7 },
      { week: 28, focus: "Global Governance", daysCount: 7 }
    ],
    studyHoursPerDay: 9,
    answerWritingPerDay: 5
  },
  {
    month: 8,
    theme: "Optional Subject Intensive Study",
    overview: "Focus on optional subject alongside GS revision",
    weeklyGoals: [
      { week: 29, focus: "Optional Paper 1 - Part 1", daysCount: 7 },
      { week: 30, focus: "Optional Paper 1 - Part 2", daysCount: 7 },
      { week: 31, focus: "Optional Paper 2 - Part 1", daysCount: 7 },
      { week: 32, focus: "Optional Paper 2 - Part 2", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    note: "If not taking optional, use this time for GS revision"
  },
  {
    month: 9,
    theme: "Ethics Answer Writing & Case Studies",
    overview: "Complete Ethics Paper 4 preparation with case studies",
    weeklyGoals: [
      { week: 33, focus: "Ethics Theory Complete", daysCount: 7 },
      { week: 34, focus: "Case Study Practice - Set 1", daysCount: 7 },
      { week: 35, focus: "Case Study Practice - Set 2", daysCount: 7 },
      { week: 36, focus: "Essay Writing Practice", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    caseStudiesPerDay: 3,
    essaysPerWeek: 2
  },
  {
    month: 10,
    theme: "First Comprehensive Revision - Phase 3 Begins",
    overview: "Complete first revision of all subjects",
    weeklyGoals: [
      { week: 37, focus: "History & Culture Revision", daysCount: 7 },
      { week: 38, focus: "Polity & Governance Revision", daysCount: 7 },
      { week: 39, focus: "Geography & Environment Revision", daysCount: 7 },
      { week: 40, focus: "Economy & S&T Revision", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    mockTestsPerWeek: 1,
    note: "Start taking weekly mock tests"
  },
  {
    month: 11,
    theme: "Second Comprehensive Revision & Previous Year Papers",
    overview: "Second revision with PYQ analysis",
    weeklyGoals: [
      { week: 41, focus: "PYQs 2020-2023 Analysis", daysCount: 7 },
      { week: 42, focus: "PYQs 2015-2019 Analysis", daysCount: 7 },
      { week: 43, focus: "Topic-wise Weak Areas", daysCount: 7 },
      { week: 44, focus: "Current Affairs Compilation", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    mockTestsPerWeek: 2,
    pyqSets: 10
  },
  {
    month: 12,
    theme: "Intensive Mock Test Series",
    overview: "Maximum mock tests and performance analysis",
    weeklyGoals: [
      { week: 45, focus: "Mock Tests + Analysis Week 1", daysCount: 7 },
      { week: 46, focus: "Mock Tests + Analysis Week 2", daysCount: 7 },
      { week: 47, focus: "Mock Tests + Analysis Week 3", daysCount: 7 },
      { week: 48, focus: "Mock Tests + Analysis Week 4", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    mockTestsPerWeek: 3,
    note: "Take 3 full-length tests per week"
  },
  {
    month: 13,
    theme: "Third Comprehensive Revision",
    overview: "Final detailed revision of all topics",
    weeklyGoals: [
      { week: 49, focus: "All Subjects Quick Revision - Part 1", daysCount: 7 },
      { week: 50, focus: "All Subjects Quick Revision - Part 2", daysCount: 7 },
      { week: 51, focus: "Important Topics Deep Dive", daysCount: 7 },
      { week: 52, focus: "Current Affairs 12-Month Compilation", daysCount: 7 }
    ],
    studyHoursPerDay: 10,
    mockTestsPerWeek: 2,
    revisionRound: 3
  },
  {
    month: 14,
    theme: "Final Month - Quick Revision & Peak Performance",
    overview: "Quick revision of all topics and mock tests",
    weeklyGoals: [
      { week: 53, focus: "Static GS Quick Revision", daysCount: 7 },
      { week: 54, focus: "Current Affairs Final Revision", daysCount: 7 },
      { week: 55, focus: "Ethics & Essay Final Touch", daysCount: 7 },
      { week: 56, focus: "Optional Subject Final Revision", daysCount: 7 }
    ],
    studyHoursPerDay: 9,
    mockTestsPerWeek: 3,
    note: "Reduce stress, focus on confidence"
  },
  {
    month: 15,
    theme: "Last Month - Consolidation & Mental Preparation",
    overview: "Final touches and mental preparation for exam",
    weeklyGoals: [
      { week: 57, focus: "Important Facts & Figures", daysCount: 7 },
      { week: 58, focus: "Current Affairs Recent 3 Months", daysCount: 7 },
      { week: 59, focus: "Exam Strategy & Practice", daysCount: 7 },
      { week: 60, focus: "Confidence Building & Light Revision", daysCount: 7 }
    ],
    studyHoursPerDay: 6,
    mockTestsPerWeek: 1,
    note: "Light study, focus on health and mental peace. You are ready!"
  }
];

// Study Tips by Phase
const phaseWiseStrategy = {
  phase1: {
    name: "Foundation (Months 1-4)",
    priority: "Building strong basics",
    focus: [
      "Complete all NCERTs thoroughly",
      "Understand concepts, don't memorize",
      "Make detailed notes",
      "Start current affairs reading",
      "Practice basic MCQs"
    ],
    avoidMistakes: [
      "Don't skip any NCERT",
      "Don't jump to advanced books",
      "Don't ignore current affairs",
      "Don't skip note-making"
    ]
  },
  phase2: {
    name: "Advanced Preparation (Months 5-9)",
    priority: "Depth in subjects and answer writing",
    focus: [
      "Read standard reference books",
      "Daily answer writing (3-5 answers)",
      "Current affairs in-depth analysis",
      "Start optional subject",
      "Weekly mock tests from Month 6",
      "PYQ analysis begins"
    ],
    avoidMistakes: [
      "Don't read too many books",
      "Don't skip answer writing",
      "Don't ignore mock test analysis",
      "Don't neglect optional if taking"
    ]
  },
  phase3: {
    name: "Revision & Practice (Months 10-13)",
    priority: "Revision and test practice",
    focus: [
      "Complete 3 revisions of all subjects",
      "2-3 mock tests per week",
      "Detailed test analysis",
      "Current affairs compilation",
      "Weak area improvement",
      "Ethics case study practice"
    ],
    avoidMistakes: [
      "Don't start new topics",
      "Don't skip mock tests",
      "Don't ignore weak areas",
      "Don't compare scores with others"
    ]
  },
  phase4: {
    name: "Final Preparation (Months 14-15)",
    priority: "Quick revision and confidence",
    focus: [
      "Quick fact-based revision",
      "Recent current affairs",
      "Mock tests for practice",
      "Exam strategy finalization",
      "Mental and physical health",
      "Positive mindset"
    ],
    avoidMistakes: [
      "Don't try to read new material",
      "Don't take too many tests",
      "Don't panic or stress",
      "Don't change strategy now"
    ]
  }
};

// Month-wise Current Affairs Focus
const currentAffairsFocus = {
  everyMonth: [
    "Government schemes and policies",
    "Important committees and reports",
    "International relations developments",
    "Economic data and indicators",
    "Science and technology news",
    "Environmental issues",
    "Social issues and judgments",
    "Sports and awards",
    "Books and authors"
  ],
  compilation: {
    monthly: "Make topic-wise notes",
    quarterly: "Revise 3-month compilation",
    halfYearly: "Integrate with static topics",
    yearly: "Complete year-end revision"
  }
};

module.exports = {
  extendedRoadmapMonths,
  phaseWiseStrategy,
  currentAffairsFocus
};
