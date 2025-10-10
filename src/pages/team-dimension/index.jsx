import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TeamMemberCard from './components/TeamMemberCard';
import TeamProfileModal from './components/TeamProfileModal';
import TeamStatsOverview from './components/TeamStatsOverview';
import TeamFilterBar from './components/TeamFilterBar';
import TeamHierarchy from './components/TeamHierarchy';

const TeamDimension = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showHierarchy, setShowHierarchy] = useState(false);

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      department: "Design",
      experience: 8,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      specialties: ["UI/UX Design", "Brand Strategy", "Design Systems", "User Research"],
      projectsCompleted: 127,
      clientRating: "4.9",
      certifications: 12,
      isOnline: true,
      bio: `Sarah leads our creative vision with over 8 years of experience crafting digital experiences that resonate with users. She specializes in translating complex business requirements into intuitive, beautiful interfaces that drive engagement and conversion.`,
      notableProjects: [
        {
          name: "FinTech Dashboard Redesign",
          description: "Complete UX overhaul resulting in 40% increase in user engagement",
          year: "2024",
          impact: "40% engagement boost"
        },
        {
          name: "E-commerce Mobile App",
          description: "Award-winning mobile experience with seamless checkout flow",
          year: "2023",
          impact: "Design Award Winner"
        }
      ],
      skills: {
        design: [
          { name: "Figma", level: 5 },
          { name: "Adobe Creative Suite", level: 5 },
          { name: "Sketch", level: 4 },
          { name: "Principle", level: 4 }
        ],
        research: [
          { name: "User Testing", level: 5 },
          { name: "Analytics", level: 4 },
          { name: "A/B Testing", level: 4 }
        ]
      }
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Lead Frontend Developer",
      department: "Engineering",
      experience: 6,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      specialties: ["React", "Three.js", "GSAP", "WebGL", "Performance Optimization"],
      projectsCompleted: 89,
      clientRating: "4.8",
      certifications: 8,
      isOnline: true,
      bio: `Marcus brings cutting-edge frontend technologies to life, specializing in 3D web experiences and performance optimization. His expertise in React and Three.js enables us to create immersive digital experiences that push the boundaries of what's possible on the web.`,
      notableProjects: [
        {
          name: "3D Product Configurator",
          description: "Interactive 3D experience with real-time customization",
          year: "2024",
          impact: "60% conversion increase"
        },
        {
          name: "WebGL Animation Platform",
          description: "High-performance animation engine for marketing campaigns",
          year: "2023",
          impact: "Industry Recognition"
        }
      ],
      skills: {
        frontend: [
          { name: "React", level: 5 },
          { name: "Three.js", level: 5 },
          { name: "GSAP", level: 4 },
          { name: "WebGL", level: 4 }
        ],
        tools: [
          { name: "Vite", level: 5 },
          { name: "Webpack", level: 4 },
          { name: "Git", level: 5 }
        ]
      }
    },
    {
      id: 3,
      name: "Elena Vasquez",
      role: "Backend Architect",
      department: "Engineering",
      experience: 10,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      specialties: ["Node.js", "Cloud Architecture", "API Design", "Database Optimization"],
      projectsCompleted: 156,
      clientRating: "4.9",
      certifications: 15,
      isOnline: false,
      bio: `Elena architects robust backend systems that scale seamlessly with business growth. With 10 years of experience, she ensures our applications are built on solid foundations that can handle millions of users while maintaining peak performance.`,
      notableProjects: [
        {
          name: "Microservices Migration",
          description: "Transformed monolith to scalable microservices architecture",
          year: "2024",
          impact: "99.9% uptime achieved"
        },
        {
          name: "Real-time Analytics Engine",
          description: "High-throughput data processing system",
          year: "2023",
          impact: "10x performance gain"
        }
      ],
      skills: {
        backend: [
          { name: "Node.js", level: 5 },
          { name: "Python", level: 4 },
          { name: "PostgreSQL", level: 5 },
          { name: "Redis", level: 4 }
        ],
        cloud: [
          { name: "AWS", level: 5 },
          { name: "Docker", level: 5 },
          { name: "Kubernetes", level: 4 }
        ]
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Project Manager",
      department: "Management",
      experience: 7,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      specialties: ["Agile", "Scrum", "Risk Management", "Client Relations"],
      projectsCompleted: 203,
      clientRating: "4.8",
      certifications: 10,
      isOnline: true,
      bio: `David orchestrates complex projects with precision and care, ensuring every deliverable meets our high standards while staying on time and budget. His agile approach and excellent communication skills make him the bridge between our technical team and clients.`,
      notableProjects: [
        {
          name: "Enterprise Platform Launch",
          description: "Coordinated 50+ stakeholder project delivered ahead of schedule",
          year: "2024",
          impact: "2 weeks early delivery"
        },
        {
          name: "Multi-vendor Integration",
          description: "Managed complex integration with 5 external systems",
          year: "2023",
          impact: "Zero integration issues"
        }
      ],
      skills: {
        management: [
          { name: "Agile/Scrum", level: 5 },
          { name: "Risk Management", level: 5 },
          { name: "Stakeholder Management", level: 5 }
        ],
        tools: [
          { name: "Jira", level: 5 },
          { name: "Confluence", level: 4 },
          { name: "Slack", level: 5 }
        ]
      }
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "UX Researcher",
      department: "Design",
      experience: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      specialties: ["User Research", "Usability Testing", "Data Analysis", "Journey Mapping"],
      projectsCompleted: 67,
      clientRating: "4.9",
      certifications: 7,
      isOnline: true,
      bio: `Aisha uncovers deep user insights that drive our design decisions. Her research methodologies and analytical approach ensure every interface we create is grounded in real user needs and behaviors, leading to more successful products.`,
      notableProjects: [
        {
          name: "Healthcare App Research",
          description: "Comprehensive user study leading to 50% usability improvement",
          year: "2024",
          impact: "50% usability boost"
        },
        {
          name: "E-learning Platform Study",
          description: "User journey optimization resulting in higher completion rates",
          year: "2023",
          impact: "35% completion increase"
        }
      ],
      skills: {
        research: [
          { name: "User Interviews", level: 5 },
          { name: "Usability Testing", level: 5 },
          { name: "Survey Design", level: 4 }
        ],
        analysis: [
          { name: "Google Analytics", level: 4 },
          { name: "Hotjar", level: 4 },
          { name: "SPSS", level: 3 }
        ]
      }
    },
    {
      id: 6,
      name: "James Thompson",
      role: "DevOps Engineer",
      department: "Engineering",
      experience: 9,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      specialties: ["CI/CD", "Cloud Infrastructure", "Monitoring", "Security"],
      projectsCompleted: 134,
      clientRating: "4.8",
      certifications: 18,
      isOnline: false,
      bio: `James ensures our applications run smoothly in production with robust CI/CD pipelines and monitoring systems. His expertise in cloud infrastructure and security practices keeps our clients' data safe while maintaining optimal performance.`,
      notableProjects: [
        {
          name: "Zero-Downtime Deployment",
          description: "Implemented blue-green deployment strategy",
          year: "2024",
          impact: "100% uptime maintained"
        },
        {
          name: "Security Audit Compliance",
          description: "Achieved SOC 2 Type II certification",
          year: "2023",
          impact: "SOC 2 Certified"
        }
      ],
      skills: {
        devops: [
          { name: "Jenkins", level: 5 },
          { name: "GitLab CI", level: 5 },
          { name: "Terraform", level: 4 }
        ],
        monitoring: [
          { name: "Prometheus", level: 4 },
          { name: "Grafana", level: 4 },
          { name: "ELK Stack", level: 4 }
        ]
      }
    }
  ];

  // Team statistics
  const teamStats = {
    totalMembers: teamMembers?.length,
    totalExperience: teamMembers?.reduce((sum, member) => sum + member?.experience, 0),
    totalProjects: teamMembers?.reduce((sum, member) => sum + member?.projectsCompleted, 0),
    averageRating: (teamMembers?.reduce((sum, member) => sum + parseFloat(member?.clientRating), 0) / teamMembers?.length)?.toFixed(1)
  };

  // Team hierarchy data
  const hierarchyData = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      isOnline: true,
      teamSize: 2,
      rating: "4.9",
      reports: [
        {
          id: 5,
          name: "Aisha Patel",
          role: "UX Researcher",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
          isOnline: true,
          rating: "4.9"
        }
      ]
    },
    {
      id: 3,
      name: "Elena Vasquez",
      role: "Backend Architect",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      isOnline: false,
      teamSize: 3,
      rating: "4.9",
      reports: [
        {
          id: 2,
          name: "Marcus Rodriguez",
          role: "Lead Frontend Developer",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isOnline: true,
          rating: "4.8"
        },
        {
          id: 6,
          name: "James Thompson",
          role: "DevOps Engineer",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
          isOnline: false,
          rating: "4.8"
        }
      ]
    },
    {
      id: 4,
      name: "David Kim",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      isOnline: true,
      rating: "4.8"
    }
  ];

  // Filter team members
  const filteredMembers = teamMembers?.filter(member => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'frontend' && member?.specialties?.some(s => s?.toLowerCase()?.includes('react') || s?.toLowerCase()?.includes('frontend'))) ||
      (activeFilter === 'backend' && member?.specialties?.some(s => s?.toLowerCase()?.includes('node') || s?.toLowerCase()?.includes('backend') || s?.toLowerCase()?.includes('api'))) ||
      (activeFilter === 'design' && member?.department?.toLowerCase() === 'design') ||
      (activeFilter === 'management' && member?.department?.toLowerCase() === 'management');
    
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      member?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      member?.specialties?.some(s => s?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleMemberClick = (member) => {
    const fullMember = teamMembers?.find(m => m?.id === member?.id);
    if (fullMember) {
      handleViewProfile(fullMember);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glass-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-glass-text-primary via-primary to-accent bg-clip-text text-transparent">
                Meet Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Creative Minds
              </span>
            </h1>
            <p className="text-xl text-glass-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover the talented individuals behind GlassForge Studio's innovative digital experiences. 
              Each team member brings unique expertise and passion to craft exceptional solutions.
            </p>
          </motion.div>

          {/* Team Stats Overview */}
          <TeamStatsOverview stats={teamStats} />

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-morphism rounded-2xl p-2 flex space-x-2">
              <Button
                variant={!showHierarchy ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setShowHierarchy(false)}
                iconName="Users"
                iconPosition="left"
                className={!showHierarchy ? 'bg-primary text-white' : 'glass-surface'}
              >
                Team Members
              </Button>
              <Button
                variant={showHierarchy ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setShowHierarchy(true)}
                iconName="Workflow"
                iconPosition="left"
                className={showHierarchy ? 'bg-primary text-white' : 'glass-surface'}
              >
                Team Structure
              </Button>
            </div>
          </div>

          {!showHierarchy ? (
            <>
              {/* Filter Bar */}
              <TeamFilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Team Grid */}
              <div className={`grid gap-8 ${
                viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {filteredMembers?.map((member, index) => (
                  <TeamMemberCard
                    key={member?.id}
                    member={member}
                    index={index}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>

              {filteredMembers?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Icon name="Users" size={64} className="mx-auto text-glass-text-secondary mb-4" />
                  <h3 className="text-xl font-semibold text-glass-text-primary mb-2">
                    No team members found
                  </h3>
                  <p className="text-glass-text-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <TeamHierarchy 
              hierarchyData={hierarchyData}
              onMemberClick={handleMemberClick}
            />
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-glass-text-primary mb-6">
              Ready to Work with Our Team?
            </h2>
            <p className="text-lg text-glass-text-secondary mb-8 max-w-2xl mx-auto">
              Let's discuss how our talented team can bring your vision to life with cutting-edge technology and creative excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Start a Project
              </Button>
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                  iconName="Layers"
                  iconPosition="left"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Team Profile Modal */}
      <TeamProfileModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Floating Navigation */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="flex flex-col space-y-3">
          <Link to="/process">
            <Button
              variant="default"
              size="icon"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-interactive"
              iconName="ArrowRight"
            />
          </Link>
          <Link to="/services">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full glass-interactive border-primary/20 text-primary hover:bg-primary/10"
              iconName="ArrowLeft"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamDimension;