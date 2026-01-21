const fs = require('fs');
const content = fs.readFileSync('.env', 'utf8');
const lines = content.split('\n');
let appId = '';
lines.forEach(line => {
    if (line.startsWith('JITSI_APP_ID=')) {
        appId = line.split('=')[1].trim();
    }
});

if (appId) {
    const newLines = lines.filter(l => !l.startsWith('JITSI_KID='));
    newLines.push(`JITSI_KID=${appId}/123456`); 
  

    
    newLines.push(`JITSI_KID=${appId}`);
    fs.writeFileSync('.env', newLines.join('\n'));
    console.log('Set JITSI_KID to matching App ID');
} else {
    console.log('App ID not found');
}
