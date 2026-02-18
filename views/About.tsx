
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Github, Twitter, Instagram } from 'lucide-react';


const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Header */}
      <Header onLogin={() => navigate('/#quote')} />

      {/* About Content */}
      <main className="pt-32 pb-20 px-6">
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
              About Us
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Escobal Print Studio</h1>
            <p className="text-lg text-gray-500 mb-8">
              Escobal Print Studio brings your creative visions to life with high-quality printing and design. Our experienced team is passionate about craftsmanship, ensuring every project is handled with care and precision.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Our Mission</h2>
                <p className="text-sm text-gray-600">
                  To empower artists, businesses, and individuals by providing exceptional print solutions, innovative design, and outstanding customer service.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Why Choose Us?</h2>
                <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                  <li>Personalized service & attention to detail</li>
                  <li>State-of-the-art printing technology</li>
                  <li>Eco-friendly materials & practices</li>
                  <li>Fast turnaround & reliable delivery</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=400&facepad=2" alt="Escobal Print Studio" className="rounded-3xl shadow-xl w-full object-cover aspect-square max-w-xs" />
            <div className="w-full bg-pink-50 rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold text-pink-600 mb-2">What We Offer</h2>
              <ul className="list-disc pl-6 text-base text-gray-600 text-left space-y-1">
                <li>Custom art prints & posters</li>
                <li>Business cards & stationery</li>
                <li>Branding & logo design</li>
                <li>Event invitations & marketing materials</li>
                <li>And much more!</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Meet the Owners</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Jhoeven Kent Estaloza Escobal" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pink-200" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">Jhoeven Kent Estaloza Escobal</h3>
              <p className="text-pink-500 font-semibold mb-2">Co-Owner</p>
              <p className="text-gray-600 text-center text-sm">Jhoeven is dedicated to delivering top-quality print solutions and creative design, ensuring every client receives the best service possible.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Analou Teraytay Porpayas" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pink-200" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">Analou Teraytay Porpayas</h3>
              <p className="text-pink-500 font-semibold mb-2">Co-Owner</p>
              <p className="text-gray-600 text-center text-sm">Analou brings creativity and a personal touch to every project, making sure each client’s vision is realized with care and professionalism.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Our Location</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-base text-gray-600 mb-2">
                Escobal Print Studio is located in the heart of the community, making it easy for clients to visit and access our services. For directions or more information, please contact us through our social media or visit our main branch.
              </p>
              <p className="text-base text-gray-600">
                <span className="font-semibold text-pink-500">Main Branch:</span> [Insert Address Here]
              </p>
            </div>
            <div className="flex-1 w-full h-64 md:h-48">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Studio Location" className="rounded-xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <p className="text-base text-gray-500 mt-8 text-center max-w-2xl mx-auto">
          Thank you for choosing Escobal Print Studio. We look forward to working with you!
        </p>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 bg-white border-t border-gray-100 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Github className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
          </div>
          <div className="text-xs text-gray-400">
            © 2024 Escobal Print Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
