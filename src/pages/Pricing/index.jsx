import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import PricingHero from './components/PricingHero';
import PricingFeatures from './components/PricingFeatures';
import PricingCard from './components/PricingCard';
import TabNav from './components/TabNav';
import Button from '../../components/ui/Button';
import Footer from '../../components/ui/Footer';

const Pricing = () => {
	const [activeTab, setActiveTab] = useState('web');
	const plans = [
		{
			title: 'Starter App',
			price: '$99',
			priceUnit: 'For small apps',
			features: ['Up to 5 screens', 'Basic analytics', 'Email support'],
		},
		{
			title: 'Business Web',
			price: '$249',
			priceUnit: 'Web presence & store',
			features: ['Custom CMS', 'E-commerce support', 'SEO & performance'],
			popular: true,
		},
		{
			title: 'POS & Network',
			price: '$399',
			priceUnit: 'Retail & restaurants',
			features: ['POS integration', 'Local network setup', 'Hardware provisioning'],
		},
		{
			title: 'CCTV Enterprise',
			price: '$799',
			priceUnit: 'Monitoring & security',
			features: ['Multi-camera support', 'Cloud storage', '24/7 monitoring'],
		},
	];

	const handleCTAClick = (action) => {
		if (action === 'start') {
			alert('Let\'s start your project — we will reach out shortly.');
		} else {
			alert('Contact sales — a representative will get in touch.');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
			<SEO {...generatePageSEO('pricing')} />
			{/* Global header showcased on this page */}
			<Header />
			<div className="pt-20 md:pt-28">
				<PricingHero onCTAClick={handleCTAClick} />

				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<section className="py-4 md:py-6">
						<TabNav
							tabs={[
								{ key: 'web', label: 'Web Development' },
								{ key: 'app', label: 'App Development' },
								{ key: 'pos', label: 'POS & Retail' },
								{ key: 'cctv', label: 'CCTV & Security' },
								{ key: 'network', label: 'Networking' },
							]}
							active={activeTab}
							onChange={(k) => setActiveTab(k)}
						/>
					</section>

					<section className="py-6 md:py-8">
						<div className="text-center mb-8">
							<h2 className="text-2xl md:text-3xl font-bold text-glass-text-primary mb-2">
								{activeTab === 'web' ? 'Web Development Packages' : 
								 activeTab === 'app' ? 'App Development Packages' : 
								 activeTab === 'pos' ? 'POS & Retail Packages' : 
								 activeTab === 'cctv' ? 'CCTV & Security Packages' : 
								 'Networking Packages'}
							</h2>
							<p className="text-glass-text-secondary max-w-2xl mx-auto">
								Select a tailored package. Each category includes two well-defined packages to get you started quickly.
							</p>
						</div>

						<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
							{(function renderPackages() {
								const common = {
									onCTAClick: () => handleCTAClick('start'),
								};

								switch (activeTab) {
									case 'web':
										return [
											<PricingCard key="web-basic" title="Web Starter" price="$199" priceUnit="Basic website" features={["5 pages", "SEO basics", "Performance optimised"]} onCTAClick={() => handleCTAClick('start')} />,
											<PricingCard key="web-pro" title="Web Pro" price="$499" priceUnit="Business website" features={["Custom CMS", "E-commerce", "Advanced SEO"]} popular onCTAClick={() => handleCTAClick('start')} />,
									];
								case 'app':
									return [
										<PricingCard key="app-basic" title="App Starter" price="$299" priceUnit="MVP mobile app" features={["iOS + Android", "Basic analytics", "Push notifications"]} onCTAClick={() => handleCTAClick('start')} />,
										<PricingCard key="app-pro" title="App Pro" price="$799" priceUnit="Full-featured app" features={["Native features", "Auth & payments", "Analytics & A/B"]} popular onCTAClick={() => handleCTAClick('start')} />,
									];
								case 'pos':
									return [
										<PricingCard key="pos-basic" title="POS Basic" price="$249" priceUnit="Small retail" features={["Single terminal", "Inventory sync", "Email support"]} onCTAClick={() => handleCTAClick('start')} />,
										<PricingCard key="pos-pro" title="POS Pro" price="$599" priceUnit="Multi-terminal" features={["Hardware integration", "Offline mode", "24/7 support"]} popular onCTAClick={() => handleCTAClick('start')} />,
									];
								case 'cctv':
									return [
										<PricingCard key="cctv-basic" title="CCTV Basic" price="$199" priceUnit="Small setup" features={["2-4 cameras", "Local storage", "Email alerts"]} onCTAClick={() => handleCTAClick('start')} />,
										<PricingCard key="cctv-pro" title="CCTV Pro" price="$699" priceUnit="Enterprise" features={["Cloud storage", "AI detection", "24/7 monitoring"]} popular onCTAClick={() => handleCTAClick('start')} />,
									];
								case 'network':
									return [
										<PricingCard key="net-basic" title="Network Basic" price="$149" priceUnit="Small office" features={["Router setup", "VLAN basics", "Monitoring"]} onCTAClick={() => handleCTAClick('start')} />,
										<PricingCard key="net-pro" title="Network Pro" price="$549" priceUnit="Enterprise" features={["Site-to-site VPN", "Firewall hardening", "24/7 NOC"]} popular onCTAClick={() => handleCTAClick('start')} />,
									];
								default:
									return null;
							}
							})()}
						</div>
					</section>

					<PricingFeatures />

					<section className="py-8 md:py-12">
						<div className="glass-morphism rounded-2xl p-4 md:p-6 shadow-glass">
							<h3 className="text-lg md:text-xl font-semibold text-glass-text-primary mb-2">Customer References</h3>
							<p className="text-sm md:text-base text-glass-text-secondary mb-6">Companies we've helped with similar deployments.</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="glass-surface rounded-lg p-4 hover:glass-interactive transition-all duration-300">
									<p className="font-semibold text-glass-text-primary mb-1">Acme Retail</p>
									<p className="text-sm text-glass-text-secondary">Implemented POS across 15 stores with offline sync.</p>
								</div>
								<div className="glass-surface rounded-lg p-4 hover:glass-interactive transition-all duration-300">
									<p className="font-semibold text-glass-text-primary mb-1">BlueWave Logistics</p>
									<p className="text-sm text-glass-text-secondary">Network redesign and CCTV analytics for 3 warehouses.</p>
								</div>
								<div className="glass-surface rounded-lg p-4 hover:glass-interactive transition-all duration-300">
									<p className="font-semibold text-glass-text-primary mb-1">Stellar Apps</p>
									<p className="text-sm text-glass-text-secondary">Built cross-platform app used by 50k monthly users.</p>
								</div>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default Pricing;
