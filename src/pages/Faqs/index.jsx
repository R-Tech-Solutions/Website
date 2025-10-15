import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Camera, 
  Network,
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  CreditCard,
  Plane,
  Database,
  Cloud,
  Shield
} from "lucide-react";
import Header from "../../components/ui/Header";
import SEO from "../../components/SEO";
import { generatePageSEO } from "../../utils/seoUtils";
import WebFaq from "./components/WebFaq";
import AppFaq from "./components/AppFaq";
import SystemFaq from "./components/SystemFaq";
import CctvFaq from "./components/CctvFaq";
import NetworkingFaq from "./components/NetworkingFaq";

const tabs = [
	{ 
		key: "web", 
		label: "Web Development", 
		Component: WebFaq,
		icon: Globe,
		gradient: "from-blue-500 to-cyan-500",
		description: "Modern web solutions and digital experiences"
	},
	{ 
		key: "app", 
		label: "Mobile Apps", 
		Component: AppFaq,
		icon: Smartphone,
		gradient: "from-purple-500 to-pink-500",
		description: "Cross-platform mobile applications"
	},
	{ 
		key: "system", 
		label: "System Solutions", 
		Component: SystemFaq,
		icon: Monitor,
		gradient: "from-emerald-500 to-teal-500",
		description: "Enterprise systems and infrastructure"
	},
	{ 
		key: "cctv", 
		label: "CCTV & Security", 
		Component: CctvFaq,
		icon: Camera,
		gradient: "from-orange-500 to-red-500",
		description: "Surveillance and security systems"
	},
	{ 
		key: "networking", 
		label: "Networking", 
		Component: NetworkingFaq,
		icon: Network,
		gradient: "from-indigo-500 to-blue-500",
		description: "Network infrastructure and connectivity"
	},
];

// System Features FAQ Data
const systemFeaturesFaqs = [
	{
		id: 1,
		question: "What are the key features of your POS system?",
		answer: "Our POS system includes inventory management, sales tracking, customer management, payment processing, receipt printing, barcode scanning, tax calculations, multi-location support, and real-time reporting. It's designed for retail, restaurants, and service businesses.",
		category: "POS Features",
		icon: CreditCard
	},
	{
		id: 2,
		question: "What features does your travel management system offer?",
		answer: "Our travel system includes booking management, itinerary planning, expense tracking, document management, travel alerts, group bookings, loyalty programs, and integration with airlines and hotels. It's perfect for travel agencies and corporate travel management.",
		category: "Travel Features",
		icon: Plane
	},
	{
		id: 3,
		question: "What's the difference between local and online POS systems?",
		answer: "Local POS stores data on your computer/server, works offline, and gives you full control. Online POS stores data in the cloud, requires internet, offers remote access, automatic backups, and real-time updates. We offer both solutions based on your business needs.",
		category: "POS Types",
		icon: Database
	},
	{
		id: 4,
		question: "Can your systems integrate with existing business software?",
		answer: "Yes! Our systems integrate with accounting software (QuickBooks, Xero), CRM systems, e-commerce platforms, payment gateways, inventory management, and third-party APIs. We ensure seamless data flow between all your business tools.",
		category: "Integration",
		icon: Cloud
	},
	{
		id: 5,
		question: "Do you provide training for your systems?",
		answer: "Absolutely! We provide comprehensive training including user manuals, video tutorials, live training sessions, and ongoing support. Our team ensures your staff can effectively use all system features.",
		category: "Training",
		icon: HelpCircle
	},
	{
		id: 6,
		question: "What security measures do you implement?",
		answer: "We implement enterprise-grade security including data encryption, secure user authentication, regular backups, SSL certificates, firewall protection, and compliance with industry standards to protect your business data.",
		category: "Security",
		icon: Shield
	}
];

