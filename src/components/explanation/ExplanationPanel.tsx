import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Copy, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { InferredState, Explanation } from '../../types';

interface ExplanationPanelProps {
    inferences: InferredState[];
    explanation: Explanation | null;
    onEvidenceClick?: (messageId: string) => void;
}

export function ExplanationPanel({ inferences, explanation, onEvidenceClick }: ExplanationPanelProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!explanation && inferences.length === 0) {
        return (
            <div className="card">
                <h3 className="text-sm font-medium text-slate-text/50 mb-2">Explanation</h3>
                <p className="text-sm text-slate-text/40">
                    Send a message to see the reasoning and explanation here.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Current Analysis</h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4"
                    >
                        {inferences.map((inf) => (
                            <div key={inf.id} className="p-3 bg-background rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-primary">{inf.state}</span>
                                    <span className={`confidence-badge ${inf.confidence >= 0.7 ? 'high' :
                                            inf.confidence >= 0.4 ? 'medium' : 'low'
                                        }`}>
                                        {Math.round(inf.confidence * 100)}%
                                    </span>
                                </div>
                                <p className="text-xs text-slate-text/60">{inf.rule}</p>
                            </div>
                        ))}

                        {explanation && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-slate-text/70">Reasoning Steps</h4>
                                <ol className="space-y-2">
                                    {explanation.steps.map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-2 text-sm"
                                        >
                                            <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                            <span className="text-slate-text/70">
                                                {step.text}
                                                {step.source && (
                                                    <button
                                                        onClick={() => onEvidenceClick?.(step.source!)}
                                                        className="ml-1 text-primary hover:underline"
                                                    >
                                                        (view)
                                                    </button>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                            <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                                <Copy size={14} />
                                Copy
                            </button>
                            <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                                <Bookmark size={14} />
                                Save
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
