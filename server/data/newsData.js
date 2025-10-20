// Sample News Articles Database
// In production, this would be fetched from The Hindu API or web scraping

const newsData = [
  {
    title: "India's GDP Growth Projections Revised Upward",
    content: "The Reserve Bank of India has revised India's GDP growth forecast for the current fiscal year to 7.2% from earlier estimate of 6.8%. This upward revision comes on the back of strong manufacturing sector performance and increased consumer spending.\n\nKey Highlights:\n- Manufacturing sector grew by 8.5% in the last quarter\n- Services sector showing robust growth\n- Agriculture sector recovery after good monsoon\n- Inflation remains within RBI's comfort zone\n- Foreign exchange reserves at all-time high\n\nImplications for UPSC:\n- Understand GDP calculation methods\n- Link with fiscal policy measures\n- Impact on employment generation\n- Role of RBI in economic management\n- Compare with other emerging economies",
    category: "Economy",
    importance: "High",
    date: new Date("2024-01-15"),
    tags: ["GDP", "Economic Growth", "RBI", "Manufacturing"],
    relatedTopics: ["Indian Economy", "Monetary Policy", "Economic Survey"]
  },
  {
    title: "Supreme Court Ruling on Article 370 Implementation",
    content: "The Supreme Court has upheld the constitutional validity of the abrogation of Article 370 that granted special status to Jammu and Kashmir. The five-judge constitution bench delivered a unanimous verdict.\n\nKey Points:\n- Article 370 was a temporary provision\n- Parliament's power to amend under Article 368\n- Constitutional morality and national integration\n- Statehood to be restored at appropriate time\n- Electoral process to be expedited\n\nUPSC Relevance:\n- Constitutional provisions and amendments\n- Federalism and state autonomy\n- Judicial review powers\n- Special status to states\n- Integration of princely states",
    category: "Polity",
    importance: "High",
    date: new Date("2024-01-10"),
    tags: ["Article 370", "Supreme Court", "J&K", "Constitution"],
    relatedTopics: ["Indian Polity", "Federalism", "Judicial Review"]
  },
  {
    title: "India Launches Mission to Study Climate Change Impact on Himalayas",
    content: "India has launched a comprehensive mission to study the impact of climate change on the Himalayan ecosystem. The mission will involve multiple research institutions and use satellite technology for monitoring.\n\nMission Objectives:\n- Monitor glacier melting patterns\n- Study biodiversity changes\n- Assess water resource availability\n- Predict natural disaster risks\n- Develop adaptation strategies\n\nScientific Approach:\n- Remote sensing and GIS mapping\n- On-ground research stations\n- Community participation\n- International collaboration\n- Regular monitoring and reporting\n\nUPSC Connect:\n- Climate change and its impacts\n- Himalayan ecosystem importance\n- Disaster management\n- Water security\n- International cooperation on climate",
    category: "Environment",
    importance: "High",
    date: new Date("2024-01-12"),
    tags: ["Climate Change", "Himalayas", "Environment", "Research"],
    relatedTopics: ["Environment and Ecology", "Geography", "Disaster Management"]
  },
  {
    title: "Digital India Initiative Reaches 1 Billion Digital Transactions Mark",
    content: "India's digital payment ecosystem has crossed a significant milestone with over 1 billion digital transactions recorded in a single month. This achievement places India among the global leaders in digital payments.\n\nKey Statistics:\n- UPI transactions: 750 million\n- Mobile wallet transactions: 150 million\n- Internet banking: 100 million\n- Merchant adoption increased by 40%\n- Rural areas showing 60% growth\n\nGovernment Initiatives:\n- Digital India campaign\n- JAM trinity (Jan Dhan-Aadhaar-Mobile)\n- BHIM app promotion\n- Infrastructure development\n- Financial literacy programs\n\nSignificance for UPSC:\n- Financial inclusion\n- Technology in governance\n- Cashless economy benefits\n- Digital infrastructure\n- Cyber security concerns",
    category: "Science & Technology",
    importance: "High",
    date: new Date("2024-01-14"),
    tags: ["Digital India", "UPI", "Financial Inclusion", "Technology"],
    relatedTopics: ["Indian Economy", "E-Governance", "Financial Sector"]
  },
  {
    title: "India-Middle East-Europe Economic Corridor Announced",
    content: "A groundbreaking economic corridor connecting India, Middle East, and Europe was announced at the G20 Summit. This corridor will include railway, port, and digital connectivity infrastructure.\n\nCorridor Components:\n- Railway network through Middle East\n- Port modernization in India and Gulf\n- Undersea cable for digital connectivity\n- Energy pipeline infrastructure\n- Trade facilitation agreements\n\nStrategic Importance:\n- Alternative to Belt and Road Initiative\n- Enhanced connectivity with Europe\n- Energy security for India\n- Economic cooperation\n- Geopolitical significance\n\nUPSC Perspective:\n- International relations and diplomacy\n- Economic corridors and connectivity\n- India's foreign policy\n- Strategic partnerships\n- Infrastructure development",
    category: "International",
    importance: "High",
    date: new Date("2024-01-08"),
    tags: ["IMEC", "Connectivity", "G20", "Infrastructure"],
    relatedTopics: ["International Relations", "Indian Economy", "Foreign Policy"]
  },
  {
    title: "New Education Policy Implementation: Progress Report",
    content: "The Ministry of Education released a comprehensive progress report on the implementation of National Education Policy 2020. Significant progress has been made in restructuring the education system.\n\nKey Achievements:\n- 40% schools adopted 5+3+3+4 structure\n- Multidisciplinary education in 200+ universities\n- National Credit Framework operational\n- Mother tongue instruction expanded\n- Vocational courses in 10,000 schools\n\nChallenges:\n- Infrastructure constraints\n- Teacher training requirements\n- Digital divide in rural areas\n- Funding requirements\n- Stakeholder resistance to change\n\nUPSC Relevance:\n- Education policy and reforms\n- Human resource development\n- Social sector development\n- Federal cooperation in education\n- 21st century skills development",
    category: "Polity",
    importance: "Medium",
    date: new Date("2024-01-11"),
    tags: ["NEP 2020", "Education", "Policy Implementation"],
    relatedTopics: ["Social Sector", "Human Development", "Education Policy"]
  },
  {
    title: "India's Renewable Energy Capacity Crosses 180 GW Milestone",
    content: "India has achieved a major milestone in its renewable energy journey with installed capacity crossing 180 GW. This achievement brings India closer to its 500 GW target by 2030.\n\nBreakdown:\n- Solar: 70 GW\n- Wind: 42 GW\n- Hydro: 50 GW\n- Biomass: 18 GW\n\nGovernment Initiatives:\n- Production Linked Incentive for solar manufacturing\n- Green hydrogen mission\n- Offshore wind policy\n- Rooftop solar program\n- Battery storage development\n\nGlobal Context:\n- Paris Agreement commitments\n- COP28 pledges\n- International Solar Alliance leadership\n- Climate justice advocacy\n\nUPSC Importance:\n- Energy security\n- Climate change mitigation\n- Sustainable development\n- Technology and innovation\n- International commitments",
    category: "Environment",
    importance: "High",
    date: new Date("2024-01-13"),
    tags: ["Renewable Energy", "Solar Power", "Climate Change"],
    relatedTopics: ["Environment", "Energy", "Sustainable Development"]
  },
  {
    title: "Women's Reservation Bill: Delimitation and Implementation Timeline",
    content: "The government has announced the roadmap for implementing the Women's Reservation Act, which provides 33% reservation for women in Lok Sabha and State Legislative Assemblies.\n\nImplementation Process:\n- Awaiting census completion\n- Delimitation exercise to follow\n- Expected implementation by 2029 elections\n- Will apply to Lok Sabha and state assemblies\n- One-third seats reserved for women\n\nHistorical Background:\n- First introduced in 1996\n- Pending for 27 years\n- Finally passed in 2023\n- Major constitutional amendment\n\nSignificance:\n- Women's empowerment\n- Political participation\n- Gender equality\n- Democratic representation\n- Social justice\n\nUPSC Context:\n- Constitutional amendments\n- Women empowerment measures\n- Electoral reforms\n- Social justice\n- Political representation",
    category: "Polity",
    importance: "High",
    date: new Date("2024-01-09"),
    tags: ["Women's Reservation", "Political Participation", "Gender Equality"],
    relatedTopics: ["Polity", "Social Justice", "Women's Rights"]
  },
  {
    title: "India Chairs UN Security Council Month: Key Focus Areas",
    content: "India assumed the presidency of the United Nations Security Council for a month, with focus on counter-terrorism, reformed multilateralism, and climate security.\n\nKey Agenda Items:\n- Debate on counter-terrorism\n- Climate security and peacekeeping\n- Women in peacekeeping operations\n- Reform of Security Council\n- Maintenance of international peace\n\nIndia's Priorities:\n- Comprehensive Convention on International Terrorism\n- Expansion of Security Council\n- Voice for Global South\n- Peacekeeping effectiveness\n- Maritime security\n\nUPSC Relevance:\n- International organizations\n- India's role in UN\n- Global governance\n- Security challenges\n- Multilateralism",
    category: "International",
    importance: "High",
    date: new Date("2024-01-07"),
    tags: ["UN Security Council", "International Relations", "Counter-terrorism"],
    relatedTopics: ["International Relations", "UN", "Foreign Policy"]
  },
  {
    title: "Agricultural Reforms: MSP for Pulses Increased by 15%",
    answer: "The government announced a significant increase in Minimum Support Price (MSP) for pulses to boost production and ensure farmer income security.\n\nMSP Increase Details:\n- Tur (Arhar): ₹7,000 per quintal\n- Moong: ₹8,558 per quintal\n- Urad: ₹6,950 per quintal\n- Average increase: 15% across pulses\n\nObjectives:\n- Reduce import dependency\n- Ensure protein security\n- Improve farmer income\n- Crop diversification\n- Sustainable agriculture\n\nSupporting Measures:\n- Procurement infrastructure\n- Warehousing facilities\n- Quality certification\n- Direct payment to farmers\n- Market linkages\n\nUPSC Importance:\n- Agricultural economics\n- Food security\n- MSP policy\n- Farmer welfare\n- Nutritional security",
    category: "Economy",
    importance: "Medium",
    date: new Date("2024-01-06"),
    tags: ["MSP", "Agriculture", "Farmer Welfare", "Pulses"],
    relatedTopics: ["Indian Economy", "Agriculture", "Food Security"]
  }
];

module.exports = newsData;
