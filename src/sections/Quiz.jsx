import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { generateQuiz, evaluateQuiz } from '../services/aiService';

export default function Quiz({ skill, onComplete, onBack }) {
    const [quizState, setQuizState] = useState('setup'); // 'setup', 'loading', 'quiz', 'results'
    const [difficulty, setDifficulty] = useState(3);
    const [questionCount, setQuestionCount] = useState(10);
    const [quizData, setQuizData] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState(null);

    const handleStartQuiz = async () => {
        try {
            setQuizState('loading');
            const quiz = await generateQuiz(skill, difficulty, questionCount);
            setQuizData(quiz);
            setQuizState('quiz');
        } catch (error) {
            alert('Error generating quiz. Please try again!');
            setQuizState('setup');
        }
    };

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: answerIndex
        });
    };

    const handleSubmitQuiz = () => {
        const evaluation = evaluateQuiz(quizData, userAnswers);
        setResults(evaluation);
        setQuizState('results');
    };

    const handleCompleteQuiz = () => {
        onComplete({ level: results.level });
    };

    // Setup Screen
    if (quizState === 'setup') {
        return (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Skill Assessment Quiz 📝
                </h2>
                
                <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-center">
                            <span className="text-gray-400">Assessing skill:</span>{' '}
                            <span className="font-semibold">{skill}</span>
                        </p>
                    </div>

                    {/* Difficulty Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-3">
                            Select Difficulty Level (1 = Easy, 5 = Hard)
                        </label>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">1</span>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={difficulty}
                                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                                className="flex-1 accent-blue-500"
                            />
                            <span className="text-sm text-gray-400">5</span>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-2xl font-bold text-blue-400">{difficulty}</span>
                            <span className="text-sm text-gray-400 ml-2">
                                {difficulty <= 2 ? '(Very Basic)' : difficulty <= 3 ? '(Moderate)' : difficulty <= 4 ? '(Challenging)' : '(Very Hard)'}
                            </span>
                        </div>
                    </div>

                    {/* Question Count */}
                    <div>
                        <label className="block text-sm font-medium mb-3">
                            Number of Questions
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[10, 15, 20].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setQuestionCount(num)}
                                    className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                                        questionCount === num
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/20 bg-white/5 hover:border-white/40'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
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
                            onClick={handleStartQuiz}
                            className="btn bg-blue-600 hover:bg-blue-700 flex-1 py-3 flex items-center justify-center gap-2"
                        >
                            Start Quiz <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading Screen
    if (quizState === 'loading') {
        return (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-medium">Generating your quiz...</p>
                    <p className="text-sm text-gray-400">This may take a moment</p>
                </div>
            </div>
        );
    }

    // Quiz Screen
    if (quizState === 'quiz' && quizData) {
        const question = quizData.questions[currentQuestion];
        const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

        return (
            <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">
                            Question {currentQuestion + 1} of {quizData.questions.length}
                        </span>
                        <span className="text-sm text-gray-400">
                            Difficulty: {quizData.difficulty}/5
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-blue-500 h-2 rounded-full transition-all" 
                            style={{ width: `${progress}%` }} 
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
                    
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(currentQuestion, index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    userAnswers[currentQuestion] === index
                                        ? 'border-blue-500 bg-blue-500/20'
                                        : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        userAnswers[currentQuestion] === index
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-white/40'
                                    }`}>
                                        {userAnswers[currentQuestion] === index && (
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                    </div>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                    {currentQuestion > 0 && (
                        <button
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            className="btn glass px-6 py-3"
                        >
                            Previous
                        </button>
                    )}
                    
                    {currentQuestion < quizData.questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            disabled={userAnswers[currentQuestion] === undefined}
                            className="btn bg-blue-600 hover:bg-blue-700 flex-1 py-3 disabled:opacity-50"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(userAnswers).length < quizData.questions.length}
                            className="btn bg-green-600 hover:bg-green-700 flex-1 py-3 disabled:opacity-50"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Results Screen
    if (quizState === 'results' && results) {
        return (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Quiz Results 🎯
                </h2>
                
                <div className="space-y-6">
                    {/* Score */}
                    <div className="bg-white/5 rounded-lg p-6 text-center border border-white/10">
                        <p className="text-sm text-gray-400 mb-2">Your Score</p>
                        <p className="text-5xl font-bold text-blue-400 mb-2">
                            {results.percentage}%
                        </p>
                        <p className="text-gray-300">
                            {results.correctCount} out of {results.totalQuestions} correct
                        </p>
                    </div>

                    {/* Level Assessment */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <p className="text-xl font-semibold">
                                Your Level: {results.level}
                            </p>
                        </div>
                        <p className="text-gray-300">{results.reasoning}</p>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleCompleteQuiz}
                        className="btn bg-blue-600 hover:bg-blue-700 w-full py-3 flex items-center justify-center gap-2"
                    >
                        Continue to Preferences <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return null;
}