import React from 'react';
import Header from '../../components/ui/Header';
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
      <Header />
      <main className="pt-24">
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Available Apps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map(app => (
              <div key={app.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <img src={app.image} alt={app.title} className="w-20 h-20 mb-4 rounded-xl object-cover" />
                <h3 className="text-xl font-semibold mb-2">{app.title}</h3>
                <p className="text-slate-600 mb-4 text-center">{app.description}</p>
                <div className="flex gap-3">
                  <a href={app.androidUrl} className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition">Download Android</a>
                  <a href={app.iosUrl} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">Download iOS</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
