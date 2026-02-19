
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  Printer,
  UserSquare2,
  Palette,
  FileText,
  StickyNote,
  CreditCard,
  Globe,
  Monitor,
  Mail,
  Newspaper,
  Building2,
  Star,
  ChevronRight,
  Github,
  Twitter,
  Instagram,
  Upload,
  X,
  Lock,
  CheckCircle
} from 'lucide-react';
import { ServiceCard } from '../types';
import { db } from '../services/db';
import { Quotation, Concern } from '../types/schema';

interface LandingPageProps {
  onLogin: () => void;
}

const services = [
  {
    title: 'Print/PhotoCopy',
    description: 'High-quality document reproduction and sharp, clear printing for any volume. Fast, reliable, and affordable for all your needs.',
    icon: <Printer className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    details: 'We use state-of-the-art printers to ensure every copy is crisp and vibrant, whether it’s a single page or a bulk order.'
  },
  {
    title: 'Rush ID',
    description: 'Instant professional ID photos for school, work, or government requirements. Get your ID in minutes!',
    icon: <UserSquare2 className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    details: 'Our team ensures you look your best with proper lighting and backgrounds for all ID requirements.'
  },
  {
    title: 'Tarp Design',
    description: 'Large format advertisement design that stands out and gets noticed. Perfect for events and promotions.',
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    details: 'Custom tarpaulin designs tailored to your event or business, printed on durable, weather-resistant material.'
  },
  {
    title: 'Logo Design',
    description: 'Unique brand identity creation that tells your story in a single mark. Stand out from the crowd.',
    icon: <Star className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    details: 'Work with our creative team to develop a logo that captures your brand’s essence and vision.'
  },
  {
    title: 'Resume & Letters',
    description: 'Professional formatting for Resumes, Applications, and Resignation letters. Make a great first impression.',
    icon: <FileText className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80',
    details: 'We help you craft documents that are clear, concise, and visually appealing to employers.'
  },
  {
    title: 'Stickers',
    description: 'Custom die-cut stickers for branding, packaging, or personal creative projects. Vibrant and durable.',
    icon: <StickyNote className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    details: 'Choose from a variety of shapes and finishes to make your stickers pop.'
  },
  {
    title: 'Business Cards',
    description: 'Premium networking cards with high-quality finishes and modern designs. Leave a lasting impression.',
    icon: <CreditCard className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    details: 'Select from matte, glossy, or textured finishes to match your brand style.'
  },
  {
    title: 'Website Design',
    description: 'Modern responsive websites that look great on any device. Grow your online presence.',
    icon: <Globe className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    details: 'From landing pages to e-commerce, we build sites that are fast, secure, and beautiful.'
  },
  {
    title: 'Digital Display',
    description: 'Dynamic digital signage and motion graphics for modern advertisements. Catch every eye.',
    icon: <Monitor className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    details: 'Engage your audience with animated graphics and digital displays for any venue.'
  },
  {
    title: 'Invitations',
    description: 'Elegant cards for weddings, birthdays, and special corporate events. Make every event memorable.',
    icon: <Mail className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    details: 'Custom invitations with premium paper and beautiful designs for every occasion.'
  },
  {
    title: 'Newspapers',
    description: 'Layout and printing for local news and community publications. Share your story with the world.',
    icon: <Newspaper className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    details: 'Professional layout and print for newsletters, bulletins, and newspapers.'
  },
  {
    title: 'Gov Assist',
    description: 'PSA, Police Clearance, TIN, Pag-ibig, and SSS appointment assistance. Hassle-free government paperwork.',
    icon: <Building2 className="w-6 h-6 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    details: 'We guide you through the process and help you prepare all necessary documents.',
    samples: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
    ]
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [activeService, setActiveService] = React.useState(services[0]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [adminUsername, setAdminUsername] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [showQuoteSuccess, setShowQuoteSuccess] = React.useState(false);
  const [showConcernSuccess, setShowConcernSuccess] = React.useState(false);

  useEffect(() => {
    if (location.hash === '#quote') {
      const element = document.getElementById('quote');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quote Form State
  const [quoteForm, setQuoteForm] = React.useState({
    name: '',
    email: '',
    service: services[0].title,
    deadline: '',
    details: ''
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: Quotation = {
      id: Date.now().toString(),
      customerName: quoteForm.name,
      customerEmail: quoteForm.email,
      items: [{ itemName: quoteForm.service, quantity: 1, price: 0 }],
      totalAmount: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    console.log('[Landing] Submitting Quote:', newQuote);
    db.addQuotation(newQuote);
    setShowQuoteSuccess(true);
    setQuoteForm({ name: '', email: '', service: services[0].title, deadline: '', details: '' });
    setTimeout(() => setShowQuoteSuccess(false), 5000);
  };

  // Concern Form State
  const [concernForm, setConcernForm] = React.useState({
    name: '',
    email: '',
    type: 'Order Issue',
    message: ''
  });

  const handleConcernSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConcern: Concern = {
      id: Date.now().toString(),
      customerName: concernForm.name,
      email: concernForm.email,
      subject: concernForm.type,
      message: concernForm.message,
      status: 'OPEN',
      createdAt: new Date().toISOString()
    };
    console.log('[Landing] Submitting Concern:', newConcern);
    db.addConcern(newConcern);
    setShowConcernSuccess(true);
    setConcernForm({ name: '', email: '', type: 'Order Issue', message: '' });
    setTimeout(() => setShowConcernSuccess(false), 5000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'Admin@gmail.com' && adminPassword === 'Admin123') {
      localStorage.setItem('adminUser', adminUsername);
      setIsLoginModalOpen(false);
      navigate('/admin');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className="bg-[#fcfcfc]">
      <Header onLogin={scrollToQuote} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
              High-Energy Creative Studio
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Your <span className="text-pink-500">Vision</span>, <br /> Our Print.
            </h1>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Experience modern, professional printing and design services tailored to your needs. From documents to digital displays, we bring your ideas to life with vibrant precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-pink-200 transition-all">
                Start Your Project
              </button>
              <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-all">
                View Portfolio
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/printing/800/600"
                alt="Hero Graphics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                <Printer className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Premium Quality</p>
                <p className="text-sm font-bold text-gray-900">Professional Grade Printing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Master-Detail) */}
      <section className="py-20 px-6 bg-white" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Everything We Do.</h2>
            <p className="text-gray-500 max-w-2xl">
              From personal documents to large-scale brand identity, we provide a full spectrum of creative and technical services.
              Select a service to see details.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column: Service List */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {services.map((service) => (
                <button
                  key={service.title}
                  onClick={() => setActiveService(service)}
                  className={`text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 group border ${activeService.title === service.title
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-200 border-pink-500 scale-[1.02]'
                    : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-pink-500 border-gray-100'
                    }`}
                >
                  <div className={`hidden md:block w-1.5 h-1.5 rounded-full ${activeService.title === service.title ? 'bg-white' : 'bg-gray-300 group-hover:bg-pink-400'}`} />
                  <span className={`font-bold text-lg flex-1 ${activeService.title === service.title ? 'text-white' : ''}`}>
                    {service.title}
                  </span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeService.title === service.title ? 'text-white translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>

            {/* Right Column: Detailed View */}
            <div className="w-full lg:w-2/3">
              <div className="sticky top-28 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Image Area */}
                <div className="relative h-64 md:h-80 overflow-hidden group">
                  <img
                    key={activeService.title} // Force re-render on change
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8">
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-10 flex flex-col gap-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center border border-pink-100">
                      {/* Clone element to force color if needed, but current icons have text-pink-500 which is fine */}
                      {React.cloneElement(activeService.icon as React.ReactElement, { className: "w-7 h-7 text-pink-500" })}
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {activeService.description}
                      </p>
                      <div className="inline-block px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-500 font-medium border border-gray-100">
                        {activeService.details}
                      </div>
                    </div>
                  </div>

                  {activeService.samples && (
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Sample Works</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {activeService.samples.slice(0, 4).map((sample, i) => (
                          <img key={i} src={sample} className="w-full h-20 object-cover rounded-lg border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity" alt="Sample" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 mt-auto border-t border-gray-100 flex gap-4">
                    <button onClick={scrollToQuote} className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 shadow-lg shadow-pink-200 transition-all transform active:scale-95">
                      Get a Quote
                    </button>
                    <button className="px-6 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 px-6 bg-[#f7f2f4]" id="quote">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Get a Quotation</h2>
            <p className="text-gray-500">Ready to start? Fill out the form below and we'll get back to you with a personalized price.</p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
            {showQuoteSuccess ? (
              <div className="bg-green-50 border border-green-100 p-10 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Success!</h3>
                <p className="text-gray-500 mt-2">Your quotation request has been sent to the admin. We'll be in touch soon!</p>
                <button
                  onClick={() => setShowQuoteSuccess(false)}
                  className="mt-6 font-bold text-green-600 hover:text-green-700 underline underline-offset-4"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleQuoteSubmit}>
                {/* ... contents same as before ... */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Select Service</label>
                    <select
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all appearance-none bg-white"
                    >
                      {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Project Deadline</label>
                    <input
                      type="date"
                      required
                      value={quoteForm.deadline}
                      onChange={(e) => setQuoteForm({ ...quoteForm, deadline: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Project Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements, sizes, quantities, etc."
                    required
                    value={quoteForm.details}
                    onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Upload Design (Optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-pink-500 transition-colors cursor-pointer group">
                    <Upload className="mx-auto w-8 h-8 text-gray-300 group-hover:text-pink-500 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF (max. 10MB)</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100">
                  Send Quotation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Concerns Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="w-3 h-3" /> Help Center
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Customer Support & Concerns</h2>
            <p className="text-gray-500">Have a question or facing an issue? Our team is here to help you move forward.</p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-50">
            {showConcernSuccess ? (
              <div className="bg-pink-50 border border-pink-100 p-10 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Message Received!</h3>
                <p className="text-gray-500 mt-2">We've received your concern. Our team will review it and get back to you via email shortly.</p>
                <button
                  onClick={() => setShowConcernSuccess(false)}
                  className="mt-6 font-bold text-pink-600 hover:text-pink-700 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleConcernSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={concernForm.name}
                      onChange={(e) => setConcernForm({ ...concernForm, name: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      required
                      value={concernForm.email}
                      onChange={(e) => setConcernForm({ ...concernForm, email: e.target.value })}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Type of Concern</label>
                  <select
                    value={concernForm.type}
                    onChange={(e) => setConcernForm({ ...concernForm, type: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all bg-white appearance-none"
                  >
                    <option>Order Issue</option>
                    <option>Payment Inquiry</option>
                    <option>General Question</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Detailed Description</label>
                  <textarea
                    rows={4}
                    placeholder="Please describe your concern in detail..."
                    required
                    value={concernForm.message}
                    onChange={(e) => setConcernForm({ ...concernForm, message: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-[#f06292] text-white rounded-xl font-bold hover:bg-[#e91e63] transition-all flex items-center justify-center gap-2">
                  <ChevronRight className="w-5 h-5" /> Submit Concern
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">E</div>
              <span className="font-bold text-gray-900">Escobal Print Studio</span>
            </div>
            <p className="text-xs text-gray-400">High-Energy Creative Solutions</p>
          </div>
          <div className="flex items-center gap-6">
            <Globe className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Github className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs font-bold text-gray-300 hover:text-pink-500 transition-colors uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-lg hover:border-pink-500"
            >
              Admin Access
            </button>
          </div>
          <div className="text-xs text-gray-400">
            © 2024 Escobal Print Studio. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-10 pt-12">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-8 border border-pink-100">
                <Lock className="w-8 h-8 text-pink-500" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h2>
              <p className="text-gray-500 mb-8 italic">Please enter your credentials to access the dashboard.</p>

              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Username / Email</label>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => {
                      setAdminUsername(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Admin@gmail.com"
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:bg-white focus:border-pink-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:bg-white focus:border-pink-500 transition-all font-medium"
                  />
                </div>

                {loginError && (
                  <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in shake duration-300">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-5 bg-pink-500 text-white rounded-[1.5rem] font-bold text-lg hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-200 transition-all transform active:scale-[0.98] mt-4"
                >
                  Confirm Identity
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
