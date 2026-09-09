import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIHealthQuote = () => {
    const [quote, setQuote] = useState("Click the button for a daily dose of wellness motivation!");
    const [loading, setLoading] = useState(false);

    const generateQuote = async () => {
        setLoading(true);
        try {
            // Yahan apni Gemini API key daal dein
            const ai = new GoogleGenAI({ apiKey: "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU" });
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: "Write a short, inspiring health and wellness quote in one sentence.",
            });
            setQuote(response.text);
        } catch (error) {
            setQuote("Take care of your body. It's the only place you have to live.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 my-4 max-w-xl mx-auto shadow-sm text-center">
            <h3 className="font-bold text-amber-900 mb-2">✨ AI Health Inspiration</h3>
            <p className="text-sm text-amber-800 italic bg-white p-3 rounded-lg border border-amber-200 mb-3">
                "{quote}"
            </p>
            <button 
                onClick={generateQuote} 
                disabled={loading}
                className="bg-amber-600 text-white px-4 py-1.5 rounded text-xs hover:bg-amber-700 transition font-medium cursor-pointer"
            >
                {loading ? 'Loading...' : 'New Quote'}
            </button>
        </div>
    );
};

export default AIHealthQuote;