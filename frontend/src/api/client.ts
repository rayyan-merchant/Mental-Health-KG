import { MessageResponse, Session } from '../types';

const API_BASE = '/api';

export async function sendMessage(
    sessionId: string,
    messageId: string,
    text: string
): Promise<MessageResponse> {
    const response = await fetch(`${API_BASE}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionId,
            messageId,
            text,
            timestamp: new Date().toISOString()
        })
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
}

export async function getSession(sessionId: string): Promise<Session> {
    const response = await fetch(`${API_BASE}/session/${sessionId}`);

    if (!response.ok) {
        throw new Error('Failed to get session');
    }

    return response.json();
}

export async function resetSession(sessionId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
        throw new Error('Failed to reset session');
    }

    return response.json();
}
