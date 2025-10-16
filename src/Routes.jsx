import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ServicesRevelation from './pages/services-revelation';
// import FloatingNavigationEcosystem from './pages/floating-navigation-ecosystem';
import OpeningSequence from './pages/3d-opening-sequence';
import TeamDimension from './pages/team-dimension';
import PortfolioShowcase from './pages/portfolio-showcase';
import ProcessTheater from './pages/process-theater';
import ContactInquiryHub from './pages/contact-inquiry-hub';
import PerformanceOptimizedNavigation from './pages/performance-optimized-navigation-system';
import Home from './pages/home'
import Careers from './pages/Careers'
import Blogs from './pages/Blogs'
import PostPage from './pages/Blogs/Post'
import Pricing from './pages/Pricing'
import AppsList from './pages/apps/AppsList';
import Faqs from './pages/Faqs';
import Footer from './components/ui/Footer';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <InnerRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

function InnerRoutes() {
  const location = useLocation();
  // normalize pathname (remove trailing slashes) but keep root as '/'
  const normalized = location.pathname.replace(/\/+$/, '') || '/';
  // Hide footer on the opening sequence / home routes (support aliases)
  const hideFooter = normalized === '/' || normalized === '/R-Tech' || normalized === '/R-Tech_Solutions';

  return (
    <>
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<OpeningSequence />} />
        <Route path="/services" element={<ServicesRevelation />} />
        {/* <Route path="/floating-navigation-ecosystem" element={<FloatingNavigationEcosystem />} /> */}
        <Route path="/R-Tech_Solutions" element={<OpeningSequence />} />
        <Route path="/team" element={<TeamDimension />} />
        <Route path="/portfolio" element={<PortfolioShowcase />} />
        <Route path="/process" element={<ProcessTheater />} />
        <Route path="/contact" element={<ContactInquiryHub />} />
        <Route path="/performance-optimized-navigation-system" element={<PerformanceOptimizedNavigation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apps" element={<AppsList />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<PostPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default Routes;
