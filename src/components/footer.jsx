import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const links = [
        { name: 'Terms of Service', href: '#terms-of-service' },
        { name: 'Privacy Policy', href: '#privacy-policy' },
        { name: 'Security', href: '#security' },
        { name: 'Sitemap', href: '#sitemap' },
    ];
    return (
        <motion.footer className="flex flex-col items-center px-4 md:px-16 lg:px-24 justify-center w-full pt-16 mt-40 glass border-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <a href="/">
                <img src='/assets/favcon1.svg' alt='logo' className='h-8.5 w-auto' width={205} height={48} />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-8 py-8">
                {links.map((link, index) => (
                    <a key={index} href={link.href} className='transition hover:text-gray-300'>
                        {link.name}
                    </a>
                ))}
            </div>
            <div className="flex items-center gap-6 pb-6">
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <DribbbleIcon />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <LinkedinIcon />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <TwitterIcon />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <GithubIcon />
                </a>
            </div>
            <hr className="w-full border-white/20 mt-6" />
            <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 py-4">
                <p>Improve Skills for free</p>
            </div>
        </motion.footer>
    );
};