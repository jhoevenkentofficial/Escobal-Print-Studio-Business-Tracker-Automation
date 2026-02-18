import React, { useState } from 'react';
import Header from '../components/Header';
import { Quote, Send, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Marketing Director",
        content: "Escobal Print Studio transformed our brand materials. The quality of the prints and the attention to detail in the design were outstanding. Highly recommended!",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Small Business Owner",
        content: "Fast, reliable, and professional. I needed urgent flyers for an event, and they delivered perfect quality ahead of schedule.",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Event Planner",
        content: "The invitations for my client's wedding were breathtaking. The paper quality and print finish were exactly what we envisioned.",
        rating: 5
    },
    {
        name: "David Kim",
        role: "Freelance Designer",
        content: "As a designer, I'm picky about print quality. Escobal Print Studio captures colors accurately and the finishes are always premium.",
        rating: 4
    },
    {
        name: "Jessica Lee",
        role: "Restaurant Manager",
        content: "Our new menus look fantastic! The durability and vibrant colors really make our dishes pop. Great service overall.",
        rating: 5
    },
    {
        name: "Robert Taylor",
        role: "Real Estate Agent",
        content: "Business cards and brochures are top-notch. It really helps me make a strong first impression with clients.",
        rating: 5
    }
];

const ClientsFeedback: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        rating: 5
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds for demo
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-inter">
            <Header onLogin={() => navigate('/#quote')} />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6 bg-pink-50">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Star className="w-3 h-3 fill-pink-500" /> Client Stories
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Loved by <span className="text-pink-500">Clients.</span> <br /> Trusted by Professionals.
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our customers have to say about their experience with Escobal Print Studio. We take pride in delivering excellence in every print.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-pink-100 transition-shadow flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-xs text-center text-pink-500 font-medium bg-pink-50 px-2 py-0.5 rounded-full inline-block mt-1">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Quote className="w-8 h-8 text-pink-200 mb-4 fill-pink-100" />
                                    <p className="text-gray-600 italic leading-relaxed">"{t.content}"</p>
                                </div>
                                <div className="mt-6 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feedback Form */}
            <section className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Share Your Experience</h2>
                        <p className="text-gray-500">Your feedback helps us improve and serve you better.</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-pink-100">
                        {submitted ? (
                            <div className="text-center py-12 animate-in fade-in zoom-in">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-white"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Rating</label>
                                        <div className="flex gap-2 py-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                                >
                                                    <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Your Review</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-white"
                                        placeholder="Tell us what you liked or how we can improve..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" /> Submit Feedback
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientsFeedback;
