import { useState } from 'react';
import { ChatShell } from '../components/chat/ChatShell';
import { Composer } from '../components/chat/Composer';
import { QuickPrompts } from '../components/chat/QuickPrompts';
import { ExplanationPanel } from '../components/explanation/ExplanationPanel';
import { InterventionCard } from '../components/intervention/InterventionCard';
import { ExerciseModal } from '../components/intervention/ExerciseModal';
import { useSession } from '../hooks/useSession';

export function Chat() {
    const { messages, inferences, explanation, interventions, isLoading, sendUserMessage } = useSession();
    const [exerciseOpen, setExerciseOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

    const handleQuickPrompt = (text: string) => {
        sendUserMessage(text);
    };

    const handleEvidenceClick = (messageId: string) => {
        setSelectedMessageId(messageId);
        const element = document.getElementById(`message-${messageId}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col min-w-0">
                <ChatShell
                    messages={messages}
                    isLoading={isLoading}
                    onSelectMessage={setSelectedMessageId}
                />
                <QuickPrompts onSelect={handleQuickPrompt} />
                <Composer onSend={sendUserMessage} disabled={isLoading} />
            </div>

            <aside className="hidden lg:block w-80 xl:w-96 border-l border-gray-100 bg-background overflow-y-auto p-4 space-y-4">
                <ExplanationPanel
                    inferences={inferences}
                    explanation={explanation}
                    onEvidenceClick={handleEvidenceClick}
                />

                {interventions.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-slate-text/70">Suggested Activities</h3>
                        {interventions.map((intervention) => (
                            <InterventionCard
                                key={intervention.id}
                                intervention={intervention}
                                onStart={() => setExerciseOpen(true)}
                            />
                        ))}
                    </div>
                )}
            </aside>

            <ExerciseModal isOpen={exerciseOpen} onClose={() => setExerciseOpen(false)} />
        </div>
    );
}
