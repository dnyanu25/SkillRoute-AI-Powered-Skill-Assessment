# SkillRoute 🚀

An AI-powered learning platform that creates personalized roadmaps to help you master any skill. Built with React, powered by Groq AI.

<!-- ![SkillRoute Banner](./public/assets/banner.png)-->

## ✨ Features

- 🤖 **AI-Powered Roadmaps** - Generate personalized learning paths in seconds
- 📊 **Smart Assessment** - Take skill-level quizzes to find your starting point
- 📅 **Visual Progress Tracking** - Calendar view with task completion tracking
- 🎯 **Goal-Oriented** - Customize roadmaps for job-readiness, interviews, or projects
- 🛠️ **Hands-On Learning** - Includes practice questions and mini projects
- 🔄 **Adaptive Plans** - Choose weekly or daily plans with revision periods
- ⚡ **Lightning Fast** - Roadmaps generated in 5-10 seconds
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation

### AI & Backend
- **Groq API** - AI roadmap generation (Llama 3.1)
- **Spring Boot** - Backend API *(coming soon)*
- **PostgreSQL** - Database *(coming soon)*

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Groq API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skillroute.git
   cd skillroute
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

   Get your free Groq API key from: https://console.groq.com/

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
skillroute/
├── public/
│   └── assets/           # Images and static files
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── footer.jsx
│   │   ├── lenis-scroll.jsx
│   │   └── section-title.jsx
│   ├── sections/         # Page sections
│   │   ├── navbar.jsx
│   │   ├── hero-section.jsx
│   │   ├── features.jsx
│   │   ├── workflow-steps.jsx
│   │   ├── testimonials.jsx
│   │   ├── faq-section.jsx
│   │   ├── pricing-plans.jsx
│   │   ├── call-to-action.jsx
│   │   ├── GetStarted.jsx
│   │   ├── SkillDiscovery.jsx
│   │   ├── Quiz.jsx
│   │   └── PreferencesForm.jsx
│   ├── services/         # API services
│   │   └── aiService.js
│   ├── utils/            # Utility functions
│   │   └── promptBuilder.js
│   ├── config/           # Configuration files
│   │   └── aiConfig.js
│   ├── data/             # Static data
│   │   ├── faq.js
│   │   ├── workflows.js
│   │   ├── testimonials.js
│   │   ├── pricing.js
│   │   └── features.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (not in git)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 How It Works

### 1. **Skill Discovery**
Enter the skill you want to learn and select your current level (Beginner, Intermediate, Advanced, or "Not sure").

### 2. **Assessment (Optional)**
If you're unsure of your level, take an AI-generated quiz that evaluates your knowledge and determines your starting point.

### 3. **Customize Your Plan**
Choose:
- Duration (weeks or days)
- Include practice questions
- Include mini projects
- Include revision periods
- Set specific goals

### 4. **Get Your Roadmap**
AI generates a personalized roadmap with:
- Weekly/daily breakdowns
- Specific tasks
- Progress tracking
- Calendar view

### 5. **Track Progress**
- Mark tasks as complete
- View progress percentage
- See completion calendar
- Stay motivated!

## 🔑 Key Features Explained

### AI Roadmap Generation
Uses Groq's Llama 3.1 model to create tailored learning paths based on:
- Your current skill level
- Chosen duration
- Learning preferences
- Specific goals

### Smart Assessment
Generates custom quizzes with:
- Adjustable difficulty (1-5)
- Variable question count (10, 15, 20)
- Automatic level evaluation
- Detailed explanations

### Progress Tracking
- Visual calendar showing task dates
- Click-to-complete task system
- Progress bars and percentages
- Week completion tracking

## 🔧 Configuration

### Change AI Model

Edit `src/config/aiConfig.js`:

```javascript
export const AI_CONFIG = {
    model: 'llama-3.1-8b-instant', // Change this
    temperature: 0.7,
    maxTokens: 2000,
};
```

Available models:
- `llama-3.1-8b-instant` (Fast)
- `llama-3.3-70b-versatile` (Best quality)
- `mixtral-8x7b-32768` (Balanced)

### Customize Prompts

Edit `src/utils/promptBuilder.js` to modify how the AI generates roadmaps and quizzes.

## 🚧 Upcoming Features

- [ ] User authentication
- [ ] Save roadmaps to database
- [ ] Spring Boot backend API
- [ ] PostgreSQL integration
- [ ] Share roadmaps with others
- [ ] Export roadmaps as PDF
- [ ] Team collaboration
- [ ] Progress analytics dashboard




## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing fast AI inference
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev) for beautiful icons


