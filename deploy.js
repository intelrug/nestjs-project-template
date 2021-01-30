// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const ghpages = require('gh-pages');

ghpages.publish(
  '.',
  {
    src: [
      'dist/**/*',
      '.env',
      '.env.production',
      'env.js',
      'ormconfig.js',
      'package.json',
      'yarn.lock',
    ],
    branch: 'dist',
  },
  (e) => {
    if (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      process.exit(1);
    }
  },
);
