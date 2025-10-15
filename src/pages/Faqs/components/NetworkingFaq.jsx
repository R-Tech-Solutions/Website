import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Network, Wifi, Shield, Zap, Search, Router } from "lucide-react";

const faqs = [
	{
		id: 1,
		question: "Do you design and implement network infrastructure?",
		answer: "Yes! We design and implement complete network solutions including LAN/WAN, Wi-Fi networks, VLANs, routing, switching, and firewall configurations tailored to your business needs.",
		category: "Infrastructure",
		icon: Network
	},
	{
		id: 2,
		question: "Can you optimize network performance and reliability?",
		answer: "We provide network audits, performance monitoring, QoS optimization, bandwidth management, and reliability improvements to ensure optimal network performance and uptime.",
		category: "Performance",
		icon: Zap
	},
	{
		id: 3,
		question: "Do you offer wireless network solutions?",
		answer: "We install and configure enterprise-grade Wi-Fi systems, access points, wireless controllers, and provide coverage optimization for seamless connectivity throughout your premises.",
		category: "Wireless",
		icon: Wifi
	},
	{
		id: 4,
		question: "What about network security and monitoring?",
		answer: "We implement comprehensive network security including firewalls, intrusion detection, VPN solutions, access controls, and 24/7 network monitoring to protect your infrastructure.",
		category: "Security",
		icon: Shield
	},
	{
		id: 5,
		question: "Can you help with network troubleshooting and maintenance?",
		answer: "We provide proactive network maintenance, troubleshooting, performance optimization, and rapid response to network issues to minimize downtime and ensure reliability.",
		category: "Maintenance",
		icon: Router
	},
	{
		id: 6,
		question: "Do you support cloud and hybrid network solutions?",
		answer: "Yes, we design and implement cloud networking, hybrid cloud connectivity, SD-WAN solutions, and integration with cloud services for modern business requirements.",
		category: "Cloud",
		icon: Network
	}
];

export default function NetworkingFaq({ searchQuery = "" }) {
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
					{ label: "Networks Deployed", value: "150+", color: "from-indigo-500 to-blue-500" },
					{ label: "Uptime Guarantee", value: "99.9%", color: "from-emerald-500 to-teal-500" },
					{ label: "Speed Optimization", value: "10x", color: "from-purple-500 to-pink-500" },
					{ label: "Security Rating", value: "A+", color: "from-orange-500 to-red-500" }
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.1 }}
						className="glass-morphism rounded-2xl p-4 text-center"
					>
						<div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
							<Network className="w-4 h-4 text-white" />
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
									<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
										<faq.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-slate-800 mb-1">
											{faq.question}
										</h3>
										<span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
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


