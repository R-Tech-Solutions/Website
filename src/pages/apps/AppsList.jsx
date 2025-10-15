import React from 'react';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import Footer from '../../components/ui/Footer';

const apps = [
  {
    id: 1,
    image: 'https://via.placeholder.com/80',
    title: 'SuperApp',
    description: 'All-in-one productivity suite for teams and individuals.',
    androidUrl: '#',
    iosUrl: '#'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/80',
    title: 'PhotoMaster',
    description: 'Advanced photo editing tools with AI features.',
    androidUrl: '#',
    iosUrl: '#'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/80',
    title: 'HealthTrack',
    description: 'Track your fitness, diet, and wellness goals easily.',
    androidUrl: '#',
    iosUrl: '#'
  }
];

export default function AppsList() {
  return (
    <>
      <SEO {...generatePageSEO('apps')} />
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">Available Apps</h2>
              <p className="text-lg text-glass-text-secondary max-w-2xl mx-auto">
                Discover our collection of mobile applications designed to enhance your productivity and lifestyle.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {apps.map(app => (
                <div
                  key={app.id}
                  className="glass-morphism rounded-2xl p-6 shadow-glass hover:glass-interactive transition-all duration-300 flex flex-col items-center"
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-xl object-cover"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-glass-text-primary mb-2">
                    {app.title}
                  </h3>
                  <p className="text-glass-text-secondary mb-4 text-center text-sm md:text-base">
                    {app.description}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={app.androidUrl}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:shadow-glass-interactive transition-all duration-300"
                    >
                      Download Android
                    </a>
                    <a
                      href={app.iosUrl}
                      className="px-4 py-2 bg-gradient-to-r from-accent to-primary text-white rounded-lg font-medium hover:shadow-glass-interactive transition-all duration-300"
                    >
                      Download iOS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
