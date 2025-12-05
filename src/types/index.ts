export interface Message {
    id: string;
    sender: 'user' | 'bot' | 'system';
    text: string;
    timestamp: string;
    metadata?: {
        confidence?: number;
        extractedConcepts?: string[];
    };
}

export interface InferredState {
    id: string;
    state: string;
    confidence: number;
    evidence: string[];
    rule: string;
}

export interface ExplanationStep {
    text: string;
    source?: string;
}

export interface Explanation {
    id: string;
    steps: ExplanationStep[];
    confidence: number;
}

export interface Intervention {
    id: string;
    title: string;
    description?: string;
    duration: string;
    urgency: 'low' | 'medium' | 'high';
    steps?: string[];
}

export interface Session {
    id: string;
    alias?: string;
    createdAt: string;
    messages: Message[];
    inferences: InferredState[];
    explanations: Explanation[];
}

export interface MessageResponse {
    reply: string;
    botMessageId: string;
    inferredStates: InferredState[];
    explanation: Explanation;
    suggestedInterventions: Intervention[];
}
