// src/services/aiService.js

import Groq from 'groq-sdk';
import { AI_CONFIG } from '../config/aiConfig';
import { buildRoadmapPrompt, buildQuizPrompt, SYSTEM_PROMPTS } from '../utils/promptBuilder';

// Initialize AI client
const groq = new Groq({
    apiKey: AI_CONFIG.apiKey,
    dangerouslyAllowBrowser: AI_CONFIG.dangerouslyAllowBrowser
});

/**
 * Generic function to call AI API
 */
const callAI = async (systemPrompt, userPrompt) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: AI_CONFIG.model,
            temperature: AI_CONFIG.temperature,
            max_tokens: AI_CONFIG.maxTokens,
        });

        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('AI API Error:', error);
        throw new Error('Failed to get response from AI. Please try again.');
    }
};

/**
 * Extract JSON from AI response
 */
const extractJSON = (response) => {
    // Try to find JSON in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
    }
    
    try {
        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        throw new Error('Failed to parse AI response as JSON');
    }
};

/**
 * Generate a learning roadmap based on user preferences
 */
export const generateRoadmap = async (userInfo) => {
    try {
        const userPrompt = buildRoadmapPrompt(userInfo);
        const response = await callAI(SYSTEM_PROMPTS.roadmapGenerator, userPrompt);
        const roadmapData = extractJSON(response);
        
        // Generate days array from weeks
        const days = [];
        let dayCounter = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        roadmapData.weeks.forEach((week, weekIdx) => {
            week.tasks.forEach(() => {
                const taskDate = new Date(today);
                taskDate.setDate(today.getDate() + dayCounter);
                
                days.push({
                    day: dayCounter + 1,
                    date: taskDate,
                    completed: false,
                    weekIndex: weekIdx
                });
                dayCounter++;
            });
        });
        
        roadmapData.days = days;
        roadmapData.planDuration = days.length;
        roadmapData.startDate = today;
        
        return roadmapData;
    } catch (error) {
        console.error('Error generating roadmap:', error);
        throw error;
    }
};

/**
 * Generate a skill assessment quiz
 */
export const generateQuiz = async (skill, difficulty, questionCount) => {
    try {
        const userPrompt = buildQuizPrompt(skill, difficulty, questionCount);
        const response = await callAI(SYSTEM_PROMPTS.quizGenerator, userPrompt);
        const quizData = extractJSON(response);
        
        return quizData;
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw error;
    }
};

/**
 * Evaluate quiz answers and determine skill level
 */
export const evaluateQuiz = (quizData, userAnswers) => {
    let correctCount = 0;
    const totalQuestions = quizData.questions.length;
    
    quizData.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    const percentage = (correctCount / totalQuestions) * 100;
    
    // Determine skill level based on score
    let level;
    let reasoning;
    
    if (percentage >= 80) {
        level = 'Advanced';
        reasoning = `You scored ${percentage.toFixed(0)}% which demonstrates strong mastery of the concepts. You're ready for advanced topics!`;
    } else if (percentage >= 50) {
        level = 'Intermediate';
        reasoning = `You scored ${percentage.toFixed(0)}% which shows solid foundational knowledge. You're ready to build upon the basics!`;
    } else {
        level = 'Beginner';
        reasoning = `You scored ${percentage.toFixed(0)}% which indicates you're starting fresh. That's perfectly fine - everyone starts somewhere!`;
    }
    
    return {
        correctCount,
        totalQuestions,
        percentage: percentage.toFixed(1),
        level,
        reasoning
    };
};