const fs = require('fs');
const content = fs.readFileSync('.env', 'utf8');
const keys = content.split('\n').map(l => l.split('=')[0]);
console.log("Found keys:", keys.filter(k => k.includes('JITSI')));
