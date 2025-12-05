from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="Mental Health KG Chatbot API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    sessionId: str
    messageId: str
    text: str
    timestamp: str

class ExplanationStep(BaseModel):
    text: str
    source: Optional[str] = None

class Explanation(BaseModel):
    id: str
    steps: List[ExplanationStep]
    confidence: float

class InferredState(BaseModel):
    id: str
    state: str
    confidence: float
    evidence: List[str]
    rule: str

class Intervention(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    duration: str
    urgency: str
    steps: Optional[List[str]] = None

class MessageResponse(BaseModel):
    reply: str
    botMessageId: str
    inferredStates: List[InferredState]
    explanation: Explanation
    suggestedInterventions: List[Intervention]

class Message(BaseModel):
    id: str
    sender: str
    text: str
    timestamp: str

class Session(BaseModel):
    id: str
    alias: Optional[str] = None
    createdAt: str
    messages: List[Message]
    inferences: List[InferredState]

class ResetRequest(BaseModel):
    sessionId: str

class ResetResponse(BaseModel):
    success: bool
    message: str

@app.post("/api/message", response_model=MessageResponse)
async def send_message(request: MessageRequest):
    bot_message_id = f"b-{uuid.uuid4().hex[:8]}"
    
    return MessageResponse(
        reply="I understand you're sharing something important. Thank you for opening up. Let me help you explore these feelings further. How long have you been experiencing this?",
        botMessageId=bot_message_id,
        inferredStates=[
            InferredState(
                id=f"inf-{uuid.uuid4().hex[:6]}",
                state="placeholder_state",
                confidence=0.72,
                evidence=[request.messageId],
                rule="R1: Placeholder rule - actual reasoning will be implemented"
            )
        ],
        explanation=Explanation(
            id=f"ex-{uuid.uuid4().hex[:6]}",
            steps=[
                ExplanationStep(
                    text="Received user message for processing",
                    source=request.messageId
                ),
                ExplanationStep(
                    text="Placeholder: NLP extraction will be implemented here"
                ),
                ExplanationStep(
                    text="Placeholder: Ontology mapping will be implemented here"
                ),
                ExplanationStep(
                    text="Placeholder: Reasoning rules will be applied here"
                )
            ],
            confidence=0.72
        ),
        suggestedInterventions=[
            Intervention(
                id="int-001",
                title="4-7-8 Breathing Exercise",
                description="A calming breathing technique to reduce anxiety",
                duration="5 min",
                urgency="low",
                steps=[
                    "Breathe in quietly through your nose for 4 seconds",
                    "Hold your breath for 7 seconds",
                    "Exhale completely through your mouth for 8 seconds",
                    "Repeat the cycle 3-4 times"
                ]
            )
        ]
    )

@app.get("/api/session/{session_id}", response_model=Session)
async def get_session(session_id: str):
    return Session(
        id=session_id,
        alias="placeholder_session",
        createdAt=datetime.now().isoformat(),
        messages=[
            Message(
                id="msg-welcome",
                sender="bot",
                text="Hi there! I'm here to listen and help you explore your feelings.",
                timestamp=datetime.now().isoformat()
            )
        ],
        inferences=[]
    )

@app.post("/api/reset", response_model=ResetResponse)
async def reset_session(request: ResetRequest):
    return ResetResponse(
        success=True,
        message=f"Session {request.sessionId} has been reset successfully"
    )

@app.get("/")
async def root():
    return {"message": "Mental Health KG Chatbot API", "status": "running"}
