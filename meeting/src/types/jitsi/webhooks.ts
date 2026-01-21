export interface JaaSWebhookEvent {
    idempotencyKey?: string;
    customerId?: string;
    appId?: string;
    eventType: JaaSEventType;
    sessionId?: string;
    timestamp?: number;
    fqn?: string;
    data: any;
}

export type JaaSEventType =
    | 'ROOM_CREATED'
    | 'PARTICIPANT_LEFT'
    | 'PARTICIPANT_LEFT_LOBBY'
    | 'TRANSCRIPTION_UPLOADED'
    | 'CHAT_UPLOADED'
    | 'ROOM_DESTROYED'
    | 'PARTICIPANT_JOINED'
    | 'PARTICIPANT_JOINED_LOBBY'
    | 'RECORDING_STARTED'
    | 'RECORDING_ENDED'
    | 'RECORDING_UPLOADED'
    | 'LIVE_STREAM_STARTED'
    | 'LIVE_STREAM_ENDED'
    | 'SIP_CALL_IN_STARTED'
    | 'SIP_CALL_IN_ENDED'
    | 'SIP_CALL_OUT_STARTED'
    | 'SIP_CALL_OUT_ENDED'
    | 'FEEDBACK'
    | 'DIAL_IN_STARTED'
    | 'DIAL_IN_ENDED'
    | 'DIAL_OUT_STARTED'
    | 'DIAL_OUT_ENDED'
    | 'USAGE'
    | 'SPEAKER_STATS'
    | 'POLL_CREATED'
    | 'POLL_ANSWER'
    | 'REACTIONS'
    | 'AGGREGATED_REACTIONS'
    | 'SCREEN_SHARING_HISTORY'
    | 'VIDEO_SEGMENT_UPLOADED'
    | 'ROLE_CHANGED'
    | 'RTCSTATS_UPLOADED'
    | 'TRANSCRIPTION_CHUNK_RECEIVED'
    | 'DOCUMENT_ADDED'
    | 'DOCUMENT_DELETED';

export interface RoomCreatedData {
    conference: string;
    isBreakout?: boolean;
    breakoutRoomId?: string;
}

export interface ParticipantData {
    moderator?: boolean | string; 
    name?: string;
    group?: string;
    email?: string;
    id?: string;
    participantJid?: string;
    participantId?: string;
    avatar?: string;
    disconnectReason?: string;
    isBreakout?: boolean;
    breakoutRoomId?: string;
}

export interface RecordingData {
    conference?: string;
    participants?: ParticipantData[];
    preAuthenticatedLink?: string;
    share?: boolean;
    initiatorId?: string;
    durationSec?: number;
    startTimestamp?: number;
    endTimestamp?: number;
    recordingSessionId?: string;
}

export interface PollData {
    question?: string;
    answers?: { key: number; name: string; value?: boolean }[];
    pollId?: string;
    user?: ParticipantData;
    isBreakout?: boolean;
    breakoutRoomId?: string;
}

export interface UsageData {
    customerId: string;
    deviceId: string;
    email?: string;
    kid?: string;
    userId?: string;
    callDirection?: 'in' | 'out';
}

export interface DocumentData {
    preAuthenticatedLink?: string;
    fileName?: string;
    fileId?: string;
    fileSize?: number;
    initiatorId?: string;
    fileCreatedAt?: number;
    linkExpiration?: number;
}
