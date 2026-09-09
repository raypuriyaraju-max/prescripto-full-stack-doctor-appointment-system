import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIFirstAid = () => {
    const [guide, setGuide] = useState("Click below to get instant first-aid tips for common minor injuries.");
    const [loading, setLoading] = useState(false);

    const getFirstAid = async () => {
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyALUpZKswy35bh2sUdEubI3a7AORSfugJU" });
            const response = await ai.models.generateContent({
                model: 'gemini-5.0-flash',
                contents: "Give short, 2-line quick first-aid advice for a random common minor household injury (like minor cuts, burns, or sprains).",
            });
            setGuide(response.text);
        } catch (error) {
            setGuide("In case of minor cuts: Clean the wound with water, apply antiseptic, and cover with a clean bandage.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 my-4 max-w-xl mx-auto shadow-sm text-center">
            <h3 className="font-bold text-rose-900 mb-2">🚨 AI First-Aid Quick Guide</h3>
            <p className="text-sm text-rose-800 bg-white p-3 rounded-lg border border-rose-200 mb-3 whitespace-pre-line">
                {guide}
            </p>
            <button 
                onClick={getFirstAid} 
                disabled={loading}
                className="bg-rose-600 text-white px-4 py-1.5 rounded text-xs hover:bg-rose-700 transition font-medium cursor-pointer"
            >
                {loading ? 'Fetching Guide...' : 'Get First-Aid Tip'}
            </button>
        </div>
    );
};

export default AIFirstAid;