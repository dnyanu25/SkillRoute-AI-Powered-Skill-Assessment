import { useState } from 'react';
import { Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';

// Component imports
import SkillDiscovery from './skillDiscovery';
import Quiz from './Quiz';
import PreferencesForm from './preferencesForm';

// Service imports
import { generateRoadmap } from '../services/aiService';

export default function GetStarted() {
    // Step management
    const [currentStep, setCurrentStep] = useState(1);
    
    // User data
    const [userInfo, setUserInfo] = useState({
        skill: '',
        level: '',
        duration: '',
        durationType: 'weeks',
        includePractice: false,
        includeProjects: false,
        includeRevision: false,
        goals: ''
    });
    
    // Roadmap & UI state
    const [roadmap, setRoadmap] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    // Handler: Move to next step
    const handleNextStep = (data) => {
        setUserInfo({ ...userInfo, ...data });
        
        if (currentStep === 1 && data.level === 'Not sure') {
            setCurrentStep(2); // Go to quiz
        } else if (currentStep === 1) {
            setCurrentStep(3); // Skip quiz, go to preferences
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handler: Generate roadmap
    const handleGenerateRoadmap = async (preferences) => {
        try {
            setIsLoading(true);
            const finalUserInfo = { ...userInfo, ...preferences };
            setUserInfo(finalUserInfo);
            
            const roadmapData = await generateRoadmap(finalUserInfo);
            setRoadmap(roadmapData);
            setCurrentStep(4); // Show roadmap
        } catch (error) {
            alert('Error generating roadmap. Please try again!');
        } finally {
            setIsLoading(false);
        }
    };

    // Handler: Toggle task completion
    const toggleTask = (weekIndex, taskId) => {
        if (!roadmap) return;
        const updatedRoadmap = { ...roadmap };
        const task = updatedRoadmap.weeks[weekIndex].tasks.find(t => t.id === taskId);
        if (task) task.completed = !task.completed;
        
        const allCompleted = updatedRoadmap.weeks[weekIndex].tasks.every(t => t.completed);
        updatedRoadmap.weeks[weekIndex].completed = allCompleted;
        
        setRoadmap(updatedRoadmap);
    };

    // Handler: Toggle day completion
    const toggleDayComplete = (dayIndex) => {
        if (!roadmap) return;
        const updatedRoadmap = { ...roadmap };
        updatedRoadmap.days[dayIndex].completed = !updatedRoadmap.days[dayIndex].completed;
        setRoadmap(updatedRoadmap);
    };

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const isDateInPlan = (date) => {
        if (!roadmap?.days) return null;
        return roadmap.days.find(d => 
            d.date.toDateString() === date.toDateString()
        );
    };

    const CalendarView = () => {
        const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
        const days = [];
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const planDay = isDateInPlan(date);
            
            days.push(
                <div
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded-lg relative ${
                        planDay ? 'cursor-pointer hover:bg-white/10' : ''
                    }`}
                    onClick={() => {
                        if (planDay) {
                            const dayIndex = roadmap.days.findIndex(d => d.date.toDateString() === date.toDateString());
                            toggleDayComplete(dayIndex);
                        }
                    }}
                >
                    <span className={`${planDay ? 'font-semibold text-white' : 'text-gray-300'}`}>
                        {day}
                    </span>
                    {planDay && (
                        <CheckCircle2 
                            className={`absolute top-0.5 right-0.5 w-4 h-4 ${
                                planDay.completed ? 'text-blue-500' : 'text-gray-600'
                            }`}
                        />
                    )}
                </div>
            );
        }
        
        return days;
    };

    const completedTasksCount = roadmap?.weeks.reduce((acc, week) => 
        acc + week.tasks.filter(t => t.completed).length, 0
    ) || 0;
    
    const totalTasksCount = roadmap?.weeks.reduce((acc, week) => 
        acc + week.tasks.length, 0
    ) || 0;

    // Roadmap Display Component
    const RoadmapDisplay = () => (
        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            {/* Main Roadmap */}
            <div className="glass rounded-2xl p-6 h-[600px] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{roadmap.skill}</h2>
                        <p className="text-sm text-gray-400">{roadmap.level} • {roadmap.planDuration} {roadmap.planType}</p>
                    </div>
                    <button
                        onClick={() => {
                            setCurrentStep(1);
                            setRoadmap(null);
                        }}
                        className="btn glass px-4 py-2 text-sm"
                    >
                        Create New
                    </button>
                </div>
                
                <div className="space-y-6">
                    {roadmap.weeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="bg-white/5 rounded-xl p-4 relative">
                            {week.completed && (
                                <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-green-500" />
                            )}
                            <h4 className="font-semibold text-lg mb-3">
                                Week {week.week}: {week.title}
                            </h4>
                            <div className="space-y-2">
                                {week.tasks.map((task) => (
                                    <div 
                                        key={task.id}
                                        onClick={() => toggleTask(weekIdx, task.id)}
                                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        )}
                                        <span className={task.completed ? 'line-through text-gray-500' : ''}>
                                            {task.task}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Sidebar */}
            <div className="glass rounded-2xl p-6 h-[600px] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Progress</h2>
                    </div>
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="btn glass px-4 py-1.5 text-sm"
                    >
                        {showCalendar ? 'Hide' : 'Calendar'}
                    </button>
                </div>

                {showCalendar ? (
                    <div className="space-y-4 bg-black/40 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-1 hover:bg-white/10 rounded"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h3 className="font-semibold">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-1 hover:bg-white/10 rounded"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-white font-medium mb-2">
                            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center text-white">
                            <CalendarView />
                        </div>

                        <div className="mt-6 p-4 bg-white/5 rounded-lg space-y-2">
                            <p className="text-sm font-semibold">Progress: {completedTasksCount} / {totalTasksCount} tasks</p>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${(completedTasksCount / totalTasksCount) * 100}%` }} 
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                            <p className="text-sm font-semibold mb-2">Overall Progress</p>
                            <div className="text-3xl font-bold text-blue-400">
                                {Math.round((completedTasksCount / totalTasksCount) * 100)}%
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${(completedTasksCount / totalTasksCount) * 100}%` }} 
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 space-y-2">
                            <p className="text-sm font-semibold">Next Steps</p>
                            <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                                <li>Complete daily tasks</li>
                                <li>Track your progress</li>
                                <li>Review completed weeks</li>
                                <li>Stay consistent!</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Main Render
    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Step 1: Skill Discovery */}
                {currentStep === 1 && (
                    <SkillDiscovery 
                        onNext={handleNextStep}
                        initialData={userInfo}
                    />
                )}

                {/* Step 2: Quiz */}
                {currentStep === 2 && (
                    <Quiz 
                        skill={userInfo.skill}
                        onComplete={handleNextStep}
                        onBack={() => setCurrentStep(1)}
                    />
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                    <PreferencesForm 
                        userInfo={userInfo}
                        onBack={() => setCurrentStep(1)}
                        onGenerate={handleGenerateRoadmap}
                        isLoading={isLoading}
                    />
                )}

                {/* Step 4: Roadmap Display */}
                {currentStep === 4 && roadmap && <RoadmapDisplay />}
            </div>
        </div>
    );
}