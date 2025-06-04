// Central data structure for Consulteo products
const consulteoData = {
  categories: {
    managers: "Managers",
    lead: "Lead", 
    consultant: "Consultant",
    interns: "Interns"
  },
  
  products: {
    // Managers
    "MGR001": {
      id: "MGR001",
      category: "managers",
      firstName: "Marie",
      lastName: "Dubois",
      ean: "3701234567890",
      sku: "CONS-MGR-001",
      price: 2500,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      shortDescription: "Experienced project manager with 10+ years in digital transformation.",
      longDescription: "Marie is a seasoned project manager specializing in digital transformation initiatives. With over 10 years of experience, she has successfully led numerous large-scale projects across various industries including finance, retail, and healthcare. Her expertise includes agile methodologies, stakeholder management, and team leadership. Marie is known for her ability to deliver complex projects on time and within budget while maintaining high quality standards.",
      skills: ["Project Management", "Agile/Scrum", "Digital Transformation", "Team Leadership"]
    },
    "MGR002": {
      id: "MGR002", 
      category: "managers",
      firstName: "Thomas",
      lastName: "Martin",
      ean: "3701234567891",
      sku: "CONS-MGR-002", 
      price: 2800,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      shortDescription: "Strategic consultant manager with expertise in business optimization.",
      longDescription: "Thomas brings over 12 years of experience in strategic consulting and business optimization. He specializes in operational excellence, process improvement, and organizational transformation. Thomas has worked with Fortune 500 companies to streamline their operations and increase efficiency. His analytical approach and leadership skills make him an invaluable asset for complex strategic initiatives.",
      skills: ["Strategic Planning", "Business Optimization", "Process Improvement", "Change Management"]
    },
    "MGR003": {
      id: "MGR003",
      category: "managers", 
      firstName: "Sophie",
      lastName: "Leroy",
      ean: "3701234567892",
      sku: "CONS-MGR-003",
      price: 2600,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      shortDescription: "Technology manager specialized in data analytics and AI implementation.",
      longDescription: "Sophie is a technology-focused manager with deep expertise in data analytics and artificial intelligence implementation. She has led multiple successful AI transformation projects, helping organizations leverage data-driven insights for strategic decision making. Her technical background combined with strong management skills makes her perfect for technology-driven consulting projects.",
      skills: ["Data Analytics", "AI Implementation", "Technology Strategy", "Digital Innovation"]
    },
    "MGR004": {
      id: "MGR004",
      category: "managers",
      firstName: "Pierre",
      lastName: "Rousseau", 
      ean: "3701234567893",
      sku: "CONS-MGR-004",
      price: 2700,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      shortDescription: "Financial transformation manager with extensive M&A experience.",
      longDescription: "Pierre specializes in financial transformation and mergers & acquisitions consulting. With 15 years of experience in the financial sector, he has guided numerous companies through complex financial restructuring and M&A processes. His expertise includes financial modeling, due diligence, and post-merger integration strategies.",
      skills: ["Financial Modeling", "M&A Strategy", "Due Diligence", "Financial Transformation"]
    },
    "MGR005": {
      id: "MGR005",
      category: "managers",
      firstName: "Caroline",
      lastName: "Moreau",
      ean: "3701234567894", 
      sku: "CONS-MGR-005",
      price: 2550,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      shortDescription: "Change management expert with focus on organizational culture.",
      longDescription: "Caroline is a change management specialist with a deep understanding of organizational culture and human dynamics. She has successfully led cultural transformation initiatives in multinational corporations, helping organizations adapt to new business models and market conditions. Her people-centric approach ensures sustainable change implementation.",
      skills: ["Change Management", "Organizational Culture", "Leadership Development", "Communication Strategy"]
    },
    "MGR006": {
      id: "MGR006",
      category: "managers", 
      firstName: "Alexandre",
      lastName: "Girard",
      ean: "3701234567895",
      sku: "CONS-MGR-006",
      price: 2750,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      shortDescription: "Operations manager specialized in supply chain optimization.",
      longDescription: "Alexandre is an operations management expert with specialized knowledge in supply chain optimization and logistics. He has worked with major retail and manufacturing companies to streamline their supply chain processes, reduce costs, and improve efficiency. His systematic approach to operations improvement has delivered significant ROI for his clients.",
      skills: ["Supply Chain Management", "Operations Optimization", "Logistics Strategy", "Cost Reduction"]
    },

    // Lead Consultants
    "LED001": {
      id: "LED001",
      category: "lead",
      firstName: "Julien",
      lastName: "Bernard",
      ean: "3701234567896",
      sku: "CONS-LED-001",
      price: 1800,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      shortDescription: "Lead consultant in digital marketing and customer experience.",
      longDescription: "Julien is a lead consultant specializing in digital marketing strategies and customer experience optimization. With 8 years of experience, he has helped numerous brands develop comprehensive digital marketing strategies that drive customer engagement and revenue growth. His expertise spans across SEO, SEM, social media marketing, and customer journey mapping.",
      skills: ["Digital Marketing", "Customer Experience", "SEO/SEM", "Analytics"]
    },
    "LED002": {
      id: "LED002",
      category: "lead", 
      firstName: "Amélie",
      lastName: "Petit",
      ean: "3701234567897",
      sku: "CONS-LED-002",
      price: 1900,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      shortDescription: "Lead data scientist with expertise in machine learning applications.",
      longDescription: "Amélie is a lead data scientist with deep expertise in machine learning and advanced analytics. She has developed predictive models and AI solutions for various industries including e-commerce, finance, and healthcare. Her technical skills combined with business acumen make her excellent at translating complex data insights into actionable business strategies.",
      skills: ["Machine Learning", "Data Science", "Predictive Analytics", "Python/R"]
    },
    "LED003": {
      id: "LED003",
      category: "lead",
      firstName: "Nicolas",
      lastName: "Roux",
      ean: "3701234567898", 
      sku: "CONS-LED-003",
      price: 1750,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      shortDescription: "Lead consultant in business process automation and efficiency.",
      longDescription: "Nicolas specializes in business process automation and operational efficiency improvements. He has extensive experience in analyzing existing business processes, identifying bottlenecks, and implementing automated solutions that increase productivity and reduce operational costs. His methodical approach ensures sustainable process improvements.",
      skills: ["Process Automation", "Business Analysis", "Workflow Optimization", "RPA Implementation"]
    },
    "LED004": {
      id: "LED004",
      category: "lead",
      firstName: "Camille",
      lastName: "Fournier",
      ean: "3701234567899",
      sku: "CONS-LED-004", 
      price: 1850,
      image: "https://images.unsplash.com/photo-1594736797933-d0bd73c2a6c8?w=400&h=400&fit=crop",
      shortDescription: "Lead UX/UI consultant focused on user-centered design.",
      longDescription: "Camille is a lead UX/UI consultant with a passion for user-centered design and digital product development. She has worked with startups and established companies to create intuitive and engaging user experiences. Her design thinking approach and user research expertise help organizations build products that truly meet customer needs.",
      skills: ["UX/UI Design", "User Research", "Design Thinking", "Prototyping"]
    },
    "LED005": {
      id: "LED005",
      category: "lead",
      firstName: "Maxime", 
      lastName: "Durand",
      ean: "3701234567900",
      sku: "CONS-LED-005",
      price: 1950,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      shortDescription: "Lead cybersecurity consultant with enterprise security expertise.",
      longDescription: "Maxime is a lead cybersecurity consultant specializing in enterprise security architecture and risk management. He has helped organizations across various sectors strengthen their cybersecurity posture, implement security frameworks, and respond to security incidents. His comprehensive approach covers both technical and organizational aspects of cybersecurity.",
      skills: ["Cybersecurity", "Risk Management", "Security Architecture", "Compliance"]
    },
    "LED006": {
      id: "LED006",
      category: "lead",
      firstName: "Émilie", 
      lastName: "Simon",
      ean: "3701234567901",
      sku: "CONS-LED-006",
      price: 1800,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
      shortDescription: "Lead sustainability consultant for ESG strategy implementation.",
      longDescription: "Émilie is a lead consultant in sustainability and ESG (Environmental, Social, Governance) strategy implementation. She helps organizations develop and execute comprehensive sustainability programs that align with business objectives and regulatory requirements. Her expertise includes carbon footprint assessment, sustainable supply chain design, and ESG reporting.",
      skills: ["Sustainability Strategy", "ESG Compliance", "Carbon Assessment", "Sustainable Operations"]
    },

    // Consultants  
    "CON001": {
      id: "CON001",
      category: "consultant",
      firstName: "Lucas",
      lastName: "Michel",
      ean: "3701234567902",
      sku: "CONS-CON-001", 
      price: 1200,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      shortDescription: "Business analyst with expertise in requirements gathering and documentation.",
      longDescription: "Lucas is a skilled business analyst with strong expertise in requirements gathering, process documentation, and stakeholder management. He has experience working with cross-functional teams to analyze business needs and translate them into technical requirements. His attention to detail and communication skills make him valuable for any consulting project.",
      skills: ["Business Analysis", "Requirements Gathering", "Process Documentation", "Stakeholder Management"]
    },
    "CON002": {
      id: "CON002",
      category: "consultant",
      firstName: "Clara",
      lastName: "Garcia",
      ean: "3701234567903",
      sku: "CONS-CON-002",
      price: 1150,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop", 
      shortDescription: "Marketing consultant specialized in social media and content strategy.",
      longDescription: "Clara is a marketing consultant with specialized knowledge in social media marketing and content strategy. She has helped numerous brands build their online presence, create engaging content, and develop effective social media campaigns. Her creative approach and understanding of digital trends make her an asset for marketing-focused projects.",
      skills: ["Social Media Marketing", "Content Strategy", "Brand Development", "Campaign Management"]
    },
    "CON003": {
      id: "CON003",
      category: "consultant", 
      firstName: "Antoine",
      lastName: "Lemoine",
      ean: "3701234567904",
      sku: "CONS-CON-003",
      price: 1300,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      shortDescription: "Financial analyst with focus on budgeting and financial modeling.",
      longDescription: "Antoine is a financial analyst with strong skills in budgeting, financial modeling, and performance analysis. He has experience working with various industries to develop financial forecasts, analyze investment opportunities, and optimize financial performance. His analytical mindset and attention to detail ensure accurate financial insights.",
      skills: ["Financial Analysis", "Budget Planning", "Financial Modeling", "Performance Analysis"]
    },
    "CON004": {
      id: "CON004",
      category: "consultant",
      firstName: "Léa",
      lastName: "Robert",
      ean: "3701234567905", 
      sku: "CONS-CON-004",
      price: 1250,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      shortDescription: "HR consultant specializing in talent acquisition and employee engagement.",
      longDescription: "Léa is an HR consultant with expertise in talent acquisition, employee engagement, and organizational development. She has helped companies improve their recruitment processes, enhance employee satisfaction, and build strong organizational cultures. Her people-focused approach ensures sustainable HR improvements.",
      skills: ["Talent Acquisition", "Employee Engagement", "HR Strategy", "Organizational Development"]
    },
    "CON005": {
      id: "CON005",
      category: "consultant",
      firstName: "Hugo",
      lastName: "Morel", 
      ean: "3701234567906",
      sku: "CONS-CON-005",
      price: 1350,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      shortDescription: "IT consultant with skills in software development and system integration.",
      longDescription: "Hugo is an IT consultant with strong technical skills in software development and system integration. He has experience working with various programming languages and technologies to develop custom solutions and integrate existing systems. His problem-solving abilities and technical expertise make him valuable for technology-focused consulting projects.",
      skills: ["Software Development", "System Integration", "Technical Analysis", "Problem Solving"]
    },
    "CON006": {
      id: "CON006",
      category: "consultant",
      firstName: "Chloé",
      lastName: "Blanc",
      ean: "3701234567907",
      sku: "CONS-CON-006", 
      price: 1200,
      image: "https://images.unsplash.com/photo-1594736797933-d0bd73c2a6c8?w=400&h=400&fit=crop",
      shortDescription: "Operations consultant focused on quality assurance and process improvement.",
      longDescription: "Chloé is an operations consultant with a focus on quality assurance and process improvement. She has experience implementing quality management systems, conducting process audits, and developing standard operating procedures. Her systematic approach ensures consistent quality and operational efficiency.",
      skills: ["Quality Assurance", "Process Improvement", "Operations Management", "Quality Systems"]
    },

    // Interns
    "INT001": {
      id: "INT001",
      category: "interns",
      firstName: "Emma",
      lastName: "Lefevre",
      ean: "3701234567908", 
      sku: "CONS-INT-001",
      price: 400,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      shortDescription: "Business student intern with strong analytical and research skills.",
      longDescription: "Emma is a motivated business student intern with excellent analytical and research capabilities. Currently pursuing her Master's in Business Administration, she has demonstrated strong academic performance and practical problem-solving skills. Her fresh perspective and eagerness to learn make her a valuable addition to any consulting team.",
      skills: ["Research", "Data Analysis", "Academic Excellence", "Fresh Perspective"]
    },
    "INT002": {
      id: "INT002",
      category: "interns",
      firstName: "Tom",
      lastName: "Nguyen",
      ean: "3701234567909",
      sku: "CONS-INT-002", 
      price: 450,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      shortDescription: "Engineering student with focus on data science and programming.",
      longDescription: "Tom is an engineering student specializing in data science and programming. He has hands-on experience with Python, R, and various data analysis tools. His technical background and enthusiasm for data-driven solutions make him perfect for technology-focused consulting assignments that require analytical support.",
      skills: ["Programming", "Data Science", "Python/R", "Technical Analysis"]
    },
    "INT003": {
      id: "INT003",
      category: "interns",
      firstName: "Sarah",
      lastName: "Laurent", 
      ean: "3701234567910",
      sku: "CONS-INT-003",
      price: 380,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      shortDescription: "Marketing student with social media expertise and creative skills.",
      longDescription: "Sarah is a marketing student with natural talent for social media and creative communication. She has managed social media accounts for student organizations and demonstrated strong skills in content creation and digital marketing. Her understanding of current digital trends brings valuable insights to marketing projects.",
      skills: ["Social Media", "Content Creation", "Digital Marketing", "Creative Communication"]
    },
    "INT004": {
      id: "INT004",
      category: "interns", 
      firstName: "Paul",
      lastName: "Mercier",
      ean: "3701234567911",
      sku: "CONS-INT-004",
      price: 420,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      shortDescription: "Finance student with strong quantitative skills and Excel expertise.",
      longDescription: "Paul is a finance student with exceptional quantitative skills and advanced Excel expertise. He has completed internships in financial analysis and demonstrated strong capabilities in financial modeling and data analysis. His attention to detail and numerical skills make him ideal for financial consulting support.",
      skills: ["Financial Analysis", "Excel Expertise", "Quantitative Skills", "Financial Modeling"]
    },
    "INT005": {
      id: "INT005",
      category: "interns",
      firstName: "Manon",
      lastName: "Perrin",
      ean: "3701234567912",
      sku: "CONS-INT-005", 
      price: 390,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      shortDescription: "Design student with UX/UI focus and prototyping experience.",
      longDescription: "Manon is a design student with a focus on UX/UI design and prototyping. She has worked on various design projects during her studies and has hands-on experience with design tools like Figma and Adobe Creative Suite. Her creative approach and user-centered mindset bring fresh design perspectives to consulting projects.",
      skills: ["UX/UI Design", "Prototyping", "Design Tools", "User-Centered Design"]
    },
    "INT006": {
      id: "INT006",
      category: "interns",
      firstName: "Théo", 
      lastName: "Faure",
      ean: "3701234567913",
      sku: "CONS-INT-006",
      price: 410,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      shortDescription: "Computer science student with web development and database skills.",
      longDescription: "Théo is a computer science student with strong skills in web development and database management. He has experience with JavaScript, HTML/CSS, and SQL, and has worked on several web development projects. His technical skills and problem-solving abilities make him valuable for IT-focused consulting assignments.",
      skills: ["Web Development", "Database Management", "JavaScript", "Problem Solving"]
    }
  },

  // Helper functions
  getProductsByCategory: function(category) {
    return Object.values(this.products).filter(product => product.category === category);
  },

  getProductById: function(id) {
    return this.products[id];
  },

  getRandomProducts: function(count = 3, excludeId = null) {
    const allProducts = Object.values(this.products);
    const filteredProducts = excludeId ? 
      allProducts.filter(p => p.id !== excludeId) : 
      allProducts;
    
    const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  getTopPicks: function() {
    // Return 6 featured products for homepage
    return [
      this.products["MGR001"], // Marie Dubois
      this.products["LED001"], // Julien Bernard  
      this.products["CON002"], // Clara Garcia
      this.products["MGR003"], // Sophie Leroy
      this.products["LED004"], // Camille Fournier
      this.products["INT002"]  // Tom Nguyen
    ];
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = consulteoData;
}
