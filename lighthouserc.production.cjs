// Execute only after approved production deployment. No local server or upload.
const local = require('./lighthouserc.cjs');
const { productionTarget } = require('./scripts/production-target.mjs');
const origin = productionTarget(process.env.PRODUCTION_BASE_URL);
const { staticDistDir: _localDirectory, ...collect } = local.ci.collect;

module.exports = {
  ci: {
    ...local.ci,
    collect: {
      ...collect,
      url: collect.url.map((url) => origin + new URL(url).pathname),
    },
  },
};
