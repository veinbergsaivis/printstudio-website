import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PrintStudio | Think Bigger. Print Bolder.',
  description = 'Professional printing services for all your needs. High-quality prints, fast turnaround, and exceptional customer service.',
  image = '/og/default-og.jpg',
  url = 'https://printstudio.lv',
  type = 'website'
}) => {
  const siteUrl = 'https://printstudio.lv';
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={`${siteUrl}${url}`} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`${siteUrl}${url}`} />
    </Helmet>
  );
};

export default SEO;