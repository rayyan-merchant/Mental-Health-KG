import { useState, useCallback } from 'react';
import { Message, InferredState, Explanation, Intervention } from '../types';
import { sendMessage } from '../api/client';

function generateId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateSessionId(): string {
    return `sess-${Date.now()}`;
}

export function useSession() {
    const [sessionId] = useState(() => generateSessionId());
    const [messages, setMessages] = useState<Message[]>([]);
    const [inferences, setInferences] = useState<InferredState[]>([]);
    const [explanation, setExplanation] = useState<Explanation | null>(null);
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendUserMessage = useCallback(async (text: string) => {
        const userMessageId = generateId();
        const userMessage: Message = {
            id: userMessageId,
            sender: 'user',
            text,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await sendMessage(sessionId, userMessageId, text);

            const botMessage: Message = {
                id: response.botMessageId,
                sender: 'bot',
                text: response.reply,
                timestamp: new Date().toISOString(),
                metadata: {
                    confidence: response.explanation?.confidence
                }
            };

            setMessages(prev => [...prev, botMessage]);
            setInferences(response.inferredStates || []);
            setExplanation(response.explanation || null);
            setInterventions(response.suggestedInterventions || []);
        } catch (error) {
            const errorMessage: Message = {
                id: generateId(),
                sender: 'system',
                text: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId]);

    const clearSession = useCallback(() => {
        setMessages([]);
        setInferences([]);
        setExplanation(null);
        setInterventions([]);
    }, []);

    return {
        sessionId,
        messages,
        inferences,
        explanation,
        interventions,
        isLoading,
        sendUserMessage,
        clearSession
    };
}
