// src/data/pricing.js

export const pricingPlans = [
    {
        id: 1,
        name: "Free",
        price: 0,
        period: "forever",
        description: "Perfect for trying out SkillRoute",
        features: [
            "1 active roadmap",
            "Basic AI assessment",
            "Progress tracking",
            "Community support",
            "Export to PDF"
        ],
        limitations: [
            "No revision weeks",
            "No custom goals",
            "Limited quiz questions"
        ],
        buttonText: "Get Started Free",
        buttonVariant: "glass",
        popular: false
    },
    {
        id: 2,
        name: "Pro",
        price: 9.99,
        period: "per month",
        description: "For serious learners",
        features: [
            "Unlimited roadmaps",
            "Advanced AI assessment",
            "Priority AI access",
            "Custom learning goals",
            "Practice questions included",
            "Mini projects library",
            "Revision weeks",
            "Progress analytics",
            "Priority support",
            "No ads"
        ],
        limitations: [],
        buttonText: "Start Pro Trial",
        buttonVariant: "primary",
        popular: true,
        badge: "Most Popular"
    },
    {
        id: 3,
        name: "Enterprise",
        price: 49.99,
        period: "per month",
        description: "For teams and organizations",
        features: [
            "Everything in Pro",
            "Team collaboration (up to 50 members)",
            "Custom branding",
            "API access",
            "Dedicated account manager",
            "SSO integration",
            "Advanced analytics dashboard",
            "Custom integrations",
            "Onboarding assistance",
            "SLA guarantee"
        ],
        limitations: [],
        buttonText: "Contact Sales",
        buttonVariant: "glass",
        popular: false
    }
];

export const pricingMetadata = {
    title: "Choose Your Learning Path",
    description: "Start free and upgrade as you grow. All plans include our core AI-powered roadmap generation."
};

export default pricingPlans;