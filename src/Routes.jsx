import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ServicesRevelation from './pages/services-revelation';
import FloatingNavigationEcosystem from './pages/floating-navigation-ecosystem';
import OpeningSequence from './pages/3d-opening-sequence';
import TeamDimension from './pages/team-dimension';
import PortfolioShowcase from './pages/portfolio-showcase';
import ProcessTheater from './pages/process-theater';
import ContactInquiryHub from './pages/contact-inquiry-hub';
import PerformanceOptimizedNavigation from './pages/performance-optimized-navigation-system';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<OpeningSequence />} />
        <Route path="/services-revelation" element={<ServicesRevelation />} />
        <Route path="/floating-navigation-ecosystem" element={<FloatingNavigationEcosystem />} />
        <Route path="/3d-opening-sequence" element={<OpeningSequence />} />
        <Route path="/team-dimension" element={<TeamDimension />} />
        <Route path="/portfolio-showcase" element={<PortfolioShowcase />} />
        <Route path="/process-theater" element={<ProcessTheater />} />
        <Route path="/contact-inquiry-hub" element={<ContactInquiryHub />} />
        <Route path="/performance-optimized-navigation-system" element={<PerformanceOptimizedNavigation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
