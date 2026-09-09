import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIPrescriptionGuide = () => {
    const [medicine, setMedicine] = useState('');
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState('');

    const getDoseGuide = async () => {
        if (!medicine.trim()) return;
        setLoading(true);
        setAdvice('');
        try {
            const apiKey = "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU";
            const ai = new GoogleGenAI({ apiKey: apiKey });
            
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: "Provide a simple general guideline for taking " + medicine + " (e.g., usually taken before/after food, standard timing). Keep it brief and include a medical disclaimer.",
            });
            setAdvice(response.text);
        } catch (error) {
            console.error("API Error Details:", error);
            setAdvice("Please consult your doctor for exact dosage and instructions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100 my-4 max-w-xl mx-auto shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                💊 AI Prescription & Dose Guide
            </h3>
            <p className="text-xs text-indigo-700 mb-3">Dawa ka naam daalein aur jaanein ki use lene ka aam taur par kya tareeka hota hai:</p>
            
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="e.g., Pantoprazole, Amoxicillin..." 
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                    className="border border-indigo-200 p-2 rounded w-full text-sm bg-white text-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <button 
                    onClick={getDoseGuide} 
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition font-medium whitespace-nowrap cursor-pointer"
                >
                    {loading ? 'Checking...' : 'Get Guide'}
                </button>
            </div>

            {advice && (
                <div className="mt-3 text-xs text-indigo-900 bg-white p-3 rounded-lg border border-indigo-200 leading-relaxed whitespace-pre-line">
                    <strong>Dose & Advice:</strong> {advice}
                </div>
            )}
        </div>
    );
};

export default AIPrescriptionGuide;