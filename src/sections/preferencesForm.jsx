import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function PreferencesForm({ userInfo, onBack, onGenerate, isLoading }) {
    const [preferences, setPreferences] = useState({
        duration: '',
        durationType: 'weeks',
        includePractice: false,
        includeProjects: false,
        includeRevision: false,
        goals: ''
    });

    const handleGenerate = () => {
        if (preferences.duration) {
            onGenerate(preferences);
        }
    };

    return (
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Customize Your Learning Plan ⚙️
            </h2>
            
            <div className="space-y-6">
                {/* Display Selected Info */}
                <div className="bg-white/5 rounded-lg p-4 space-y-2 border border-white/10">
                    <p className="flex items-center justify-between">
                        <span className="text-gray-400">Skill:</span> 
                        <span className="font-semibold">{userInfo.skill}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span className="text-gray-400">Level:</span> 
                        <span className="font-semibold">{userInfo.level}</span>
                    </p>
                </div>

                {/* Duration Type */}
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Plan Duration Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setPreferences({...preferences, durationType: 'weeks', duration: ''})}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                preferences.durationType === 'weeks'
                                    ? 'border-blue-500 bg-blue-500/20'
                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                            }`}
                        >
                            <div className="font-semibold">📅 Weeks</div>
                            <div className="text-xs text-gray-400 mt-1">Week-by-week plan</div>
                        </button>
                        <button
                            onClick={() => setPreferences({...preferences, durationType: 'days', duration: ''})}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                preferences.durationType === 'days'
                                    ? 'border-blue-500 bg-blue-500/20'
                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                            }`}
                        >
                            <div className="font-semibold">📆 Days</div>
                            <div className="text-xs text-gray-400 mt-1">Day-by-day plan</div>
                        </button>
                    </div>
                </div>

                {/* Duration Input */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        How many {preferences.durationType}?
                    </label>
                    {preferences.durationType === 'weeks' ? (
                        <div className="grid grid-cols-4 gap-3">
                            {[3, 4, 6, 8].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPreferences({...preferences, duration: num.toString()})}
                                    className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                                        preferences.duration === num.toString()
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/20 bg-white/5 hover:border-white/40'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-3">
                            {[20, 30, 40].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPreferences({...preferences, duration: num.toString()})}
                                    className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                                        preferences.duration === num.toString()
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/20 bg-white/5 hover:border-white/40'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Include Options */}
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Include in your plan:
                    </label>
                    <div className="space-y-2">
                        {[
                            { 
                                key: 'includePractice', 
                                label: '📝 Practice Questions', 
                                desc: 'Regular exercises to test understanding' 
                            },
                            { 
                                key: 'includeProjects', 
                                label: '🛠️ Mini Projects', 
                                desc: 'Hands-on projects to apply skills' 
                            },
                            { 
                                key: 'includeRevision', 
                                label: '🔄 Revision Weeks', 
                                desc: 'Dedicated time to review and reinforce' 
                            }
                        ].map((option) => (
                            <label 
                                key={option.key} 
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition border border-white/10"
                            >
                                <input
                                    type="checkbox"
                                    checked={preferences[option.key]}
                                    onChange={(e) => setPreferences({
                                        ...preferences, 
                                        [option.key]: e.target.checked
                                    })}
                                    className="mt-1 w-4 h-4 accent-blue-500"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-xs text-gray-400">{option.desc}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Goals */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Specific Goals (Optional)
                    </label>
                    <textarea
                        placeholder="e.g., Become job-ready, Prepare for interviews, Build real projects..."
                        value={preferences.goals}
                        onChange={(e) => setPreferences({...preferences, goals: e.target.value})}
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-white/40 resize-none transition"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="btn glass px-6 py-3 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={!preferences.duration || isLoading}
                        className="btn bg-blue-600 hover:bg-blue-700 flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate My Roadmap <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}