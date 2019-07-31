import { SeoElementMetaData } from './seo.element-meta-data';

export const SEO_MAPPED_ITEMS = [
  new SeoElementMetaData('meta', 'name', 'description', 'content', 'description'),
  new SeoElementMetaData('link', 'rel', 'canonical', 'href', 'canonical'),

  // example of element: <meta name="twitter:site" content="@centralar" />
  new SeoElementMetaData('meta', 'name',     'twitter:site',       'content', 'twitterSite'),
  new SeoElementMetaData('meta', 'property', 'twitter:account_id', 'content', 'twitterAccount'),

  new SeoElementMetaData('meta', 'property', 'fb:page_id', 'content', 'fbPage'),
  new SeoElementMetaData('meta', 'property', 'fb:admins',  'content', 'fbAdmins'),

  new SeoElementMetaData('meta', 'property', 'google-site-verification', 'content', 'gsVerification'),

  new SeoElementMetaData('meta', 'property', 'og:image',       'content', 'ogImage'),
  new SeoElementMetaData('meta', 'property', 'og:title',       'content', 'title'),
  new SeoElementMetaData('meta', 'property', 'og:description', 'content', 'description'),
  new SeoElementMetaData('meta', 'property', 'og:type',        'content', 'ogType'),
  new SeoElementMetaData('meta', 'property', 'og:site_name',   'content', 'ogSiteName'),
  new SeoElementMetaData('meta', 'property', 'og:url',         'content', 'ogUrl'),
];
