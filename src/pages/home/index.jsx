import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import Hero from "./components/Hero";
import DownloadBundle from "./components/DownloadBundle";
import TrustedLogos from "./components/TrustedLogos";
import Testimonials from "./components/Testimonials";
import TechStack from "./components/TechStack";
import ClientsScroller from "./components/ClientsScroller";

const TABS = [
	{ id: 'home', label: 'Home' },
	{ id: 'download', label: 'Download' },
	{ id: 'trusted', label: 'Trusted' },
	{ id: 'testimonials', label: 'Testimonials' },
	{ id: 'tech', label: 'Technology' },
	{ id: 'clients', label: 'Clients' },
];

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<Header />

			<div className="container mx-auto">
				<Hero />
				<DownloadBundle />
				<TrustedLogos />
				<Testimonials />
				<TechStack />
				<ClientsScroller />
			</div>

			<footer id="contact" className="py-8 text-center text-sm text-muted-foreground">
				© {new Date().getFullYear()} R-Tech Solutions — Built with care.
			</footer>
		</main>
	);
}

