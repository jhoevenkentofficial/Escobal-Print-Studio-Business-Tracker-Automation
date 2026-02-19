import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    time: Date;
}

const QuickReplies = [
    "How much for business cards?",
    "What are your operating hours?",
    "Can I track my order?",
    "Do you do rush printing?",
    "I need a quote for a banner."
];

const AiAssistant: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Escobal AI. How can I assist you with your printing needs today?",
            sender: 'ai',
            time: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            time: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(text),
                sender: 'ai',
                time: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('much')) {
            return "Our pricing depends on the specific service and quantity. For example, business cards start at ₱500 for 100 pieces. Would you like a detailed quote?";
        }
        if (lowerInput.includes('hour') || lowerInput.includes('open')) {
            return "We are open Monday to Saturday, from 8:00 AM to 6:00 PM.";
        }
        if (lowerInput.includes('rush')) {
            return "Yes, we offer rush printing services for an additional fee. Please visit our shop or contact us directly for urgent orders.";
        }
        if (lowerInput.includes('track') || lowerInput.includes('order')) {
            return "To track your order, please provide your Order ID. You can usually find this on your receipt.";
        }
        return "I'm here to help! Feel free to ask about our services, pricing, or check on an order status. You can also visit our 'Services' page for more details.";
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-inter flex flex-col">
            <Header onLogin={() => navigate('/#quote')} />

            <div className="flex-1 pt-24 pb-6 px-4 md:px-6 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-80px)]">

                {/* Chat Container */}
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex-1 flex flex-col overflow-hidden relative">

                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200">
                                <Bot className="text-white w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    Escobal Assistant <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                </h2>
                                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfcfc]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-pink-100'}`}>
                                        {msg.sender === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5 text-pink-500" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-gray-900 text-white rounded-tr-none'
                                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                        <p className={`text-[10px] mt-2 opacity-70 ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                                            {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[80%] flex-row">
                                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-100">
                        {/* Quick Replies */}
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                            {QuickReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(reply)}
                                    className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-pink-600 border border-gray-200 hover:border-pink-200 rounded-full text-xs font-medium transition-all"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>

                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full pl-6 pr-14 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-gray-50 focus:bg-white"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="absolute right-2 p-2.5 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-200"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AiAssistant;
