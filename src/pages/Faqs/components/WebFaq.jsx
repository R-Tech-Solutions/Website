import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code, Globe, Zap, Shield, Search } from "lucide-react";

const faqs = [
	{
		id: 1,
		question: "What technologies do you use for web development?",
		answer: "We use modern technologies including React, Next.js, Vue.js, Node.js, TypeScript, Tailwind CSS, and various databases. Our stack is chosen based on your project requirements for optimal performance and scalability.",
		category: "Technology",
		icon: Code
	},
	{
		id: 2,
		question: "How long does a typical web project take?",
		answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, e-commerce sites 6-12 weeks, and complex web applications 3-6 months. We provide detailed timelines during our consultation.",
		category: "Timeline",
		icon: Globe
	},
	{
		id: 3,
		question: "Do you offer SEO optimization?",
		answer: "Yes! We implement comprehensive SEO strategies including technical SEO, content optimization, meta tags, structured data, site speed optimization, and mobile-first indexing to improve your search rankings.",
		category: "SEO",
		icon: Search
	},
	{
		id: 4,
		question: "What about website performance and speed?",
		answer: "We optimize for Core Web Vitals, implement lazy loading, image optimization, CDN integration, and code splitting. Our sites typically achieve 90+ PageSpeed scores and load in under 3 seconds.",
		category: "Performance",
		icon: Zap
	},
	{
		id: 5,
		question: "Do you provide ongoing maintenance?",
		answer: "Yes, we offer maintenance packages including security updates, content updates, performance monitoring, backup management, and 24/7 technical support to keep your website running smoothly.",
		category: "Maintenance",
		icon: Shield
	},
	{
		id: 6,
		question: "Can you integrate with third-party services?",
		answer: "Absolutely! We integrate with payment gateways, CRM systems, email marketing platforms, analytics tools, social media APIs, and any other services your business needs.",
		category: "Integration",
		icon: Code
	}
];

export default function WebFaq({ searchQuery = "" }) {
	const [expandedItems, setExpandedItems] = useState(new Set([1])); // First item expanded by default
	const [filteredFaqs, setFilteredFaqs] = useState(faqs);

	// Filter FAQs based on search query
	React.useEffect(() => {
		if (searchQuery.trim()) {
			const filtered = faqs.filter(faq => 
				faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
				faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
				faq.category.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredFaqs(filtered);
		} else {
			setFilteredFaqs(faqs);
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
		<div className="space-y-6">
			{/* Stats Overview */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
			>
				{[
					{ label: "Projects Completed", value: "150+", color: "from-blue-500 to-cyan-500" },
					{ label: "Client Satisfaction", value: "98%", color: "from-emerald-500 to-teal-500" },
					{ label: "Average Load Time", value: "<3s", color: "from-purple-500 to-pink-500" },
					{ label: "SEO Score", value: "90+", color: "from-orange-500 to-red-500" }
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.1 }}
						className="glass-morphism rounded-2xl p-4 text-center"
					>
						<div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
							<Globe className="w-4 h-4 text-white" />
						</div>
						<div className="text-2xl font-bold text-slate-800">{stat.value}</div>
						<div className="text-sm text-slate-600">{stat.label}</div>
					</motion.div>
				))}
			</motion.div>

			{/* FAQ Items */}
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
									<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
										<faq.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-slate-800 mb-1">
											{faq.question}
										</h3>
										<span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
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

			{/* No Results */}
			{filteredFaqs.length === 0 && searchQuery && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-12"
				>
					<Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-slate-800 mb-2">No results found</h3>
					<p className="text-slate-600">Try searching with different keywords or browse our categories.</p>
				</motion.div>
			)}
		</div>
	);
}


