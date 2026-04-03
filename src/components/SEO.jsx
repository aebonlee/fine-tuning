import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../config/site';

const DEFAULT_OG_IMAGE = `${SITE_CONFIG.url}/og/default.png`;

export default function SEO({ title, description, path, ogImage, type = 'website', noindex = false, jsonLd }) {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`;
  const fullUrl = path ? `${SITE_CONFIG.url}${path}` : SITE_CONFIG.url;
  const desc = description || SITE_CONFIG.description;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
