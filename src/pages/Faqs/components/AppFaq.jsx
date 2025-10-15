import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Smartphone, Download, Shield, Zap, Search, Users } from "lucide-react";

const faqs = [
	{
		id: 1,
		question: "Do you build for both iOS and Android?",
		answer: "Yes! We develop cross-platform apps using React Native and Flutter, ensuring consistent user experience across both platforms. We also build native apps when performance is critical.",
		category: "Platform",
		icon: Smartphone
	},
	{
		id: 2,
		question: "How long does mobile app development take?",
		answer: "Simple apps take 4-8 weeks, medium complexity apps 8-16 weeks, and complex enterprise apps 4-6 months. We provide detailed timelines based on your requirements and features.",
		category: "Timeline",
		icon: Zap
	},
	{
		id: 3,
		question: "Can you publish apps to app stores?",
		answer: "Absolutely! We handle the entire app store submission process including store listings, app icons, screenshots, metadata, signing certificates, and responding to store reviews.",
		category: "Publishing",
		icon: Download
	},
	{
		id: 4,
		question: "What about app security and data protection?",
		answer: "We implement industry-standard security measures including data encryption, secure API communication, biometric authentication, and compliance with GDPR and other privacy regulations.",
		category: "Security",
		icon: Shield
	},
	{
		id: 5,
		question: "Do you provide app maintenance and updates?",
		answer: "Yes, we offer comprehensive maintenance packages including bug fixes, feature updates, OS compatibility updates, performance monitoring, and 24/7 technical support.",
		category: "Maintenance",
		icon: Users
	},
	{
		id: 6,
		question: "Can you integrate with backend services?",
		answer: "We integrate with REST APIs, GraphQL, real-time databases, payment gateways, social media APIs, cloud services, and any third-party services your app needs.",
		category: "Integration",
		icon: Smartphone
	}
];

export default function AppFaq({ searchQuery = "" }) {
	const [expandedItems, setExpandedItems] = useState(new Set([1]));
	const [filteredFaqs, setFilteredFaqs] = useState(faqs);

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
					{ label: "Apps Published", value: "75+", color: "from-purple-500 to-pink-500" },
					{ label: "Store Rating", value: "4.8★", color: "from-emerald-500 to-teal-500" },
					{ label: "Download Speed", value: "<2s", color: "from-blue-500 to-cyan-500" },
					{ label: "User Retention", value: "85%", color: "from-orange-500 to-red-500" }
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.1 }}
						className="glass-morphism rounded-2xl p-4 text-center"
					>
						<div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
							<Smartphone className="w-4 h-4 text-white" />
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
									<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
										<faq.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-slate-800 mb-1">
											{faq.question}
										</h3>
										<span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
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


