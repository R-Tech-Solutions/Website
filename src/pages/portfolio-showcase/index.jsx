import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';
import ProjectModal from './components/ProjectModal';
import StatsOverview from './components/StatsOverview';

const PortfolioShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock portfolio data
  const portfolioProjects = [
    {
      id: 1,
      title: "NeuroFlow Analytics Platform",
      client: "TechCorp Industries",
      category: "Web Application",
      description: "Advanced data visualization platform with real-time analytics and machine learning insights for enterprise decision making.",
      fullDescription: `NeuroFlow Analytics Platform represents a paradigm shift in enterprise data visualization, combining cutting-edge machine learning algorithms with intuitive user interfaces. This comprehensive platform enables organizations to transform raw data into actionable insights through sophisticated visualization techniques and predictive analytics.\n\nThe platform serves as a central hub for data-driven decision making, offering real-time monitoring capabilities, customizable dashboards, and automated reporting systems that scale with organizational needs.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "Redis"],
      rating: 4.9,
      duration: "8 months",
      teamSize: "12 members",
      impact: "+340% ROI",
      challenge: "The client needed a unified platform to process and visualize massive datasets from multiple sources while maintaining real-time performance and ensuring data security compliance.",
      solution: "We developed a microservices architecture with advanced caching mechanisms, implemented machine learning pipelines for predictive analytics, and created an intuitive dashboard system with role-based access controls.",
      features: [
        "Real-time data processing and visualization",
        "Machine learning-powered predictive analytics",
        "Customizable dashboard builder",
        "Advanced filtering and search capabilities",
        "Automated report generation",
        "Multi-tenant architecture with role-based access",
        "API integration with 50+ data sources",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Discovery & Research",
          description: "Conducted comprehensive stakeholder interviews and analyzed existing data infrastructure to understand requirements and constraints.",
          duration: "3 weeks"
        },
        {
          title: "Architecture Design",
          description: "Designed scalable microservices architecture with emphasis on performance, security, and maintainability.",
          duration: "2 weeks"
        },
        {
          title: "MVP Development",
          description: "Built core functionality including data ingestion, basic visualization, and user authentication systems.",
          duration: "8 weeks"
        },
        {
          title: "ML Integration",
          description: "Implemented machine learning models for predictive analytics and automated insight generation.",
          duration: "6 weeks"
        },
        {
          title: "Testing & Optimization",
          description: "Comprehensive testing including performance optimization, security audits, and user acceptance testing.",
          duration: "4 weeks"
        },
        {
          title: "Deployment & Training",
          description: "Production deployment with comprehensive user training and documentation delivery.",
          duration: "3 weeks"
        }
      ],
      metrics: [
        { label: "Data Processing Speed", value: "10x Faster" },
        { label: "User Adoption Rate", value: "94%" },
        { label: "Cost Reduction", value: "45%" }
      ],
      testimonial: {
        quote: "NeuroFlow has transformed how we make decisions. The insights we get are incredible, and the platform is so intuitive that our entire team adopted it within weeks.",
        name: "Sarah Chen",
        position: "Chief Data Officer, TechCorp Industries",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      architecture: "Microservices architecture built on Kubernetes with React frontend, Node.js APIs, Python ML services, and PostgreSQL database with Redis caching layer.",
      performance: [
        { metric: "Page Load Speed", score: 95 },
        { metric: "API Response Time", score: 98 },
        { metric: "Data Accuracy", score: 99 },
        { metric: "System Uptime", score: 99.9 }
      ]
    },
    {
      id: 2,
      title: "EcoTrack Sustainability Suite",
      client: "GreenTech Solutions",
      category: "Mobile App",
      description: "Comprehensive sustainability tracking application helping organizations monitor and reduce their environmental impact through gamification.",
      fullDescription: `EcoTrack Sustainability Suite revolutionizes how organizations approach environmental responsibility by combining comprehensive tracking capabilities with engaging gamification elements. This innovative platform enables companies to monitor their carbon footprint, waste management, energy consumption, and sustainability initiatives in real-time.\n\nThe application transforms sustainability from a compliance requirement into an engaging company-wide initiative, fostering environmental consciousness through competitive elements, achievement systems, and social sharing features.`,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=800&h=600&fit=crop"
      ],
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "AWS", "GraphQL"],
      rating: 4.8,
      duration: "6 months",
      teamSize: "8 members",
      impact: "+280% engagement",
      challenge: "Creating an engaging sustainability platform that would motivate employees to actively participate in environmental initiatives while providing accurate tracking and reporting capabilities.",
      solution: "We developed a gamified mobile application with social features, real-time tracking, and comprehensive analytics that makes sustainability efforts visible and rewarding for all participants.",
      features: [
        "Real-time carbon footprint tracking",
        "Gamification with points and achievements",
        "Team challenges and competitions",
        "Comprehensive sustainability reporting",
        "Social sharing and community features",
        "Integration with IoT sensors",
        "Offline data collection capabilities",
        "Multi-language support"
      ],
      processSteps: [
        {
          title: "User Research & Personas",
          description: "Conducted extensive research with sustainability professionals and employees to understand motivation factors and usage patterns.",
          duration: "2 weeks"
        },
        {
          title: "Gamification Design",
          description: "Designed comprehensive gamification system including point structures, achievement systems, and social engagement features.",
          duration: "3 weeks"
        },
        {
          title: "Mobile App Development",
          description: "Built cross-platform mobile application with offline capabilities and real-time synchronization.",
          duration: "12 weeks"
        },
        {
          title: "Backend & Analytics",
          description: "Developed robust backend systems for data processing, analytics, and reporting with scalable cloud infrastructure.",
          duration: "8 weeks"
        },
        {
          title: "Testing & Refinement",
          description: "Comprehensive testing including user experience testing, performance optimization, and security validation.",
          duration: "3 weeks"
        }
      ],
      metrics: [
        { label: "User Engagement", value: "+280%" },
        { label: "Carbon Reduction", value: "35%" },
        { label: "App Store Rating", value: "4.8★" }
      ],
      testimonial: {
        quote: "EcoTrack has made sustainability fun and engaging for our entire organization. We\'ve seen unprecedented participation in our green initiatives.",
        name: "Michael Rodriguez",
        position: "Sustainability Director, GreenTech Solutions",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      architecture: "React Native mobile app with Firebase backend, Node.js microservices for analytics, MongoDB for data storage, and AWS cloud infrastructure.",
      performance: [
        { metric: "App Launch Speed", score: 92 },
        { metric: "Data Sync Reliability", score: 98 },
        { metric: "Battery Optimization", score: 89 },
        { metric: "Crash-Free Sessions", score: 99.5 }
      ]
    },
    {
      id: 3,
      title: "QuantumCRM Enterprise",
      client: "SalesForce Dynamics",
      category: "Enterprise Software",
      description: "Next-generation CRM platform with AI-powered lead scoring, automated workflows, and advanced customer journey mapping.",
      fullDescription: `QuantumCRM Enterprise redefines customer relationship management through artificial intelligence and advanced automation. This comprehensive platform combines traditional CRM functionality with cutting-edge AI capabilities to provide unprecedented insights into customer behavior and sales opportunities.\n\nThe system leverages machine learning algorithms to predict customer lifetime value, optimize sales processes, and automate routine tasks, enabling sales teams to focus on high-value activities and relationship building.`,
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      technologies: ["Vue.js", "Django", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      rating: 4.7,
      duration: "10 months",
      teamSize: "15 members",
      impact: "+420% sales efficiency",
      challenge: "Building a CRM system that could handle enterprise-scale data while providing intelligent insights and maintaining high performance across global teams.",
      solution: "We created a modular, AI-powered CRM platform with advanced caching, real-time synchronization, and machine learning capabilities for predictive analytics and automation.",
      features: [
        "AI-powered lead scoring and prioritization",
        "Automated workflow engine",
        "Advanced customer journey mapping",
        "Real-time collaboration tools",
        "Comprehensive reporting and analytics",
        "Mobile-first responsive design",
        "Third-party integrations (50+ platforms)",
        "Advanced security and compliance features"
      ],
      processSteps: [
        {
          title: "Requirements Analysis",
          description: "Comprehensive analysis of existing CRM systems and identification of key improvement opportunities.",
          duration: "4 weeks"
        },
        {
          title: "System Architecture",
          description: "Designed scalable microservices architecture with emphasis on performance and AI integration capabilities.",
          duration: "3 weeks"
        },
        {
          title: "Core Development",
          description: "Built fundamental CRM features including contact management, opportunity tracking, and basic reporting.",
          duration: "16 weeks"
        },
        {
          title: "AI Integration",
          description: "Implemented machine learning models for lead scoring, sales forecasting, and automated insights generation.",
          duration: "8 weeks"
        },
        {
          title: "Enterprise Features",
          description: "Added advanced features including workflow automation, advanced reporting, and enterprise integrations.",
          duration: "6 weeks"
        },
        {
          title: "Testing & Deployment",
          description: "Comprehensive testing, performance optimization, and phased deployment across multiple regions.",
          duration: "5 weeks"
        }
      ],
      metrics: [
        { label: "Sales Efficiency", value: "+420%" },
        { label: "Lead Conversion", value: "+65%" },
        { label: "User Satisfaction", value: "92%" }
      ],
      testimonial: {
        quote: "QuantumCRM has revolutionized our sales process. The AI insights are incredibly accurate, and our team productivity has skyrocketed.",
        name: "Jennifer Walsh",
        position: "VP of Sales, SalesForce Dynamics",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      architecture: "Vue.js frontend with Django REST API backend, PostgreSQL database, Redis caching, containerized with Docker and orchestrated on Kubernetes.",
      performance: [
        { metric: "Query Response Time", score: 96 },
        { metric: "System Reliability", score: 99.8 },
        { metric: "Data Processing Speed", score: 94 },
        { metric: "Concurrent Users", score: 98 }
      ]
    },
    {
      id: 4,
      title: "MindfulSpace Wellness Platform",
      client: "Wellness Innovations Inc",
      category: "Healthcare App",
      description: "Comprehensive mental health and wellness platform featuring guided meditations, mood tracking, and personalized wellness plans.",
      fullDescription: `MindfulSpace Wellness Platform addresses the growing need for accessible mental health resources by providing a comprehensive digital wellness ecosystem. The platform combines evidence-based therapeutic techniques with modern technology to deliver personalized mental health support.\n\nFeaturing guided meditations, cognitive behavioral therapy tools, mood tracking, and community support features, MindfulSpace creates a safe space for users to explore and improve their mental well-being through structured programs and peer support.`,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "AWS", "TensorFlow"],
      rating: 4.9,
      duration: "7 months",
      teamSize: "10 members",
      impact: "+95% user retention",
      challenge: "Creating a mental health platform that provides effective therapeutic support while ensuring user privacy, safety, and engagement in a sensitive domain.",
      solution: "We developed a comprehensive wellness platform with evidence-based therapeutic tools, personalized content delivery, and robust privacy protections, guided by mental health professionals.",
      features: [
        "Guided meditation library (200+ sessions)",
        "Mood tracking with intelligent insights",
        "Personalized wellness plans",
        "CBT-based therapeutic exercises",
        "Community support groups",
        "Crisis intervention resources",
        "Progress tracking and analytics",
        "Offline content access"
      ],
      processSteps: [
        {
          title: "Clinical Research",
          description: "Collaborated with mental health professionals to ensure evidence-based approach and clinical effectiveness.",
          duration: "3 weeks"
        },
        {
          title: "User Experience Design",
          description: "Designed calming, accessible interface with focus on user safety and ease of use during vulnerable moments.",
          duration: "4 weeks"
        },
        {
          title: "Core App Development",
          description: "Built meditation player, mood tracking, and basic wellness features with offline capabilities.",
          duration: "12 weeks"
        },
        {
          title: "Therapeutic Tools",
          description: "Implemented CBT exercises, personalization algorithms, and crisis intervention features.",
          duration: "6 weeks"
        },
        {
          title: "Community Features",
          description: "Added moderated community spaces, peer support features, and professional guidance integration.",
          duration: "4 weeks"
        },
        {
          title: "Clinical Validation",
          description: "Conducted clinical trials and user studies to validate therapeutic effectiveness and safety measures.",
          duration: "3 weeks"
        }
      ],
      metrics: [
        { label: "User Retention", value: "95%" },
        { label: "Wellness Improvement", value: "78%" },
        { label: "Daily Active Users", value: "85%" }
      ],
      testimonial: {
        quote: "MindfulSpace has been a game-changer for our users. The combination of technology and clinical expertise creates truly effective mental health support.",
        name: "Dr. Amanda Foster",
        position: "Chief Clinical Officer, Wellness Innovations Inc",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      architecture: "React Native mobile app with Node.js backend, MongoDB for user data, Socket.io for real-time features, and AWS infrastructure with HIPAA compliance.",
      performance: [
        { metric: "App Responsiveness", score: 97 },
        { metric: "Content Load Speed", score: 94 },
        { metric: "Data Security", score: 100 },
        { metric: "Offline Functionality", score: 92 }
      ]
    },
    {
      id: 5,
      title: "BlockChain Supply Tracker",
      client: "LogiChain Global",
      category: "Blockchain App",
      description: "Revolutionary supply chain transparency platform using blockchain technology for end-to-end product tracking and verification.",
      fullDescription: `BlockChain Supply Tracker transforms supply chain management through distributed ledger technology, providing unprecedented transparency and traceability across global supply networks. This innovative platform enables stakeholders to track products from origin to consumer, ensuring authenticity and ethical sourcing.\n\nBy leveraging blockchain's immutable record-keeping capabilities, the platform creates a trusted ecosystem where suppliers, manufacturers, distributors, and consumers can verify product authenticity, track environmental impact, and ensure compliance with ethical standards.`,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS", "Ethereum"],
      rating: 4.6,
      duration: "12 months",
      teamSize: "18 members",
      impact: "+99% transparency",
      challenge: "Building a blockchain-based supply chain platform that could handle enterprise-scale transactions while maintaining transparency, security, and user-friendly interfaces.",
      solution: "We created a hybrid blockchain solution combining public transparency with private business data protection, featuring intuitive interfaces for all stakeholder types.",
      features: [
        "End-to-end product tracking",
        "Immutable transaction records",
        "Smart contract automation",
        "Multi-stakeholder dashboard",
        "QR code product verification",
        "Sustainability impact tracking",
        "Compliance reporting tools",
        "Mobile verification app"
      ],
      processSteps: [
        {
          title: "Blockchain Architecture",
          description: "Designed hybrid blockchain architecture balancing transparency requirements with business privacy needs.",
          duration: "4 weeks"
        },
        {
          title: "Smart Contract Development",
          description: "Created comprehensive smart contracts for supply chain events, verification, and automated compliance checking.",
          duration: "8 weeks"
        },
        {
          title: "Web Platform Development",
          description: "Built stakeholder dashboards and administrative interfaces for supply chain management and monitoring.",
          duration: "16 weeks"
        },
        {
          title: "Mobile App Development",
          description: "Developed consumer-facing mobile app for product verification and supply chain transparency access.",
          duration: "8 weeks"
        },
        {
          title: "Integration & Testing",
          description: "Integrated with existing ERP systems and conducted extensive testing including security audits.",
          duration: "6 weeks"
        },
        {
          title: "Pilot Deployment",
          description: "Conducted pilot program with select suppliers and gradually scaled to full network deployment.",
          duration: "8 weeks"
        }
      ],
      metrics: [
        { label: "Supply Chain Transparency", value: "99%" },
        { label: "Fraud Reduction", value: "87%" },
        { label: "Compliance Accuracy", value: "96%" }
      ],
      testimonial: {
        quote: "The blockchain tracker has revolutionized our supply chain visibility. Our customers now have complete confidence in our product authenticity and ethical sourcing.",
        name: "Robert Kim",
        position: "Supply Chain Director, LogiChain Global",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      },
      architecture: "Ethereum-based smart contracts with React frontend, Node.js APIs, IPFS for document storage, and Web3.js for blockchain interactions.",
      performance: [
        { metric: "Transaction Speed", score: 88 },
        { metric: "Data Integrity", score: 100 },
        { metric: "Network Reliability", score: 96 },
        { metric: "Gas Optimization", score: 91 }
      ]
    },
    {
      id: 6,
      title: "EduFlow Learning Management",
      client: "Academic Excellence Institute",
      category: "E-learning Platform",
      description: "Advanced learning management system with AI-powered personalized learning paths, interactive content, and comprehensive analytics.",
      fullDescription: `EduFlow Learning Management System represents the future of digital education, combining artificial intelligence with pedagogical best practices to create personalized learning experiences. The platform adapts to individual learning styles and paces, providing customized content delivery and assessment strategies.\n\nFeaturing interactive multimedia content, collaborative learning tools, and comprehensive analytics, EduFlow empowers educators to create engaging learning experiences while providing students with the support they need to succeed in their educational journey.`,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      technologies: ["Angular", "Spring Boot", "MySQL", "Redis", "Docker", "AWS"],
      rating: 4.8,
      duration: "9 months",
      teamSize: "14 members",
      impact: "+75% learning outcomes",
      challenge: "Creating a learning management system that could personalize education at scale while providing comprehensive tools for educators and maintaining high performance.",
      solution: "We developed an AI-powered LMS with adaptive learning algorithms, comprehensive content management tools, and robust analytics to support both educators and learners.",
      features: [
        "AI-powered personalized learning paths",
        "Interactive multimedia content creation",
        "Real-time collaboration tools",
        "Comprehensive assessment engine",
        "Advanced analytics and reporting",
        "Mobile learning applications",
        "Integration with 100+ educational tools",
        "Accessibility compliance (WCAG 2.1)"
      ],
      processSteps: [
        {
          title: "Educational Research",
          description: "Conducted extensive research on learning methodologies and pedagogical best practices with education experts.",
          duration: "3 weeks"
        },
        {
          title: "Platform Architecture",
          description: "Designed scalable architecture supporting millions of concurrent users with real-time collaboration capabilities.",
          duration: "4 weeks"
        },
        {
          title: "Core LMS Development",
          description: "Built fundamental learning management features including course creation, user management, and basic assessment tools.",
          duration: "16 weeks"
        },
        {
          title: "AI Personalization",
          description: "Implemented machine learning algorithms for adaptive learning paths and personalized content recommendations.",
          duration: "8 weeks"
        },
        {
          title: "Advanced Features",
          description: "Added collaboration tools, advanced analytics, mobile applications, and third-party integrations.",
          duration: "8 weeks"
        },
        {
          title: "Testing & Optimization",
          description: "Comprehensive testing including accessibility compliance, performance optimization, and educational effectiveness validation.",
          duration: "4 weeks"
        }
      ],
      metrics: [
        { label: "Learning Outcomes", value: "+75%" },
        { label: "Student Engagement", value: "+89%" },
        { label: "Course Completion", value: "+62%" }
      ],
      testimonial: {
        quote: "EduFlow has transformed our educational delivery. The personalized learning paths have significantly improved student outcomes and engagement.",
        name: "Dr. Patricia Williams",
        position: "Dean of Digital Learning, Academic Excellence Institute",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg"
      },
      architecture: "Angular frontend with Spring Boot microservices, MySQL database, Redis caching, containerized with Docker and deployed on AWS infrastructure.",
      performance: [
        { metric: "Page Load Speed", score: 93 },
        { metric: "Concurrent Users", score: 97 },
        { metric: "Content Delivery", score: 95 },
        { metric: "System Availability", score: 99.9 }
      ]
    }
  ];

  // Portfolio statistics
  const portfolioStats = [
    {
      label: "Projects Completed",
      value: "150+",
      icon: "Briefcase",
      trend: 12
    },
    {
      label: "Happy Clients",
      value: "98%",
      icon: "Heart",
      trend: 5
    },
    {
      label: "Technologies Mastered",
      value: "50+",
      icon: "Code",
      trend: 8
    },
    {
      label: "Awards Won",
      value: "25",
      icon: "Award",
      trend: 15
    }
  ];

  // Filter categories
  const categories = [
    { value: 'all', label: 'All Projects', icon: 'Grid3X3' },
    { value: 'Web Application', label: 'Web Apps', icon: 'Globe' },
    { value: 'Mobile App', label: 'Mobile Apps', icon: 'Smartphone' },
    { value: 'Enterprise Software', label: 'Enterprise', icon: 'Building' },
    { value: 'Healthcare App', label: 'Healthcare', icon: 'Heart' },
    { value: 'Blockchain App', label: 'Blockchain', icon: 'Link' },
    { value: 'E-learning Platform', label: 'E-learning', icon: 'BookOpen' }
  ];

  // Extract unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    portfolioProjects?.forEach(project => {
      project?.technologies?.forEach(tech => techSet?.add(tech));
    });
    return Array.from(techSet)?.sort();
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = portfolioProjects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(project => project?.category === selectedCategory);
    }

    // Filter by technology
    if (selectedTechnology) {
      filtered = filtered?.filter(project => 
        project?.technologies?.includes(selectedTechnology)
      );
    }

    // Sort projects
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'impact':
          return parseInt(b?.impact?.replace(/[^\d]/g, '')) - parseInt(a?.impact?.replace(/[^\d]/g, ''));
        case 'duration':
          return parseInt(b?.duration?.split(' ')?.[0]) - parseInt(a?.duration?.split(' ')?.[0]);
        case 'recent':
        default:
          return b?.id - a?.id;
      }
    });

    return filtered;
  }, [selectedCategory, selectedTechnology, sortBy]);

  const handleExploreProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-6';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-base via-white to-glass-surface">
      <SEO {...generatePageSEO('portfolio')} />
      <Helmet>
        <title>Portfolio Showcase - GlassForge Studio | Interactive 3D Project Gallery</title>
        <meta name="description" content="Explore our portfolio of cutting-edge digital experiences through interactive 3D glass containers. Discover web applications, mobile apps, and enterprise solutions crafted with precision." />
        <meta name="keywords" content="portfolio, 3D showcase, web development, mobile apps, enterprise software, glass morphism, interactive design" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
      </div>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-glass-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 glass-morphism px-4 py-2 rounded-full mb-6">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span className="text-sm font-medium text-glass-text-secondary">Portfolio Dimension Zones</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-glass-text-primary mb-6">
                Crafted Digital
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>
              
              <p className="text-xl text-glass-text-secondary max-w-3xl mx-auto mb-8">
                Explore our portfolio through interactive 3D glass containers, where each project exists in its own dimensional space with unique refractions and immersive storytelling.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle"
                  iconName="Play"
                  iconPosition="left"
                >
                  Start 3D Tour
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Portfolio
                </Button>
              </div>
            </motion.div>

            {/* Portfolio Stats */}
            <StatsOverview stats={portfolioStats} />
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              technologies={allTechnologies}
              selectedTechnology={selectedTechnology}
              onTechnologyChange={setSelectedTechnology}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Results Count */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-glass-text-secondary" />
                <span className="text-glass-text-secondary">
                  Showing {filteredProjects?.length} of {portfolioProjects?.length} projects
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-glass-text-secondary">
                <Icon name="Layers" size={14} />
                <span>3D Interactive Mode</span>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className={getGridClasses()}>
              {filteredProjects?.map((project, index) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  index={index}
                  onExplore={handleExploreProject}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects?.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-glass-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-2">No Projects Found</h3>
                <p className="text-glass-text-secondary mb-6">
                  Try adjusting your filters to discover more amazing projects.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTechnology('');
                  }}
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="glass-morphism rounded-3xl p-12 backdrop-blur-glass-heavy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
                Ready to Create Something Amazing?
              </h2>
              
              <p className="text-xl text-glass-text-secondary mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with cutting-edge technology and innovative design approaches.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioShowcase;