import SectionTitle from "../components/section-title";
import { BookOpenIcon, TrendingUpIcon, AwardIcon, UsersIcon, TargetIcon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * Features section component for SkillRoute
 * Displays key features of the learning platform
 */
export default function Features() {
    const refs = useRef([]);

    const featuresData = [
        {
            icon: BookOpenIcon,
            title: "Personalized Learning Paths",
            description: "Customized roadmaps tailored to your career goals and current skill level.",
        },
        {
            icon: TrendingUpIcon,
            title: "Skill Progress Tracking",
            description: "Monitor your growth with detailed analytics and milestone achievements.",
        },
        {
            icon: AwardIcon,
            title: "Industry Certifications",
            description: "Earn recognized certificates to showcase your expertise to employers.",
        },
        
        {
            icon: SparklesIcon,
            title: "AI-Powered Recommendations",
            description: "Smart suggestions for courses and resources based on your learning style.",
        }
    ];

    return (
        <section  id="agent" className="mt-32">
            <SectionTitle
                title="Why Choose SkillRoute"
                description="Transform your career with personalized learning paths, expert guidance, and industry-recognized certifications."
            />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        className="hover:-translate-y-0.5 p-6 rounded-xl space-y-4 glass max-w-80 w-full"
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
                        onAnimationComplete={() => {
                            const card = refs.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        <feature.icon className="size-8.5" />
                        <h3 className="text-base font-medium text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-100 line-clamp-2 pb-2">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}