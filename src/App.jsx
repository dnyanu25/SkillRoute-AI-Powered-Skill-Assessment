import { Routes, Route } from 'react-router-dom';
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HeroSection from "./sections/hero-section";
import FaqSection from "./sections/faq-section";
import TrustedCompanies from "./sections/trusted-companies";
import Features from "./sections/features";
import WorkflowSteps from "./sections/workflow-steps";
import Testimonials from "./sections/testimonials";
import PricingPlans from "./sections/pricing-plans";
import CallToAction from "./sections/call-to-action";
import GetStarted from "./sections/GetStarted"

export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
                <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A] blur-[100px]" />
                <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF] blur-[100px]" />
                <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06] blur-[100px]" />
            </div>
            <Routes><Route path="/" element={
            <main className='px-4'>
                <HeroSection />
                {/* <TrustedCompanies /> */}
                <Features  />
                <WorkflowSteps  />
                <Testimonials />
                <FaqSection  />
                <PricingPlans  />
                <CallToAction />
            </main>}/>
             <Route path="/get-started" element={<GetStarted/>} />
            </Routes>
            <Footer />
        </>
    );
}