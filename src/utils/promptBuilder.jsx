// src/utils/promptBuilder.js

/**
 * Builds a dynamic prompt for roadmap generation based on user preferences
 */
export const buildRoadmapPrompt = (userInfo) => {
    const { skill, level, duration, durationType, includePractice, includeProjects, includeRevision, goals } = userInfo;
    
    // Build additional requirements
    const requirements = [];
    if (includePractice) requirements.push('- Include practice questions for each topic');
    if (includeProjects) requirements.push('- Include mini projects to apply learned concepts');
    if (includeRevision) requirements.push('- Include revision periods to reinforce learning');
    
    const requirementsText = requirements.length > 0 
        ? `\n${requirements.join('\n')}` 
        : '';
    
    const goalsText = goals 
        ? `\nSpecific Goals: ${goals}` 
        : '';
    
    return `Create a comprehensive learning roadmap for ${skill} at ${level} level.

Duration: ${duration} ${durationType}${requirementsText}${goalsText}

Create a structured plan in JSON format with this exact structure:
{
  "skill": "${skill}",
  "level": "${level}",
  "planDuration": ${duration},
  "planType": "${durationType}",
  "weeks": [
    {
      "week": 1,
      "title": "Descriptive week title",
      "completed": false,
      "tasks": [
        {"id": 1, "task": "Specific, actionable task description", "completed": false},
        {"id": 2, "task": "Another task", "completed": false}
      ]
    }
  ]
}

Important:
- Make tasks practical, specific, and actionable
- Tailor difficulty to ${level} level
- Each week should have 3-5 tasks
- Tasks should build upon previous weeks
- Include hands-on learning activities
- Return ONLY valid JSON, no markdown formatting`;
};

/**
 * System prompt for the AI model
 */
export const SYSTEM_PROMPTS = {
    roadmapGenerator: `You are an expert learning path designer with years of experience in curriculum development and educational technology. 

Your role is to create detailed, practical, and personalized learning roadmaps that:
- Are tailored to the learner's current skill level
- Include progressive, achievable goals
- Focus on practical, real-world application
- Balance theory with hands-on practice
- Are motivating and engaging

Always respond with valid JSON only, no markdown formatting or extra text.`,

    quizGenerator: `You are an expert educational assessment designer. Create fair, accurate skill assessment quizzes that:
- Test practical knowledge, not just theory
- Are appropriate for the specified difficulty level
- Include clear, unambiguous questions
- Have one correct answer per question
- Cover key concepts comprehensively

Always respond with valid JSON only.`,
};

/**
 * Builds a prompt for quiz generation
 */
export const buildQuizPrompt = (skill, difficulty, questionCount) => {
    return `Create a skill assessment quiz for "${skill}" with the following specifications:

Difficulty Level: ${difficulty}/5 (where 1 is very basic and 5 is very challenging)
Number of Questions: ${questionCount}

Generate a quiz in this JSON format:
{
  "skill": "${skill}",
  "difficulty": ${difficulty},
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why this answer is correct"
    }
  ]
}

Requirements:
- Questions should test practical understanding
- All questions should be clear and unambiguous
- Each question must have exactly 4 options
- correctAnswer is the index (0-3) of the correct option
- Include brief explanations for learning
- Return ONLY valid JSON`;
};