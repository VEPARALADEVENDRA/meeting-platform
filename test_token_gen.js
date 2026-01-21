require('dotenv').config();
const jwt = require('jsonwebtoken');

const APP_ID = process.env.JITSI_APP_ID;
const KID = process.env.JITSI_KID;
const PRIV_KEY = (process.env.JITSI_PRIVATE_KEY || '').replace(/\\n/g, '\n');

console.log('--- Env Check ---');
console.log('APP_ID:', APP_ID ? 'OK' : 'MISSING');
console.log('KID:', KID ? 'OK' : 'MISSING');
console.log('PRIV_KEY:', PRIV_KEY ? 'OK (Length: ' + PRIV_KEY.length + ')' : 'MISSING');

if (!APP_ID || !KID || !PRIV_KEY) {
    console.error('CRITICAL: Missing credentials.');
    process.exit(1);
}

const now = Math.floor(Date.now() / 1000);
const payload = {
    context: {
        user: {
            name: 'Test User'
        },
        features: {
            recording: true
        }
    },
    aud: 'jitsi',
    iss: 'chat',
    sub: APP_ID,
    room: '*',
    exp: now + 60,
    nbf: now - 10
};

try {
    const token = jwt.sign(payload, PRIV_KEY, {
        algorithm: 'RS256',
        keyid: KID
    });
    console.log('\n--- Success ---');
    console.log('Token Generated Successfully!');
    console.log('Token:', token.substring(0, 20) + '...');
} catch (e) {
    console.error('\n--- Error ---');
    console.error('Signing failed:', e.message);
}
