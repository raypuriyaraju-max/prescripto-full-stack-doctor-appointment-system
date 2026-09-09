import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AISymptomChecker = () => {
    const [symptom, setSymptom] = useState('');
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState('');

    const handleCheck = async () => {
        if (!symptom.trim()) return;
        setLoading(true);
        setAdvice('');
        try {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU" });
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: "Patient symptoms: " + symptom + ". Suggest the medical specialist category in short words, followed by a friendly advice sentence.",
            });
            setAdvice(response.text);
        } catch (error) {
            console.error("AI Error:", error);
            setAdvice("Error: " + (error.message || "Connection failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 my-4 max-w-xl mx-auto shadow-sm">
            <h3 className="font-semibold text-indigo-900 mb-2">
                🤖 AI Symptom Checker
            </h3>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="e.g., Severe headache and fever" 
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    className="border p-2 rounded w-full text-sm bg-white text-gray-800 border-gray-300"
                />
                <button 
                    onClick={handleCheck} 
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition"
                >
                    {loading ? 'Analyzing...' : 'Check'}
                </button>
            </div>
            {advice && <p className="mt-2 text-xs text-indigo-800 bg-white p-2 rounded border">{advice}</p>}
        </div>
    );
};

export default AISymptomChecker;