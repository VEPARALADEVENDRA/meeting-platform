const jwt = require('jsonwebtoken');
require('dotenv').config();

const formatPrivateKey = (key) => {
    let raw = key
        .replace(/\\n/g, '')
        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
        .replace(/-----END PRIVATE KEY-----/g, '')
        .replace(/\s/g, '');

    const chunked = raw.match(/.{1,64}/g)?.join('\n');

    return `-----BEGIN PRIVATE KEY-----\n${chunked}\n-----END PRIVATE KEY-----`;
};

const generateJitsiToken = ({ room, user, appId, kid, privateKey }) => {
    if (!appId || !kid || !privateKey) {
        console.warn("Missing JaaS credentials");
        return null;
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 7200;

    const payload = {
        context: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                moderator: user.isModerator === true ? true : false
            },
            features: {
                recording: true,
                livestreaming: true,
                'screen-sharing': true,
            }
        },
        aud: 'jitsi',
        iss: 'chat',
        sub: appId,
        room: `*`,
        exp: exp,
        nbf: now - 10
    };

    try {
        const formattedKey = formatPrivateKey(privateKey);
        console.log("Formatted Key Preview:\n" + formattedKey.substring(0, 50) + "...");
        return jwt.sign(payload, formattedKey, {
            algorithm: 'RS256',
            keyid: kid
        });
    } catch (e) {
        console.error("Failed to sign JWT:", e.message);
        console.error("Stack:", e.stack);
        return null;
    }
};

const user = {
    id: 'user1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: "",
    isModerator: true,
};

console.log("Attempting to generate token...");
const token = generateJitsiToken({
    room: 'test-room',
    user,
    appId: process.env.JITSI_APP_ID || '',
    kid: process.env.JITSI_KID || '',
    privateKey: (process.env.JITSI_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
});

if (token) {
    console.log("Success! Token generated.");
} else {
    console.log("Failure! Token is null.");
}
