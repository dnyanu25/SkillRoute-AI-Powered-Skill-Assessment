import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function SkillDiscovery({ onNext, initialData = {} }) {
    const [skill, setSkill] = useState(initialData.skill || '');
    const [level, setLevel] = useState(initialData.level || '');

    const levels = [
        {
            value: 'Beginner',
            title: 'Beginner',
            description: 'Just starting out',
            emoji: '🌱'
        },
        {
            value: 'Intermediate',
            title: 'Intermediate',
            description: 'Some experience',
            emoji: '🚀'
        },
        {
            value: 'Advanced',
            title: 'Advanced',
            description: 'Experienced',
            emoji: '⚡'
        },
        {
            value: 'Not sure',
            title: 'Not sure',
            description: 'Take a quiz to find out',
            emoji: '❓'
        }
    ];

    const handleContinue = () => {
        if (skill && level) {
            onNext({ skill, level });
        }
    };

    return (
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Let's Start Your Learning Journey! 🚀
            </h2>
            
            <div className="space-y-6">
                {/* Skill Input */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        What skill do you want to learn?
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., React, Python, Data Structures, Java..."
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-white/40 transition"
                    />
                </div>

                {/* Level Selection */}
                <div>
                    <label className="block text-sm font-medium mb-3">
                        What's your current level?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {levels.map((levelOption) => (
                            <button
                                key={levelOption.value}
                                onClick={() => setLevel(levelOption.value)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    level === levelOption.value
                                        ? 'border-blue-500 bg-blue-500/20 scale-105'
                                        : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl">{levelOption.emoji}</span>
                                    <span className="font-semibold">{levelOption.title}</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {levelOption.description}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={!skill || !level}
                    className="btn bg-blue-600 hover:bg-blue-700 w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Continue <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}