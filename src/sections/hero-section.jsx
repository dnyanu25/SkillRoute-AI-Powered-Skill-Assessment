import { PlayCircleIcon, CompassIcon } from "lucide-react";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom';
/**
 * Hero Section component for SkillRoute
 * Main landing section with CTA and animated background
 */
export default function HeroSection() {

    return (
        <>
            {/* Animated gradient background blobs */}
            <motion.div 
                className="fixed inset-0 overflow-hidden -z-20 pointer-events-none"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#9D4EDD] blur-[100px]" />
                <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#5A67D] blur-[100px]" />
                <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#3B82F6] blur-[100px]" />
            </motion.div>

            <motion.section className="flex flex-col items-center px-4">
                {/* Top badge */}
                <motion.div 
                    className="flex items-center gap-3 mt-32"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className="text-sm">🎓 Your Personalized Career Path Starts Here</p>
                    <Link to="/get-started" className="btn glass py-1 px-3 text-xs hover:scale-105 transition-transform">
                        Get Started Free
                    </Link>
                </motion.div>

                {/* Main heading */}
                <motion.h1 
                    className="text-center text-4xl/13 md:text-6xl/19 mt-4 font-semibold tracking-tight max-w-4xl"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    Discover Your Perfect Career Path with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        AI-Powered Guidance
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                    className="text-center text-gray-100 text-base/7 max-w-2xl mt-6"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    SkillRoute helps students find their ideal career path through personalized learning roadmaps, 
                    skill assessments, and progress tracking. Build your future with confidence.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    className="flex flex-col md:flex-row max-md:w-full items-center gap-4 md:gap-3 mt-8"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <button className="btn max-md:w-full glass py-3 px-6 flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                        <CompassIcon className="size-4.5" />
                        Find Your Path
                    </button>
                    <button className="btn max-md:w-full glass flex items-center justify-center gap-2 py-3 px-6 hover:scale-105 transition-transform">
                        <PlayCircleIcon className="size-4.5" />
                        Watch Demo
                    </button>
                </motion.div>

                {/* Optional: Trust indicators */}
                <motion.div 
                    className="flex items-center gap-6 mt-12 text-sm text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110  ">
                        <span className="text-2xl">🎯</span>
                        <span>Personalized Paths</span>
                    </div>
                    <div className="flex items-center gap-2  cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 ">
                        <span className="text-2xl">📊</span>
                        <span>Progress Tracking</span>
                    </div>
                    <div className="flex items-center gap-2  cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 ">
                        <span className="text-2xl">🚀</span>
                        <span>Career Growth</span>
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
}