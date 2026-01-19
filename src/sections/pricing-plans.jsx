import SectionTitle from "../components/section-title";
import { CheckIcon, GraduationCapIcon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * Pricing Plans component for SkillRoute
 * Displays Free and Premium plan options for students
 */
export default function PricingPlans() {
    const ref = useRef([]);
    
    const data = [
        {
            icon: GraduationCapIcon,
            title: 'Free',
            description: 'Perfect for students starting their journey',
            price: '$0',
            buttonText: 'Get Started',
            features: [
                'Personalized learning roadmap',
                'Basic skill assessment',
                'Progress tracking dashboard',
                'Access to learning resources',
                'Community forum access',
                'Weekly progress reports'
            ],
        },
        {
            icon: SparklesIcon,
            title: 'Premium',
            description: 'For serious learners who want more',
            price: '$9',
            mostPopular: true,
            buttonText: 'Upgrade to Premium',
            features: [
                'Everything in Free plan',
                'Daily task notifications 🔔',
                'Advanced skill assessments',
                'Unlimited project recommendations',
                'Priority support',
                'Career guidance & tips',
                'Exclusive learning content',
                'Personalized reminders'
            ],
        },
    ];

    return (
        <section  id="pricing" className="mt-32">
            <SectionTitle
                title="Choose Your Plan"
                description="Start free and upgrade anytime. Both plans are designed to help you succeed in your learning journey."
            />

            <div className='mt-12 flex flex-wrap items-center justify-center gap-6 px-4'>
                {data.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className='group w-full max-w-80 glass p-6 rounded-xl hover:-translate-y-0.5'
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
                        ref={(el) => (ref.current[index] = el)}
                        onAnimationComplete={() => {
                            const card = ref.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        {/* Plan badge */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center w-max text-xs gap-2 glass rounded-full px-3 py-1">
                                <item.icon className='size-3.5' />
                                <span>{item.title}</span>
                            </div>
                            {item.mostPopular && (
                                <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full font-medium">
                                    Popular
                                </span>
                            )}
                        </div>

                        {/* Price */}
                        <h3 className='mt-4 text-2xl font-semibold'>
                            {item.price} 
                            <span className='text-sm font-normal text-gray-300'>
                                {item.price === '$0' ? '/forever' : '/month'}
                            </span>
                        </h3>

                        {/* Description */}
                        <p className='text-gray-200 mt-3'>{item.description}</p>

                        {/* CTA Button */}
                        <button 
                            className={`mt-7 rounded-md w-full btn hover:scale-105 transition-transform ${
                                item.mostPopular 
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium' 
                                    : 'glass'
                            }`}
                        >
                            {item.buttonText}
                        </button>

                        {/* Features list */}
                        <div className='mt-6 flex flex-col'>
                            {item.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className='flex items-start gap-2 py-2'>
                                    <div className='rounded-full glass border-0 p-1 mt-0.5 shrink-0'>
                                        <CheckIcon className='size-3 text-white' strokeWidth={3} />
                                    </div>
                                    <p className="text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Additional note */}
            <motion.p 
                className="text-center text-gray-300 text-sm mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                💡 All plans include access to our community and basic learning resources. 
                Premium users get daily reminders to stay on track!
            </motion.p>
        </section>
    );
}