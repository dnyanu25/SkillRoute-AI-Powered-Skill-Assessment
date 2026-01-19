// src/config/aiConfig.js

export const AI_CONFIG = {
    // Groq Configuration
    provider: 'groq', // Can change to 'openai', 'anthropic', etc.
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    
    // Model Settings
    model: 'llama-3.1-8b-instant', // Easy to change model
    temperature: 0.7,
    maxTokens: 2000,
    
    // Alternative models (uncomment to use)
    // model: 'llama-3.3-70b-versatile',
    // model: 'mixtral-8x7b-32768',
    
    // API Settings
    dangerouslyAllowBrowser: true, // Only for development
};

// Export model options for UI selection (future feature)
export const AVAILABLE_MODELS = [
    { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B (Fast)', speed: 'Fast' },
    { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B (Best)', speed: 'Slower' },
    { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B', speed: 'Medium' },
];