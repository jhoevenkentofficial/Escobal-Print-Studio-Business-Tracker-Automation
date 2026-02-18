import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
    onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            // If not on home page, just navigate to home with hash is handled by default Link behavior usually, 
            // but strict scroll needs handling if we want smooth scroll on landing only.
            // For now simple href works.
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className="font-bold text-lg text-pink-500">Escobal Print Studio</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link to="/#services" className="hover:text-pink-500 transition-colors">Services</Link>
                    <Link to="/about" className="hover:text-pink-500 transition-colors">About</Link>
                    <Link to="/feedback" className="hover:text-pink-500 transition-colors">Feedback</Link>
                    <Link to="/assistant" className="group flex items-center gap-2 hover:text-pink-500 transition-colors">
                        <Sparkles className="w-4 h-4 text-pink-400 group-hover:text-pink-500" />
                        AI Assistant
                    </Link>
                    {onLogin && (
                        <button
                            onClick={onLogin}
                            className="px-5 py-2.5 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-semibold shadow-lg shadow-pink-200"
                        >
                            Get a Quote
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-xl">
                    <Link to="/#services" className="font-medium text-gray-600 hover:text-pink-500" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                    <Link to="/about" className="font-medium text-gray-600 hover:text-pink-500" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link to="/feedback" className="font-medium text-gray-600 hover:text-pink-500" onClick={() => setMobileMenuOpen(false)}>Feedback</Link>
                    <Link to="/assistant" className="font-medium text-gray-600 hover:text-pink-500 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <Sparkles className="w-4 h-4 text-pink-400" /> AI Assistant
                    </Link>
                    {onLogin && (
                        <button
                            onClick={() => { onLogin(); setMobileMenuOpen(false); }}
                            className="px-5 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all font-semibold text-center mt-2"
                        >
                            Get a Quote
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
