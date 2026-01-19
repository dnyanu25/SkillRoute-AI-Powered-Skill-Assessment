import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const links = [
        { name: 'Home', href: '/' },
        // { name: 'Agents', href: '#agents' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Docs', href: '#docs' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <motion.nav className={`sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-colors ${isScrolled ? 'bg-white/15 backdrop-blur-lg' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className='flex items-center gap-3'>
                <a href='/'>
                    <img src='/assets/slogo.png' alt='logo' className='h-8.5 w-auto' width={205} height={58} />
                    
                </a>
                <p className='text-2xl font-bold text-white-500 tracking-wide'>SkillRoute</p>
                </div>

                <div className='hidden items-center space-x-10 md:flex'>
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className='transition hover:text-gray-300'>
                            {link.name}
                        </a>
                    ))}
                    <a href='/' className='btn glass'>
                        Sign Up
                    </a>
                </div>

                <button onClick={() => setIsOpen(true)} className='transition active:scale-90 md:hidden'>
                    <MenuIcon className='size-6.5' />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/20 text-lg font-medium backdrop-blur-2xl transition duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {links.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </a>
                ))}


                <a href='/' className='btn glass' onClick={() => setIsOpen(false)}>
                    Sign Up
                </a>

                <button onClick={() => setIsOpen(false)} className='rounded-md p-2 glass'>
                    <XIcon />
                </button>
            </div >
        </>
    );
}
