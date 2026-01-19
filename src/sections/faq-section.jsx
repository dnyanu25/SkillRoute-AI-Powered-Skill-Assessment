import SectionTitle from '../components/section-title';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from "framer-motion";
// import { faqData } from '';

/**
 * FAQ Section component for SkillRoute
 * Displays frequently asked questions for students
 */
export default function FaqSection() {
    const [isOpen, setIsOpen] = useState(false);
   // /*
    const data = [
        {
            question: 'What is SkillRoute and how does it help students?',
            answer: "SkillRoute is a personalized learning platform that helps students discover the right career path based on their interests and skills. It provides customized learning roadmaps, progress tracking, and resources to help you achieve your goals.",
        },
        {
            question: 'Do I need any prior experience to start learning on SkillRoute?',
            answer: 'No prior experience is needed! SkillRoute is designed for students at all levels. Whether you\'re a beginner or looking to advance your skills, our platform adapts to your current knowledge and creates a personalized path for you.',
        },
        {
            question: 'How does the personalized learning path work?',
            answer: 'After completing an initial assessment of your interests, skills, and goals, SkillRoute uses AI to generate a customized learning roadmap. This path includes recommended courses, projects, and milestones tailored specifically to your career objectives.',
        },
        {
            question: 'Can I track my progress and achievements?',
            answer: 'Yes! SkillRoute provides detailed analytics and progress tracking. You can monitor your learning journey, view completed milestones, track skill improvements, and see your overall growth through interactive dashboards.',
        },
        {
            question: 'Is SkillRoute free for students?',
            answer: 'Yes, SkillRoute is completely free for students! As a final year project focused on helping students succeed, we provide full access to all features including personalized roadmaps, progress tracking, and learning resources at no cost.',
        },
        {
            question: 'What types of skills and career paths does SkillRoute cover?',
            answer: 'SkillRoute covers a wide range of tech skills including Web Development, Data Science, Machine Learning, Mobile Development, Cloud Computing, and more. We continuously update our content to match current industry demands and emerging technologies.',
        },
        {
            question: 'Can I use SkillRoute on mobile devices?',
            answer: 'Absolutely! SkillRoute is fully responsive and works seamlessly on mobile phones, tablets, and desktop computers. Learn anytime, anywhere at your own pace.',
        },
        {
            question: 'How is SkillRoute different from other learning platforms?',
            answer: 'Unlike generic learning platforms, SkillRoute focuses on personalized career guidance for students. We don\'t just provide courses – we help you discover what to learn based on your unique profile, and create a structured path to reach your career goals efficiently.',
        },
    ];
    //*/

    /*

// In component:
// {faqData.map((faq) => (
//   <div key={faq.id}>
//     <h3>{faq.question}</h3>
//     <p>{faq.answer}</p>
//   </div>
// ))}*/

    return (
        <section id="faq" className='mt-32'>
            <SectionTitle 
                title="Frequently Asked Questions" 
                description="Have questions about SkillRoute? Find answers to common questions about our platform, features, and how we help students achieve their career goals." 
            />
            <div className='mx-auto mt-12 space-y-4 w-full max-w-xl px-4'>
                {data.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className='flex flex-col glass rounded-md'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: index * 0.15, 
                            type: "spring", 
                            stiffness: 320, 
                            damping: 70, 
                            mass: 1 
                        }}
                    >
                        <h3 
                            className='flex cursor-pointer hover:bg-white/10 transition items-start justify-between gap-4 p-4 font-medium' 
                            onClick={() => setIsOpen(isOpen === index ? null : index)}
                        >
                            {item.question}
                            <ChevronDownIcon 
                                className={`size-5 transition-all shrink-0 duration-400 ${isOpen === index ? 'rotate-180' : ''}`} 
                            />
                        </h3>
                        <p 
                            className={`px-4 text-sm/6 transition-all duration-400 overflow-hidden ${isOpen === index ? 'pt-2 pb-4 max-h-80' : 'max-h-0'}`}
                        >
                            {item.answer}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}