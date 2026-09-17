const baseUrl = 'http://localhost';

const representativeRoutes = [
  '/',
  '/start/',
  '/systems/',
  '/systems/indoor-hydroponic-systems-for-home/',
  '/nutrients-water/hydroponic-nutrients/',
  '/best/hydroponic-system-for-home-growers/',
  '/crops/hydroponic-strawberries/',
  '/reviews/masterblend-hydroponic-nutrients/',
  '/tools/ph-ec-targets/',
  '/tools/nutrient-mixing-calculator/',
  '/search/',
  '/testing-methodology/',
];

const performanceAndAccessibility = {
  'categories:performance': ['error', { minScore: 0.95 }],
  'categories:accessibility': ['error', { minScore: 1 }],
  'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
  'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
  'total-blocking-time': ['error', { maxNumericValue: 200 }],
};

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: representativeRoutes.map((route) => `${baseUrl}${route}`),
      numberOfRuns: 3,
      settings: {
        port: process.env.LIGHTHOUSE_CHROME_PORT
          ? Number(process.env.LIGHTHOUSE_CHROME_PORT)
          : undefined,
        formFactor: 'mobile',
        throttlingMethod: 'simulate',
        // Keep Lighthouse's default mobile slow-4G, 4x CPU and viewport.
      },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '.*',
          aggregationMethod: 'median',
          assertions: performanceAndAccessibility,
        },
        {
          matchingUrlPattern: '^(?!.*\\/search\\/?(?:[?#]|$)).*$',
          aggregationMethod: 'median',
          assertions: {
            'categories:seo': ['error', { minScore: 1 }],
          },
        },
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/reports',
    },
  },
};
