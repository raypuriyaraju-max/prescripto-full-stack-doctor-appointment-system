import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AILabSimplifier = () => {
    const [testName, setTestName] = useState('');
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState('');

    const decodeTest = async () => {
        if (!testName.trim()) return;
        setLoading(true);
        setExplanation('');
        try {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU" });
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: "Explain what the medical lab test " + testName + " checks for in simple 2 lines, and what high or low values generally mean. Include a standard doctor consultation disclaimer.",
            });
            setExplanation(response.text);
        } catch (error) {
            setExplanation("Please share your lab reports directly with your consulting doctor for accurate interpretation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-cyan-50 rounded-xl border border-cyan-100 my-4 max-w-xl mx-auto shadow-sm">
            <h3 className="font-bold text-cyan-900 mb-2 flex items-center gap-2">
                🔬 AI Lab Report & Test Simplifier
            </h3>
            <p className="text-xs text-cyan-700 mb-3">Kisi bhi lab test ya report ka naam daalein aur uske baare mein asaan bhasha mein jaanein:</p>
            
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="e.g., CBC, Lipid Profile, Thyroid..." 
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="border border-cyan-200 p-2 rounded w-full text-sm bg-white text-gray-800 focus:outline-none focus:border-cyan-500"
                />
                <button 
                    onClick={decodeTest} 
                    disabled={loading}
                    className="bg-cyan-600 text-white px-4 py-2 rounded text-sm hover:bg-cyan-700 transition font-medium whitespace-nowrap cursor-pointer"
                >
                    {loading ? 'Decoding...' : 'Decode Test'}
                </button>
            </div>

            {explanation && (
                <div className="mt-3 text-xs text-cyan-900 bg-white p-3 rounded-lg border border-cyan-200 leading-relaxed whitespace-pre-line">
                    <strong>Simple Explanation:</strong> {explanation}
                </div>
            )}
        </div>
    );
};

export default AILabSimplifier;