import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Header from "../../components/ui/Header"
import SEO from "../../components/SEO"
import { generatePageSEO } from "../../utils/seoUtils"
import Icon from "../../components/AppIcon"
import Button from "../../components/ui/Button"
import TeamMemberCard from './components/TeamMemberCard';
import TeamFilterBar from './components/TeamFilterBar';
import TeamHierarchy from './components/TeamHierarchy';

const TeamDimension = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [showHierarchy, setShowHierarchy] = useState(false)

  const teamMembers = [
    // Partners
    {
      id: 1,
      name: "Mr. Roshan Ekanayake",
      role: "Managing Director",
      department: "Partners",
      experience: 12,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      specialties: ["Strategic Vision", "Brand Strategy", "Business Development"],
      socialMedia: {
        website: "https://roshanekanayake.com/",
        whatsapp: "+94766356336",
        linkedin: "https://www.linkedin.com/in/roshan-ekanayake-89887a189/",
      }
    },
    {
      id: 2,
      name: "Mr. Darshana Buddika",
      role: "Director",
      department: "Partners",
      experience: 14,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      specialties: ["Technical Strategy", "Architecture", "Innovation"],
      socialMedia: {
        website: "https://michaelanderson.tech",
        whatsapp: "+18327263965",
        linkedin: "https://linkedin.com/in/michaelanderson",
      }
    },
    {
      id: 4,
      name: "Mrs. Gimhani Maheshika",
      role: "Digital Marketting & Buisness administartor",
      department: "Administration",
      experience: 1,
      avatar: "/assets/Members/Gimhan.jpg",
      specialties: ["Bsc (Hons) Software Engineer"],
    },
    {
      id: 5,
      name: "Mrs. Shehani Dayarathna",
      role: "HR",
      department: "Administration",
      experience: 8,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      specialties: ["Bsc (Hons) Software Engineer"],
    },
    {
      id: 7,
      name: "Mr. Mohamed Shinan",
      role: "Associate Full Stack Developer (WEB) & DevOps Engineer",
      department: "Developer Teams",
      experience: 2,
      avatar: "/assets/Members/Shinan.jpeg",
      specialties: ["BSc. (Hons) in Software Engineering"],
    },
    {
      id: 8,
      name: "Miss. Chathuri Ranasinghe",
      role: "Junior Software Engineer(WEB, APP)",
      department: "Developer Teams",
      experience: 1,
      avatar: "/assets/Members/Chathuri.jpg",
      specialties: ["BSc. (Hons) in Software Engineering"],
    },
    {
      id: 9,
      name: "Miss. Nihma Nushrath",
      role: "Junior Software Engineer(JAVA)",
      department: "Developer Teams",
      experience: 1,
      avatar: "/assets/Members/Nihma1jpg.jpg",
      specialties: ["BEng (Hons) Software Engineer"],
    },
    {
      id: 10,
      name: "Mr. Mohamed Nashad",
      role: "Full Stack Developer (WEB)",
      department: "Developer Teams",
      experience: 1,
      avatar: "/assets/Members/Nashad.jpg",
      specialties: ["BEng (Hons) Software Engineer"],
    },
    {
      id: 11,
      name: "Mr. Avishka Madhushan",
      role: "Full Stack Developer (APP)",
      department: "Developer Teams",
      experience: 1,
      avatar: "/assets/Members/awishka.jpg",
      specialties: ["UnderGraduate"],
    },
    {
      id: 12,
      name: "Miss. Dilki Nimeshika",
      role: "Full Stack Developer (WEB)",
      department: "Developer Teams",
      experience: 1,
      avatar: "/assets/Members/Dilki.jpg",
      specialties: ["Bsc (Hons) Software Engineer"],
    },
  ]

  const teamStats = {
    totalMembers: teamMembers?.length,
    totalExperience: teamMembers?.reduce((sum, member) => sum + member?.experience, 0),
    totalProjects: teamMembers?.reduce((sum, member) => sum + member?.projectsCompleted, 0),
    averageRating: (
      teamMembers?.reduce((sum, member) => sum + Number.parseFloat(member?.clientRating), 0) / teamMembers?.length
    )?.toFixed(1),
  }

  const filteredMembers = teamMembers?.filter((member) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "partners" && member?.department === "Partners") ||
      (activeFilter === "administration" && member?.department === "Administration") ||
      (activeFilter === "developers" && member?.department === "Developer Teams")

    const matchesSearch =
      member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      member?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      member?.specialties?.some((s) => s?.toLowerCase()?.includes(searchTerm?.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  const handleMemberClick = (member) => {
    // Placeholder for future functionality
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <SEO {...generatePageSEO('team')} />
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glass-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glass-float"
            style={{ animationDelay: "2s" }}
          ></div>
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
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expert Team</span>
            </h1>
            
          </motion.div>

          {/* Team Stats Overview */}
          {/* <TeamStatsOverview stats={teamStats} /> */}

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-morphism rounded-2xl p-2 flex space-x-2">
              <Button
                variant={!showHierarchy ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowHierarchy(false)}
                iconName="Users"
                iconPosition="left"
                className={!showHierarchy ? "bg-primary text-white" : "glass-surface"}
              >
                Team Members
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
              <div
                className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
                  }`}
              >
                {filteredMembers?.map((member, index) => (
                  <TeamMemberCard key={member?.id} member={member} index={index} />
                ))}
              </div>

              {filteredMembers?.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <Icon name="Users" size={64} className="mx-auto text-glass-text-secondary mb-4" />
                  <h3 className="text-xl font-semibold text-glass-text-primary mb-2">No team members found</h3>
                  <p className="text-glass-text-secondary">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </>
          ) : (
            <TeamHierarchy hierarchyData={hierarchyData} onMemberClick={handleMemberClick} />
          )}
        </div>
      </section>
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
              className="w-12 h-12 rounded-full glass-interactive border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
              iconName="ArrowLeft"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TeamDimension