// System Features FAQ Component
const SystemFeaturesFaq = ({ searchQuery = "" }) => {
	const [expandedItems, setExpandedItems] = useState(new Set([1]));
	const [filteredFaqs, setFilteredFaqs] = useState(systemFeaturesFaqs);

	React.useEffect(() => {
		if (searchQuery.trim()) {
			const filtered = systemFeaturesFaqs.filter(faq => 
				faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
				faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
				faq.category.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredFaqs(filtered);
		} else {
			setFilteredFaqs(systemFeaturesFaqs);
		}
	}, [searchQuery]);

	const toggleExpanded = (id) => {
		// Close all other items and toggle the clicked one
		if (expandedItems.has(id)) {
			setExpandedItems(new Set()); // Close all
		} else {
			setExpandedItems(new Set([id])); // Open only this one
		}
	};

	return (
		<div className="space-y-4">
			{filteredFaqs.map((faq, index) => (
				<motion.div
					key={faq.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="glass-morphism rounded-2xl overflow-hidden"
				>
					<button
						onClick={() => toggleExpanded(faq.id)}
						className="w-full p-6 text-left hover:glass-surface transition-all duration-300"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
									<faq.icon className="w-5 h-5 text-slate-600" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-slate-800 mb-1">
										{faq.question}
									</h3>
									<span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
										{faq.category}
									</span>
								</div>
							</div>
							<motion.div
								animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
								transition={{ duration: 0.3 }}
							>
								<ChevronDown className="w-5 h-5 text-slate-400" />
							</motion.div>
						</div>
					</button>

					<AnimatePresence>
						{expandedItems.has(faq.id) && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="overflow-hidden"
							>
								<div className="px-6 pb-6">
									<div className="border-t border-slate-200 pt-4">
										<p className="text-slate-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
};

export default function Faqs() {
	const [active, setActive] = useState("web");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const ActiveComp = tabs.find(t => t.key === active)?.Component ?? WebFaq;
	const activeTab = tabs.find(t => t.key === active);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<SEO {...generatePageSEO('faqs')} />
			<Header />
			
			{/* Hero Section */}
			<section className="relative pt-16 md:pt-20 pb-12 md:pb-16 overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-glass-float"></div>
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glass-float" style={{animationDelay: '2s'}}></div>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<div className="flex items-center justify-center mb-6">
							<HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3" />
							<h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
								Frequently Asked Questions
							</h1>
							<Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent ml-3 animate-pulse" />
						</div>
						
						<p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
							Find answers to common questions about our services. Can't find what you're looking for? 
							<a href="/contact" className="text-primary hover:text-accent transition-colors"> Contact us</a>
						</p>

						{/* Search Bar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="max-w-md mx-auto mb-8"
						>
							<div className={`glass-morphism rounded-2xl p-4 transition-all duration-300 ${isSearchFocused ? 'shadow-glass-interactive' : ''}`}>
								<div className="flex items-center space-x-3">
									<Search className="w-5 h-5 text-slate-400" />
									<input
										type="text"
										placeholder="Search FAQs..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onFocus={() => setIsSearchFocused(true)}
										onBlur={() => setIsSearchFocused(false)}
										className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400"
									/>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Tab Navigation - Improved Mobile */}
			<section className="container mx-auto px-4 mb-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="max-w-6xl mx-auto"
				>
					{/* Desktop Tabs */}
					<div className="hidden lg:flex glass-morphism rounded-2xl p-2 mb-8">
						{tabs.map((tab, index) => (
							<motion.button
								key={tab.key}
								onClick={() => setActive(tab.key)}
								className={`relative flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
									active === tab.key 
										? 'glass-interactive shadow-glass-subtle' 
										: 'hover:glass-surface'
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{active === tab.key && (
									<motion.div
										layoutId="activeTab"
										className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
										initial={false}
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
								<tab.icon className={`relative z-10 w-5 h-5 transition-colors ${
									active === tab.key ? 'text-white' : 'text-slate-600'
								}`} />
								<span className={`relative z-10 font-medium transition-colors ${
									active === tab.key ? 'text-white' : 'text-slate-700'
								}`}>
									{tab.label}
								</span>
							</motion.button>
						))}
					</div>

					{/* Mobile Tabs - Simplified */}
					<div className="lg:hidden">
						<div className="grid grid-cols-2 gap-3 mb-6">
							{tabs.map((tab, index) => (
								<motion.button
									key={tab.key}
									onClick={() => setActive(tab.key)}
									className={`glass-morphism rounded-xl p-4 text-center transition-all duration-300 ${
										active === tab.key ? 'glass-interactive shadow-glass-subtle' : 'hover:glass-surface'
									}`}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<tab.icon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
									<div className="text-sm font-medium text-slate-800">{tab.label}</div>
								</motion.button>
							))}
						</div>
					</div>
				</motion.div>
			</section>

			{/* FAQ Content */}
			<section className="container mx-auto px-4 pb-16">
				<motion.div
					key={active}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className="max-w-4xl mx-auto"
				>
					{/* Active Tab Header */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-center mb-8"
					>
						<div className="inline-flex items-center space-x-4 glass-morphism rounded-2xl px-6 py-4 mb-6">
							<div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
								{activeTab?.icon && <activeTab.icon className="w-5 h-5 text-slate-600" />}
							</div>
							<div className="text-left">
								<h2 className="text-xl md:text-2xl font-bold text-slate-800">{activeTab?.label}</h2>
								<p className="text-sm md:text-base text-slate-600">{activeTab?.description}</p>
							</div>
						</div>
					</motion.div>

					{/* FAQ Content */}
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							<ActiveComp searchQuery={searchQuery} />
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</section>

			{/* System Features FAQ Section */}
			<section className="container mx-auto px-4 pb-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto"
				>
					<div className="text-center mb-12">
						<div className="flex items-center justify-center mb-6">
							<Database className="w-8 h-8 text-primary mr-3" />
							<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
								System Features & Solutions
							</h2>
							<Cloud className="w-8 h-8 text-accent ml-3" />
						</div>
						<p className="text-lg text-slate-600 max-w-2xl mx-auto">
							Learn about our specialized systems including POS, travel management, and business solutions.
						</p>
					</div>

					<SystemFeaturesFaq searchQuery={searchQuery} />
				</motion.div>
			</section>
		</div>
	);
}


