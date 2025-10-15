import React, { useMemo, useState } from 'react';
import CareersHeader from './components/CareersHeader';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import FilterBar from './components/FilterBar';
import JobCard from './components/JobCard';
import ApplyModal from './components/ApplyModal';
import CTAButton from './components/CTAButton';
const MOCK_JOBS = [
	{
		id: '1',
		title: 'Senior Frontend Engineer',
		team: 'Engineering',
		location: 'Remote',
		type: 'Full-time',
		summary: 'Lead ambitious frontend initiatives using React, Vite and modern tooling to build performant UIs.',
		skills: ['React', 'TypeScript', 'Tailwind', 'Performance'],
	},
	{
		id: '2',
		title: 'Product Designer',
		team: 'Design',
		location: 'New York, USA',
		type: 'Full-time',
		summary: 'Design delightful interfaces and craft pixel-perfect experiences across web and mobile.',
		skills: ['Figma', 'UX', 'Prototyping', 'Motion'],
	},
	{
		id: '3',
		title: 'DevRel Engineer',
		team: 'Developer Experience',
		location: 'Berlin, Germany',
		type: 'Part-time',
		summary: 'Evangelize our platform, create demos, and build SDKs and docs that delight developers.',
		skills: ['SDKs', 'Docs', 'JS', 'Content'],
	},
];

export default function CareersPage() {
	const [filters, setFilters] = useState({ q: '', location: '', team: '' });
	const [activeJob, setActiveJob] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const filtered = useMemo(() => {
		const q = filters.q?.toLowerCase?.() || '';
		return MOCK_JOBS.filter((job) => {
			if (filters.location && job.location !== filters.location) return false;
			if (filters.team && job.team !== filters.team) return false;
			if (!q) return true;
			return (
				job.title.toLowerCase().includes(q) ||
				job.summary.toLowerCase().includes(q) ||
				job.skills.join(' ').toLowerCase().includes(q)
			);
		});
	}, [filters]);

	function openApply(job) {
		setActiveJob(job);
		setModalOpen(true);
	}
	return (
		<>
			<SEO {...generatePageSEO('careers')} />
			<div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Header />
				</div>
				<main className="container pt-20 md:pt-28 pb-16">
					<CareersHeader total={MOCK_JOBS.length} />
					<section className="mb-6">
						<FilterBar filters={filters} onChange={setFilters} />
					</section>
					<section id="open-roles" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filtered.length > 0 ? (
							filtered.map((job) => (
								<div className="min-h-full flex">
									<JobCard key={job.id} job={job} onApply={openApply} />
								</div>
							))
						) : (
							<div className="glass-surface p-6 rounded-lg text-center col-span-full">
								<h3 className="text-lg font-semibold">No roles match your filters</h3>
								<p className="text-sm text-muted-foreground mt-2">Try resetting filters or check back later.</p>
								<div className="mt-4 flex justify-center">
									<CTAButton onClick={() => setFilters({ q: '', location: '', team: '' })}>Reset filters</CTAButton>
								</div>
							</div>
						)}
					</section>

					<section className="mt-12 glass-morphism p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
						<div>
							<h4 className="text-xl font-semibold">Can't find a fit?</h4>
							<p className="text-sm text-muted-foreground">Submit your resume and we'll reach out when something opens up.</p>
						</div>
						<div className="flex gap-3">
							<CTAButton onClick={() => { setActiveJob({ title: 'General Application' }); setModalOpen(true); }}>Submit resume</CTAButton>
							<a href="mailto:careers@example.com" className="px-4 py-2 border border-border rounded-md">Email us</a>
						</div>
					</section>

					<ApplyModal job={activeJob} open={modalOpen} onClose={() => setModalOpen(false)} />
				</main>
			</div>
		</>
	);
}
