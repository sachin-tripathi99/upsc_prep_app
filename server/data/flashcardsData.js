// Comprehensive Flashcard Database for UPSC Preparation
// Covers current affairs, history, polity, geography, economy, environment, and more

const flashcardsData = [
  // Ancient Indian History Flashcards
  {
    question: "What are the four major phases of the Indus Valley Civilization?",
    answer: "1. Early Harappan (3300-2600 BCE)\n2. Mature Harappan (2600-1900 BCE)\n3. Late Harappan (1900-1300 BCE)\n4. Post-Harappan\n\nKey features: Urban planning, drainage system, Great Bath, granaries, seals with Pashupati.",
    category: "History",
    difficulty: "Medium",
    topic: "Ancient India - Indus Valley Civilization",
    tags: ["IVC", "Ancient India", "Prehistoric"]
  },
  {
    question: "What is Ashoka's Dhamma? List its key principles.",
    answer: "Ashoka's Dhamma was a moral code emphasizing:\n1. Non-violence (Ahimsa)\n2. Tolerance towards all religions\n3. Respect for parents and elders\n4. Humane treatment of servants\n5. Generosity towards Brahmanas and Shramanas\n6. Obedience to mother and father\n\nIt was propagated through Rock Edicts and Pillar Edicts.",
    category: "History",
    difficulty: "Medium",
    topic: "Ancient India - Mauryan Empire",
    tags: ["Ashoka", "Dhamma", "Mauryan Empire"]
  },
  {
    question: "Compare Early Vedic Period vs Later Vedic Period",
    answer: "Early Vedic (1500-1000 BCE):\n- Pastoral economy\n- Equality in society\n- Women had freedom\n- Tribal organization\n- Worship of nature gods\n\nLater Vedic (1000-600 BCE):\n- Agricultural economy\n- Caste system rigidity increased\n- Women's status declined\n- Territorial kingdoms emerged\n- Complex rituals developed",
    category: "History",
    difficulty: "Hard",
    topic: "Ancient India - Vedic Period",
    tags: ["Vedic Period", "Comparison", "Social Changes"]
  },

  // Medieval Indian History
  {
    question: "What were the main administrative reforms of Alauddin Khilji?",
    answer: "1. Market Control System - Fixed prices for essential commodities\n2. Strong spy network (Barids)\n3. Abolished hereditary succession of officers\n4. Revenue reforms - Measurement of land\n5. Large standing army\n6. Strict price control through Sahana-i-Mandi\n7. Banned social gatherings to prevent conspiracies",
    category: "History",
    difficulty: "Hard",
    topic: "Medieval India - Delhi Sultanate",
    tags: ["Alauddin Khilji", "Administration", "Delhi Sultanate"]
  },
  {
    question: "Explain Akbar's Mansabdari System",
    answer: "Mansabdari was a military and civil administration system:\n- Mansabdars were military commanders and administrators\n- Two ranks: Zat (personal status) and Sawar (cavalry command)\n- Salary paid in cash or jagir (land revenue)\n- Not hereditary\n- Helped centralize administration\n- Created loyalty to emperor\n- Numbered ranks from 10 to 10,000",
    category: "History",
    difficulty: "Hard",
    topic: "Medieval India - Mughal Empire",
    tags: ["Akbar", "Mansabdari", "Administration"]
  },

  // Modern Indian History
  {
    question: "What were the causes of the 1857 Revolt?",
    answer: "Political: Doctrine of Lapse, annexation policies\nEconomic: Land revenue policies, destruction of handicrafts, drain of wealth\nSocial: Interference in customs, abolition of Sati\nReligious: Fears of forced conversion, greased cartridges issue\nMilitary: Low salary, racial discrimination, lack of promotion\nImmediate: Greased cartridges incident at Meerut",
    category: "History",
    difficulty: "Medium",
    topic: "Modern India - 1857 Revolt",
    tags: ["1857 Revolt", "Freedom Struggle", "British India"]
  },
  {
    question: "What were the main features of the Non-Cooperation Movement (1920-22)?",
    answer: "Led by Mahatma Gandhi\nKey features:\n1. Surrender of titles and honors\n2. Boycott of legislative councils\n3. Boycott of government schools and colleges\n4. Boycott of British courts\n5. Boycott of foreign cloth\n6. Promotion of khadi and swadeshi\n7. Withdrawal from government service\n\nWithdrawn after Chauri Chaura incident (1922)",
    category: "History",
    difficulty: "Medium",
    topic: "Modern India - Freedom Movement",
    tags: ["Gandhi", "Non-Cooperation", "Freedom Struggle"]
  },

  // Indian Polity Flashcards
  {
    question: "What are the main features of the Indian Constitution Preamble?",
    answer: "WE, THE PEOPLE OF INDIA:\n1. SOVEREIGN - Independent, not subordinate\n2. SOCIALIST - Social and economic equality (added 42nd Amendment)\n3. SECULAR - No state religion (added 42nd Amendment)\n4. DEMOCRATIC - Government by the people\n5. REPUBLIC - Elected head of state\n\nObjectives: JUSTICE, LIBERTY, EQUALITY, FRATERNITY",
    category: "Polity",
    difficulty: "Easy",
    topic: "Indian Constitution - Preamble",
    tags: ["Preamble", "Constitution", "Basics"]
  },
  {
    question: "List all Fundamental Rights with Articles",
    answer: "1. Right to Equality (Art 14-18)\n2. Right to Freedom (Art 19-22)\n3. Right against Exploitation (Art 23-24)\n4. Right to Freedom of Religion (Art 25-28)\n5. Cultural and Educational Rights (Art 29-30)\n6. Right to Constitutional Remedies (Art 32)\n\nNote: Right to Property removed by 44th Amendment (1978)",
    category: "Polity",
    difficulty: "Medium",
    topic: "Indian Constitution - Fundamental Rights",
    tags: ["Fundamental Rights", "Constitution", "Articles"]
  },
  {
    question: "What are the grounds for removal of the President of India?",
    answer: "Impeachment for violation of Constitution (Art 61):\n\nProcedure:\n1. Charges preferred by either House\n2. Resolution needs 1/4th members' signature\n3. 14 days' notice required\n4. Passed by 2/3rd majority of total membership\n5. Investigated by the other House\n6. President has right to defend\n7. If charges proved, removal resolution passed by 2/3rd majority",
    category: "Polity",
    difficulty: "Hard",
    topic: "Indian Constitution - President",
    tags: ["President", "Impeachment", "Removal"]
  },

  // Geography Flashcards
  {
    question: "Explain the mechanism of Indian Monsoon",
    answer: "Indian Monsoon mechanism:\n1. Differential heating of land and sea\n2. ITCZ shift northward (near Himalayas) in summer\n3. High pressure over Indian Ocean\n4. Low pressure over North India\n5. Moisture-laden winds from ocean to land\n6. South-West monsoon (June-September)\n7. North-East monsoon (October-December) - retreating monsoon\n\nFactors: Himalayas, Tibetan Plateau, Jet Streams, El Nino/La Nina",
    category: "Geography",
    difficulty: "Hard",
    topic: "Indian Geography - Climate",
    tags: ["Monsoon", "Climate", "Indian Geography"]
  },
  {
    question: "Name the major physiographic divisions of India",
    answer: "1. The Himalayan Mountains\n   - Trans Himalayas, Greater Himalayas, Lesser Himalayas, Shiwaliks\n\n2. The Northern Plains\n   - Punjab Plains, Ganga Plains, Brahmaputra Plains\n\n3. The Peninsular Plateau\n   - Deccan Plateau, Central Highlands, North-Eastern Plateau\n\n4. The Indian Desert (Thar)\n\n5. The Coastal Plains\n   - Western Coastal Plains, Eastern Coastal Plains\n\n6. The Islands\n   - Andaman & Nicobar, Lakshadweep",
    category: "Geography",
    difficulty: "Medium",
    topic: "Indian Geography - Physical Features",
    tags: ["Physiography", "Indian Geography", "Physical Features"]
  },

  // Economy Flashcards
  {
    question: "What is GDP? How is it different from GNP and NDP?",
    answer: "GDP (Gross Domestic Product): Total value of all goods and services produced within country's borders in a year.\n\nGNP (Gross National Product): GDP + Net factor income from abroad\n\nNDP (Net Domestic Product): GDP - Depreciation\n\nNNP (Net National Product): GNP - Depreciation = National Income\n\nKey: GDP is geographical, GNP is based on nationality",
    category: "Economy",
    difficulty: "Medium",
    topic: "Indian Economy - National Income",
    tags: ["GDP", "GNP", "National Income"]
  },
  {
    question: "Explain the objectives of India's Five Year Plans",
    answer: "Five Year Plans (1951-2017) objectives:\n1. Economic growth\n2. Self-reliance\n3. Social justice\n4. Poverty alleviation\n5. Employment generation\n6. Modernization\n7. Regional balance\n\nReplaced by NITI Aayog in 2015\n- NITI Aayog focuses on cooperative federalism\n- Bottom-up approach\n- Three-year action agenda\n- Seven-year strategy",
    category: "Economy",
    difficulty: "Medium",
    topic: "Indian Economy - Planning",
    tags: ["Five Year Plans", "NITI Aayog", "Planning"]
  },

  // Environment & Ecology
  {
    question: "What is the Paris Agreement on Climate Change?",
    answer: "Paris Agreement (2015) - UNFCCC:\n\nKey Points:\n1. Keep global temperature rise below 2°C (preferably 1.5°C)\n2. Nationally Determined Contributions (NDCs) by each country\n3. Climate finance: $100 billion annually by developed nations\n4. Review mechanism every 5 years\n5. Legally binding agreement\n6. Came into force: November 2016\n\nIndia's commitments:\n- Reduce emissions intensity by 33-35% by 2030\n- 40% non-fossil fuel capacity",
    category: "Environment",
    difficulty: "Hard",
    topic: "Environment - Climate Change",
    tags: ["Paris Agreement", "Climate Change", "International"]
  },
  {
    question: "What are biodiversity hotspots? Name India's biodiversity hotspots.",
    answer: "Biodiversity Hotspot criteria:\n1. At least 1,500 endemic vascular plant species\n2. Lost 70% or more of original habitat\n\nIndia's 4 Biodiversity Hotspots:\n1. Himalayas (entire range)\n2. Indo-Burma (Eastern Himalayas, Northeast)\n3. Western Ghats and Sri Lanka\n4. Sundaland (Nicobar Islands)\n\nThese contain exceptional concentration of endemic species facing severe habitat loss.",
    category: "Environment",
    difficulty: "Medium",
    topic: "Environment - Biodiversity",
    tags: ["Biodiversity", "Hotspots", "Conservation"]
  },

  // Science & Technology
  {
    question: "What is Artificial Intelligence? List its applications in governance.",
    answer: "AI: Machines simulating human intelligence - learning, reasoning, problem-solving.\n\nApplications in Governance:\n1. E-governance - Chatbots for citizen services\n2. Predictive policing and crime prevention\n3. Traffic management systems\n4. Healthcare diagnostics\n5. Agriculture - crop prediction, pest control\n6. Financial inclusion - credit scoring\n7. Disaster management - early warning systems\n8. Education - personalized learning\n\nChallenges: Ethics, privacy, job displacement",
    category: "Science & Technology",
    difficulty: "Medium",
    topic: "S&T - Artificial Intelligence",
    tags: ["AI", "Technology", "Governance"]
  },

  // Current Affairs (Sample - These should be updated regularly)
  {
    question: "What is the National Education Policy 2020? Highlight key features.",
    answer: "NEP 2020 replaced NEP 1986:\n\nKey Features:\n1. 5+3+3+4 structure (instead of 10+2)\n2. Mother tongue as medium till Class 5\n3. Multidisciplinary approach\n4. No rigid separation of streams\n5. Multiple entry-exit in higher education\n6. 50% GER in higher education by 2035\n7. Vocational education from Class 6\n8. Board exams reform\n9. Single regulator for higher education\n10. Common entrance exam for universities",
    category: "Current Affairs",
    difficulty: "Medium",
    topic: "Education - Policy",
    tags: ["NEP 2020", "Education", "Policy"]
  },
  {
    question: "What is the Ayushman Bharat scheme?",
    answer: "Ayushman Bharat - National Health Protection Mission (2018):\n\nTwo Components:\n1. Health and Wellness Centers (1.5 lakh)\n   - Comprehensive primary healthcare\n   - Free essential drugs and diagnostics\n\n2. Pradhan Mantri Jan Arogya Yojana (PM-JAY)\n   - World's largest health insurance scheme\n   - Coverage: ₹5 lakh per family per year\n   - Covers 10.74 crore poor families\n   - Cashless treatment at empanelled hospitals\n   - 1,393 procedures covered",
    category: "Current Affairs",
    difficulty: "Medium",
    topic: "Social Sector - Healthcare",
    tags: ["Ayushman Bharat", "Healthcare", "Government Scheme"]
  },

  // Ethics & Integrity
  {
    question: "What are the seven principles of public life (Nolan Principles)?",
    answer: "Nolan Committee Principles:\n\n1. SELFLESSNESS - Serve public interest only\n2. INTEGRITY - Not place self under financial obligations\n3. OBJECTIVITY - Merit-based decisions\n4. ACCOUNTABILITY - Answerable for actions\n5. OPENNESS - Transparent decisions\n6. HONESTY - Truthful in dealings\n7. LEADERSHIP - Promote these principles by example\n\nAdopted by UK (1995), relevant for civil services worldwide including India.",
    category: "Ethics",
    difficulty: "Medium",
    topic: "Ethics - Public Service Values",
    tags: ["Ethics", "Nolan Principles", "Public Service"]
  },

  // International Relations
  {
    question: "What is India's Act East Policy?",
    answer: "Act East Policy (evolved from Look East Policy - 2014):\n\nObjectives:\n1. Promote economic, strategic, and cultural ties with Indo-Pacific\n2. Focus on ASEAN countries, East Asia, Oceania\n3. Enhance connectivity - physical and digital\n4. Counter China's influence\n\nKey Initiatives:\n1. Participation in EAS, ARF, ADMM+\n2. India-ASEAN FTA\n3. Mekong-Ganga Cooperation\n4. BIMSTEC\n5. Quad partnership\n6. Infrastructure projects in Myanmar, Bangladesh\n\nSignificance: Maritime security, trade, strategic depth",
    category: "International Relations",
    difficulty: "Hard",
    topic: "IR - India's Foreign Policy",
    tags: ["Act East", "Foreign Policy", "ASEAN"]
  },

  // More flashcards covering various topics
  {
    question: "What is the difference between Money Bill and Finance Bill?",
    answer: "Money Bill (Art 110):\n- Only taxation and government expenditure\n- Can be introduced only in Lok Sabha\n- Rajya Sabha has limited powers (14 days, recommendations only)\n- President's recommendation required\n- Speaker certifies as Money Bill\n\nFinance Bill:\n- Type 1: Contains Art 110 matters - treated as Money Bill\n- Type 2: Contains other financial matters too\n- Both Houses have equal powers\n- Can be amended by Rajya Sabha\n\nBudget usually presented as Finance Bill.",
    category: "Polity",
    difficulty: "Hard",
    topic: "Parliament - Legislative Procedures",
    tags: ["Money Bill", "Finance Bill", "Parliament"]
  },
  {
    question: "Explain the concept of Fiscal Deficit and Revenue Deficit",
    answer: "Fiscal Deficit: Total expenditure - Total receipts (excluding borrowings)\n- Indicates government's borrowing requirement\n- FD = Total Expenditure - Revenue Receipts - Non-debt Capital Receipts\n- Govt target: 3% of GDP (FRBM Act)\n\nRevenue Deficit: Revenue Expenditure - Revenue Receipts\n- Indicates govt spending more on routine items than earning\n- Means govt borrowing to meet current expenses\n- Should be zero ideally\n\nPrimary Deficit: Fiscal Deficit - Interest Payments",
    category: "Economy",
    difficulty: "Hard",
    topic: "Public Finance - Deficits",
    tags: ["Fiscal Deficit", "Revenue Deficit", "Budget"]
  }
];

module.exports = flashcardsData;
