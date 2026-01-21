import jwt from 'jsonwebtoken';

interface JitsiUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isModerator?: boolean;
}

interface JitsiConfig {
    room: string;
    user: JitsiUser;
    appId: string;      // Tenant ID (vpaas-magic-cookie-...)
    kid: string;        // Key ID
    privateKey: string; // Private Key content
}

/**
 * Generates a Jitsi JaaS JWT token using RS256
 */
export const generateJitsiToken = ({ room, user, appId, kid, privateKey }: JitsiConfig) => {
    if (!appId || !kid || !privateKey) {
        console.warn("Missing JaaS credentials");
        return null;
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 7200; // 2 hours

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
        room: `*`, // Wildcard to allow any room or specific room
        exp: exp,
        nbf: now - 10
    };

    try {
        return jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            keyid: kid
        });
    } catch (e) {
        console.error("Failed to sign JWT", e);
        return null;
    }
};
