const rt = process.cwd();
const {version} = require(rt+'/package.json');
require('child_process')
  .execSync(`node ${rt}/node_modules/browserify/bin/cmd ${rt}/index.js -o ${rt}/cdn/hijri-date-${version}.js`);
