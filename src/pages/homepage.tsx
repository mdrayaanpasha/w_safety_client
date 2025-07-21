import { useState, useEffect } from 'react';
import { Menu, X, Shield, Users, HeartPulse, MapPin, Phone, Mail } from 'lucide-react';




// --- Navigation Bar ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Report', href: '#' },
        { name: 'Volunteer', href: '/auth' }, // Assuming '/auth' is the login/register page
        { name: 'Admin', href: '/admin-verify' }, // Assuming '/admin-verify' is the admin page
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center gap-2">
                            <img className="h-10 w-auto" src="https://raw.githubusercontent.com/mdrayaanpasha/women_safety_project/e7b0bffb121b6f8afe5470b70666e222b2d9d676/CLIENT/app/src/assets/logo.png" alt="Project Pukaar Logo" />
                            <span className="text-white text-xl font-bold">Project Pukaar</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};



// A simple arrow icon for the "Learn More" button
const ArrowDownIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

// --- Hero Section ---
const HeroSection = () => {
    const scrollToNextSection = () => {
        // Scrolls to the element with id 'next-section'
        // Make sure you have a section with this ID below the hero
        document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        // Section: Full-screen, centered layout with a modern gradient background
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Gradient Shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            {/* Glassmorphic Card */}
            <div className="relative z-10 w-full max-w-4xl mx-auto p-8 text-center ">
                <img
                    src="https://raw.githubusercontent.com/mdrayaanpasha/women_safety_project/e7b0bffb121b6f8afe5470b70666e222b2d9d676/CLIENT/app/src/assets/logo.png"
                    alt="Safety App Logo"
                    className="w-20 h-20 mx-auto mb-4"
                />

                {/* SEO: Main headline */}
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    Your Safety, Reimagined.
                </h1>

                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                    Instantly report incidents and connect with trusted volunteers. Fast, secure, and always there for you.
                </p>

                {/* Call to Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/report" className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300">
                        Report an Incident
                    </a>
                    <a href="/auth" className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors duration-300">
                        Volunteer Login
                    </a>
                </div>
            </div>

            {/* Subtle "Learn More" scroll hint */}
            <button
                onClick={scrollToNextSection}
                className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 animate-bounce"
                aria-label="Scroll to next section"
            >
                <span className="text-sm font-medium">Learn More</span>
                <ArrowDownIcon />
            </button>
        </section>
    );
};




// --- Core Features Section ---
const CoreFeatures = () => {
    const features = [
        {
            icon: <Shield size={24} className="text-blue-400" />,
            title: 'Encrypted Reporting',
            description: 'Submit incident reports anonymously with end-to-end encryption protecting your data.',
        },
        {
            icon: <Users size={24} className="text-blue-400" />,
            title: 'Verified Volunteers',
            description: 'Our network includes verified legal, mental health, and emergency support professionals.',
        },
        {
            icon: <HeartPulse size={24} className="text-blue-400" />,
            title: 'Wellness Support',
            description: 'Connect with trained counselors for confidential mental and emotional health support.',
        },
        {
            icon: <MapPin size={24} className="text-blue-400" />,
            title: 'Geo-Targeted Help',
            description: 'Our system instantly dispatches the nearest available volunteer to your location.',
        },
    ];

    return (
        // Section: Added 'id' for scrolling, consistent background.
        <section id="next-section" className="py-20 lg:py-28 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="font-semibold text-blue-400">Our Features</p>

                    {/* SEO: Main headline for this section with a modern gradient text effect */}
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
                        A Safer Community Starts Here
                    </h2>

                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Core features designed for your security and peace of mind.
                    </p>
                </div>

                {/* Grid: A responsive grid for the feature cards */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        // Glassmorphic Card: Subtle background, backdrop blur, and border.
                        // Hover Effect: Gently scales up and brightens the border on hover.
                        <div
                            key={index}
                            className="p-8 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-105"
                        >
                            {/* Icon Container: Minimalist icon background */}
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-xl mb-6">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="mt-2 text-slate-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};




// --- How It Works Section ---
const HowItWorks = () => {
    const steps = [
        {
            title: 'Submit a Report',
            description: 'Use our secure form to report an incident. Provide as much detail as you are comfortable with.',
        },
        {
            title: 'Get Matched',
            description: 'Our system instantly and discreetly matches you with the nearest available and verified volunteer.',
        },
        {
            title: 'Receive Support',
            description: 'The volunteer will reach out to provide immediate assistance, guidance, and follow-up support.',
        },
    ];

    return (
        // Section: Consistent background with other sections.
        <section id="how-it-works" className="py-20 lg:py-28 bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="font-semibold text-blue-400">Three Simple Steps</p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
                        How to Get Help
                    </h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Our process is designed to be fast, confidential, and straightforward.
                    </p>
                </div>

                {/* Steps Container: Uses flexbox for alignment and a pseudo-element for the connecting line */}
                <div className="mt-20 relative">
                    {/* Dashed connecting line (visible on medium screens and up) */}
                    <div
                        className="hidden md:block absolute top-8 left-0 w-full h-px border-t-2 border-dashed border-white/10"
                        aria-hidden="true"
                    ></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className="relative text-center md:text-left">
                                {/* Numbered Circle: Glassmorphic circle that sits on the line */}
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="w-16 h-16 flex items-center justify-center bg-slate-900 border-2 border-blue-500 rounded-full text-2xl font-bold text-blue-400">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="mt-6 text-xl font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-slate-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};



// --- Get Involved Section ---
const GetInvolved = () => (
    // Section: 'relative' and 'overflow-hidden' contain the background shapes.
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28 bg-slate-900">
        {/* Background Gradient Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Glassmorphic Card: 'relative z-10' places it above the background shapes. */}
            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Make a Difference Today
                </h2>

                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                    Join our network of trusted volunteers or help us spread the word. Your support can change lives.
                </p>

                {/* Buttons styled to match the hero section for consistency */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/volunteer"
                        className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                        Become a Volunteer
                    </a>
                    <a
                        href="/contact-us"
                        className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    </section>
);


// --- Footer ---
const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <a href="#" className="flex items-center gap-2">
                        <img className="h-8 w-auto" src="https://raw.githubusercontent.com/mdrayaanpasha/women_safety_project/e7b0bffb121b6f8afe5470b70666e222b2d9d676/CLIENT/app/src/assets/logo.png" alt="Project Pukaar Logo" />
                        <span className="text-white text-lg font-bold">Project Pukaar</span>
                    </a>
                    <p className="mt-4 text-sm">Your safety, our collective mission.</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Quick Links</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="hover:text-white">Report Incident</a></li>
                        <li><a href="#" className="hover:text-white">Volunteer Portal</a></li>
                        <li><a href="#" className="hover:text-white">How It Works</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Contact</h3>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2"><Mail size={16} /><a href="mailto:support@projectpukaar.com" className="hover:text-white">support@projectpukaar.com</a></li>
                        <li className="flex items-center gap-2"><Phone size={16} /><a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Project Pukaar. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


// --- Main Homepage Component ---
const HomePage = () => {
    return (
        <div className="bg-slate-900 font-sans">
            <Navbar />
            <main>
                <HeroSection />
                <CoreFeatures />
                <HowItWorks />
                <GetInvolved />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
