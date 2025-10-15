import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Camera, Shield, Smartphone, Zap, Search, Eye } from "lucide-react";

const faqs = [
	{
		id: 1,
		question: "What CCTV systems do you install?",
		answer: "We install IP cameras, analog cameras, NVR/DVR systems, wireless cameras, and PTZ cameras. Our systems support 4K resolution, night vision, motion detection, and cloud storage integration.",
		category: "Installation",
		icon: Camera
	},
	{
		id: 2,
		question: "Do you offer remote monitoring and mobile access?",
		answer: "Yes! Our systems include mobile apps for iOS and Android, web-based viewing, remote playback, push notifications, and secure cloud access from anywhere in the world.",
		category: "Remote Access",
		icon: Smartphone
	},
	{
		id: 3,
		question: "What about night vision and low-light recording?",
		answer: "Our cameras feature advanced IR night vision, starlight technology, and low-light sensors that provide clear footage even in complete darkness. We also offer thermal cameras for specialized applications.",
		category: "Night Vision",
		icon: Eye
	},
	{
		id: 4,
		question: "How secure are your CCTV systems?",
		answer: "We implement enterprise-grade security including encrypted data transmission, secure user authentication, access controls, and regular security updates to protect your surveillance data.",
		category: "Security",
		icon: Shield
	},
	{
		id: 5,
		question: "Do you provide storage and backup solutions?",
		answer: "We offer local storage with NVR/DVR systems, cloud storage options, redundant backup systems, and long-term archival solutions to ensure your footage is always protected.",
		category: "Storage",
		icon: Zap
	},
	{
		id: 6,
		question: "Can you integrate with existing security systems?",
		answer: "Yes, we integrate with access control systems, alarm systems, intercoms, and building management systems to create a comprehensive security solution.",
		category: "Integration",
		icon: Camera
	}
];

export default function CctvFaq({ searchQuery = "" }) {
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
					{ label: "Systems Installed", value: "300+", color: "from-orange-500 to-red-500" },
					{ label: "Coverage Area", value: "24/7", color: "from-blue-500 to-cyan-500" },
					{ label: "Resolution", value: "4K", color: "from-purple-500 to-pink-500" },
					{ label: "Storage Capacity", value: "TB+", color: "from-emerald-500 to-teal-500" }
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.1 }}
						className="glass-morphism rounded-2xl p-4 text-center"
					>
						<div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
							<Camera className="w-4 h-4 text-white" />
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
									<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
										<faq.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-slate-800 mb-1">
											{faq.question}
										</h3>
										<span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
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


