import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIHealthFact = () => {
    const [fact, setFact] = useState("Click below to discover an amazing medical fact about human body!");
    const [loading, setLoading] = useState(false);

    const generateFact = async () => {
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU" });
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: "Write one short, fascinating, and lesser-known health or human body fact in one sentence.",
            });
            setFact(response.text);
        } catch (error) {
            setFact("Drinking enough water boosts your brain performance and energy levels.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 my-4 max-w-xl mx-auto shadow-sm text-center">
            <h3 className="font-bold text-emerald-900 mb-2">🧬 AI Health Fact of the Day</h3>
            <p className="text-sm text-emerald-800 bg-white p-3 rounded-lg border border-emerald-200 mb-3">
                {fact}
            </p>
            <button 
                onClick={generateFact} 
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-1.5 rounded text-xs hover:bg-emerald-700 transition font-medium cursor-pointer"
            >
                {loading ? 'Loading...' : 'New Fact'}
            </button>
        </div>
    );
};

export default AIHealthFact;