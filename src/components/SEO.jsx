import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title = "R-Tech Solutions - Advanced Technology Solutions",
  description = "Leading provider of cutting-edge technology solutions including web development, mobile apps, AI integration, and digital transformation services.",
  keywords = "technology solutions, web development, mobile apps, AI integration, digital transformation, software development, tech consulting",
  image = "/public/new_brand.png",
  url = "http://rtechsl.lk",
  type = "website",
  author = "R-Tech Solutions",
  publishedTime = null,
  modifiedTime = null,
  section = null,
  tags = [],
  canonical = null,
  noindex = false,
  nofollow = false,
  structuredData = null
}) => {
  const fullTitle = title.includes("R-Tech Solutions") ? title : `${title} | R-Tech Solutions`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const canonicalUrl = canonical || url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="R-Tech Solutions" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@RTechSolutions" />
      <meta name="twitter:creator" content="@RTechSolutions" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Article Specific Meta Tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* LinkedIn Specific */}
      <meta property="linkedin:owner" content="r-tech-solutions" />
      
      {/* Pinterest Specific */}
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="bing-site-verification" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="R-Tech Solutions" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Structured Data for Organization */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "R-Tech Solutions",
            "url": "http://rtechsl.lk",
            "logo": `${url}/public/new_brand.png`,
            "description": "Leading provider of cutting-edge technology solutions including web development, mobile apps, AI integration, and digital transformation services.",
            "foundingDate": "2020",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0123",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.facebook.com/rtechsolutions",
              "https://www.twitter.com/rtechsolutions",
              "https://www.linkedin.com/company/r-tech-solutions",
              "https://www.instagram.com/rtechsolutions"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Tech Street",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "postalCode": "94105",
              "addressCountry": "US"
            },
            "service": [
              {
                "@type": "Service",
                "name": "Web Development",
                "description": "Custom web applications and websites"
              },
              {
                "@type": "Service",
                "name": "Mobile App Development",
                "description": "iOS and Android mobile applications"
              },
              {
                "@type": "Service",
                "name": "AI Integration",
                "description": "Artificial Intelligence solutions and integration"
              },
              {
                "@type": "Service",
                "name": "Digital Transformation",
                "description": "Complete digital transformation consulting"
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
