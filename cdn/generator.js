const rt = process.cwd();
const {version} = require(rt+'/package.json');
const shell = require('child_process').execSync;
const cmd = (suffix) =>`node ${rt}/node_modules/browserify/bin/cmd ${rt}/index.js -o ${rt}/cdn/hijri-date-${suffix}.js` ;
shell(cmd(version));
shell(cmd('latest'));
