// SEO utility functions and configurations
export const seoConfig = {
  siteName: "R-Tech Solutions",
  siteUrl: "http://rtechsl.lk",
  defaultImage: "/public/new_brand.png",
  twitterHandle: "@RTechSolutions",
  facebookPage: "https://www.facebook.com/rtechsolutions",
  linkedinCompany: "https://www.linkedin.com/company/r-tech-solutions",
  instagramHandle: "https://www.instagram.com/rtechsolutions",
  phone: "+1-555-0123",
  email: "info@r-tech-solutions.com",
  address: {
    street: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "US"
  }
};

// Page-specific SEO configurations
export const pageSeoConfigs = {
  home: {
    title: "R-Tech Solutions - Advanced Technology Solutions",
    description: "Leading provider of cutting-edge technology solutions including web development, mobile apps, AI integration, and digital transformation services. Transform your business with our innovative tech solutions.",
    keywords: "technology solutions, web development, mobile apps, AI integration, digital transformation, software development, tech consulting",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "R-Tech Solutions",
      "url": seoConfig.siteUrl,
      "logo": `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
      "description": "Leading provider of cutting-edge technology solutions",
      "foundingDate": "2020",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": seoConfig.phone,
        "contactType": "customer service",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        seoConfig.facebookPage,
        `https://www.twitter.com/${seoConfig.twitterHandle.replace('@', '')}`,
        seoConfig.linkedinCompany,
        seoConfig.instagramHandle
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": seoConfig.address.street,
        "addressLocality": seoConfig.address.city,
        "addressRegion": seoConfig.address.state,
        "postalCode": seoConfig.address.zip,
        "addressCountry": seoConfig.address.country
      }
    }
  },
  
  services: {
    title: "Technology Services - Web Development, Mobile Apps & AI Solutions",
    description: "Comprehensive technology services including custom web development, mobile app development, AI integration, cloud solutions, and digital transformation consulting.",
    keywords: "web development services, mobile app development, AI solutions, cloud computing, digital transformation, custom software development",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Technology Services",
      "description": "Comprehensive technology services and solutions",
      "provider": {
        "@type": "Organization",
        "name": "R-Tech Solutions"
      },
      "serviceType": "Technology Consulting",
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Technology Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Development",
              "description": "Custom web applications and websites"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile App Development",
              "description": "iOS and Android mobile applications"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Integration",
              "description": "Artificial Intelligence solutions and integration"
            }
          }
        ]
      }
    }
  },
  
  portfolio: {
    title: "Portfolio - Our Technology Projects & Success Stories",
    description: "Explore our portfolio of successful technology projects including web applications, mobile apps, AI solutions, and digital transformation initiatives.",
    keywords: "technology portfolio, web development projects, mobile app projects, AI projects, case studies, success stories",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Technology Portfolio",
      "description": "Collection of successful technology projects",
      "numberOfItems": "10+",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "E-commerce Platform",
          "description": "Custom e-commerce solution with AI-powered recommendations"
        },
        {
          "@type": "CreativeWork",
          "name": "Mobile Banking App",
          "description": "Secure mobile banking application with biometric authentication"
        }
      ]
    }
  },
  
  team: {
    title: "Our Team - Expert Technology Professionals",
    description: "Meet our team of expert technology professionals, developers, designers, and consultants who bring years of experience in delivering cutting-edge solutions.",
    keywords: "technology team, software developers, designers, consultants, tech professionals, expert team",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "R-Tech Solutions Team",
      "description": "Expert technology professionals",
      "employee": [
        {
          "@type": "Person",
          "name": "John Doe",
          "jobTitle": "Lead Developer",
          "description": "Senior Full-Stack Developer with 10+ years experience"
        },
        {
          "@type": "Person",
          "name": "Jane Smith",
          "jobTitle": "UI/UX Designer",
          "description": "Creative Designer specializing in user experience"
        }
      ]
    }
  },
  
  pricing: {
    title: "Pricing Plans - Technology Solutions Pricing",
    description: "Transparent pricing for our technology solutions. Choose from flexible plans for web development, mobile apps, AI integration, and consulting services.",
    keywords: "technology pricing, web development pricing, mobile app pricing, AI solutions pricing, consulting rates",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Technology Solutions",
      "description": "Comprehensive technology solutions and services",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "5000",
        "highPrice": "50000",
        "offerCount": "3"
      }
    }
  },
  
  contact: {
    title: "Contact Us - Get Your Technology Project Started",
    description: "Ready to start your technology project? Contact our expert team for a free consultation. We're here to help transform your business with innovative tech solutions.",
    keywords: "contact technology consultants, free consultation, tech project inquiry, get started",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact R-Tech Solutions",
      "description": "Get in touch with our technology experts",
      "mainEntity": {
        "@type": "Organization",
        "name": "R-Tech Solutions",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": seoConfig.phone,
          "contactType": "customer service",
          "email": seoConfig.email,
          "availableLanguage": ["English"]
        }
      }
    }
  },
  
  careers: {
    title: "Careers - Join Our Technology Team",
    description: "Join our growing technology team! We're looking for talented developers, designers, and tech professionals to help us deliver innovative solutions.",
    keywords: "tech careers, software developer jobs, designer jobs, technology careers, join our team",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Technology Professional",
      "description": "Join our technology team",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "R-Tech Solutions"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": seoConfig.address.city,
          "addressRegion": seoConfig.address.state,
          "addressCountry": seoConfig.address.country
        }
      },
      "employmentType": "FULL_TIME"
    }
  },
  
  blogs: {
    title: "Technology Blog - Latest Tech Insights & Trends",
    description: "Stay updated with the latest technology trends, insights, and best practices. Our blog covers web development, mobile apps, AI, and digital transformation.",
    keywords: "technology blog, tech insights, web development blog, mobile app blog, AI trends, digital transformation",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "R-Tech Solutions Blog",
      "description": "Technology insights and trends",
      "publisher": {
        "@type": "Organization",
        "name": "R-Tech Solutions"
      }
    }
  },
  
  faqs: {
    title: "FAQs - Frequently Asked Questions About Our Services",
    description: "Find answers to common questions about our technology services, pricing, development process, and more. Get the information you need to make informed decisions.",
    keywords: "technology FAQs, service questions, development process, pricing questions, tech support",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What technology services do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer comprehensive technology services including web development, mobile app development, AI integration, cloud solutions, and digital transformation consulting."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a typical project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines vary based on complexity, but most web development projects take 4-12 weeks, while mobile apps typically take 8-16 weeks."
          }
        }
      ]
    }
  }
};

// Utility function to generate page-specific SEO data
export const generatePageSEO = (pageKey, customData = {}) => {
  const baseConfig = pageSeoConfigs[pageKey] || pageSeoConfigs.home;
  
  return {
    title: customData.title || baseConfig.title,
    description: customData.description || baseConfig.description,
    keywords: customData.keywords || baseConfig.keywords,
    image: customData.image || seoConfig.defaultImage,
    url: customData.url || `${seoConfig.siteUrl}/${pageKey}`,
    type: customData.type || "website",
    structuredData: customData.structuredData || baseConfig.structuredData,
    ...customData
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate article structured data
export const generateArticleStructuredData = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "R-Tech Solutions"
    },
    "publisher": {
      "@type": "Organization",
      "name": "R-Tech Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}${seoConfig.defaultImage}`
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
};
