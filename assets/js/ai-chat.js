// AI Chat Assistant for OZONE I.T SYSTEM Website
// Intelligent chatbot with FAQ handling and user guidance

class AIChatAssistant {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messageHistory = [];
        this.isTyping = false;
        this.autoCloseTimer = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadKnowledgeBase();
        this.initVoiceRecognition();
        this.showInitialPopup();
    }

    setupEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatMinimize = document.getElementById('chatMinimize');
        const sendMessage = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        const voiceInput = document.getElementById('voiceInput');

        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        if (chatMinimize) {
            chatMinimize.addEventListener('click', () => {
                this.minimizeChat();
            });
        }

        if (sendMessage) {
            sendMessage.addEventListener('click', () => {
                this.sendUserMessage();
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendUserMessage();
                }
            });

            chatInput.addEventListener('input', () => {
                this.handleTyping();
            });
        }

        if (voiceInput) {
            voiceInput.addEventListener('click', () => {
                this.startVoiceInput();
            });
        }

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            }
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const aiChat = document.getElementById('aiChat');
            const chatToggle = document.getElementById('chatToggle');
            
            if (this.isOpen && !e.target.closest('#aiChat') && !e.target.closest('#chatToggle')) {
                // Don't auto-close, just minimize
                // this.closeChat();
            }
        });
    }

    loadKnowledgeBase() {
        this.knowledgeBase = {
            services: {
                networking: {
                    title: "Networking Solutions",
                    description: "We provide complete network infrastructure design, installation, and maintenance including LAN/WAN setup, wireless networks, and network security.",
                    features: ["Network Design & Planning", "LAN/WAN Setup", "Wireless Networks", "Network Security"],
                    keywords: ["network", "networking", "lan", "wan", "wifi", "wireless", "infrastructure"]
                },
                security: {
                    title: "Security Systems",
                    description: "Comprehensive security solutions including CCTV cameras, access control systems, and intruder alarm systems to protect your premises.",
                    features: ["CCTV Cameras", "Access Control Systems", "Intruder Alarm Systems", "24/7 Monitoring"],
                    keywords: ["security", "cctv", "camera", "alarm", "access control", "surveillance", "monitoring"]
                },
                pbx: {
                    title: "PBX & IPBX Systems",
                    description: "Modern communication solutions with traditional PBX and advanced IP-based phone systems for seamless business communication.",
                    features: ["PBX Installation", "IPBX Solutions", "VoIP Integration", "Call Management"],
                    keywords: ["pbx", "ipbx", "phone", "communication", "voip", "call", "telephone"]
                },
                audiovisual: {
                    title: "Audio Visual Systems",
                    description: "Professional AV solutions for conferences, presentations, and entertainment systems with cutting-edge technology.",
                    features: ["Conference Systems", "Presentation Solutions", "Sound Systems", "Display Technologies"],
                    keywords: ["audio", "visual", "av", "conference", "presentation", "sound", "display", "projector"]
                },
                ict: {
                    title: "ICT Supply & Installation",
                    description: "End-to-end ICT solutions including hardware supply, software installation, and system integration.",
                    features: ["Hardware Procurement", "Software Installation", "System Integration", "Technical Support"],
                    keywords: ["ict", "hardware", "software", "computer", "installation", "supply", "integration"]
                },
                fiber: {
                    title: "Fiber Links Installation",
                    description: "High-speed fiber optic network installation for reliable and fast data transmission.",
                    features: ["Fiber Optic Cabling", "Network Backbone", "High-Speed Connectivity", "Maintenance & Support"],
                    keywords: ["fiber", "optic", "cable", "high-speed", "internet", "connectivity", "backbone"]
                }
            },
            company: {
                about: "OZONE I.T SYSTEM LTD is a leading provider of comprehensive I.T solutions in Kenya. We specialize in networking, security systems, PBX systems, and more.",
                mission: "To plan, enable and support proactive I.T services, networking and security solutions that drive business success.",
                vision: "To be the leading provider of innovative I.T solutions in Kenya, setting industry standards for quality and reliability.",
                experience: "Over 10 years of experience in the I.T industry",
                projects: "500+ successful projects completed",
                clients: "50+ satisfied clients across various industries"
            },
            contact: {
                phone: "+254 700 000 000",
                email: "info@ozoneitsystem.co.ke",
                location: "Nairobi, Kenya",
                hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM",
                support: "24/7 Emergency Support Available"
            },
            faq: [
                {
                    question: "What services do you offer?",
                    answer: "We offer comprehensive I.T solutions including networking, security systems, PBX/IPBX systems, audio-visual systems, ICT supply & installation, and fiber optic installations."
                },
                {
                    question: "Do you provide 24/7 support?",
                    answer: "Yes, we provide 24/7 emergency support for critical systems. Our regular business hours are Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM."
                },
                {
                    question: "How can I get a quote?",
                    answer: "You can get a quote by contacting us through our contact form, calling us at +254 700 000 000, or emailing us at info@ozoneitsystem.co.ke. We'll assess your requirements and provide a detailed quote."
                },
                {
                    question: "What areas do you serve?",
                    answer: "We primarily serve Nairobi and surrounding areas in Kenya. For projects outside this area, please contact us to discuss availability."
                },
                {
                    question: "Do you offer maintenance services?",
                    answer: "Yes, we offer comprehensive maintenance and support services for all our installations. This includes regular maintenance, troubleshooting, and system updates."
                }
            ]
        };
    }

    showInitialPopup() {
        // Show chat popup after 3 seconds if user hasn't interacted
        setTimeout(() => {
            if (!this.isOpen && !localStorage.getItem('chatShown')) {
                this.showChat();
                this.addBotMessage("👋 Hi! I'm your AI assistant. I can help you learn about our services, get contact information, or answer any questions you have about OZONE I.T SYSTEM.");
                
                // Auto-minimize after 5 seconds if no interaction
                this.autoCloseTimer = setTimeout(() => {
                    if (!this.hasUserInteracted()) {
                        this.minimizeChat();
                    }
                }, 5000);
                
                localStorage.setItem('chatShown', 'true');
            }
        }, 3000);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.showChat();
        }
    }

    showChat() {
        const aiChat = document.getElementById('aiChat');
        const chatToggle = document.getElementById('chatToggle');
        const notification = chatToggle?.querySelector('.chat-notification');
        
        if (aiChat) {
            aiChat.classList.add('active');
            this.isOpen = true;
            this.isMinimized = false;
            
            // Hide notification
            if (notification) {
                notification.style.display = 'none';
            }
            
            // Focus on input
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
            
            // Clear auto-close timer
            if (this.autoCloseTimer) {
                clearTimeout(this.autoCloseTimer);
                this.autoCloseTimer = null;
            }
        }
    }

    closeChat() {
        const aiChat = document.getElementById('aiChat');
        
        if (aiChat) {
            aiChat.classList.remove('active');
            this.isOpen = false;
            this.isMinimized = false;
        }
    }

    minimizeChat() {
        this.closeChat();
        this.isMinimized = true;
        
        // Show notification badge
        const chatToggle = document.getElementById('chatToggle');
        const notification = chatToggle?.querySelector('.chat-notification');
        if (notification) {
            notification.style.display = 'flex';
        }
    }

    sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        chatInput.value = '';
        
        // Process message and respond
        setTimeout(() => {
            this.processUserMessage(message);
        }, 500);
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Store in history
        this.messageHistory.push({ type: 'user', message, timestamp: Date.now() });
    }

    addBotMessage(message, showQuickActions = false) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        // Show typing indicator first
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot-message';
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    ${showQuickActions ? this.getQuickActionsHTML() : ''}
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            this.scrollToBottom();
            
            // Store in history
            this.messageHistory.push({ type: 'bot', message, timestamp: Date.now() });
        }, 1000);
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        this.scrollToBottom();
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = "";
        let showQuickActions = false;
        
        // Greeting detection
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            response = "Hello! 👋 Welcome to OZONE I.T SYSTEM. I'm here to help you with information about our services, company details, or any questions you might have. How can I assist you today?";
            showQuickActions = true;
        }
        
        // Service inquiries
        else if (this.containsAny(lowerMessage, ['service', 'services', 'what do you do', 'what do you offer'])) {
            response = "We offer comprehensive I.T solutions including:\n\n🌐 Networking Solutions\n🔒 Security Systems\n📞 PBX & IPBX Systems\n🎥 Audio Visual Systems\n💻 ICT Supply & Installation\n🔗 Fiber Links Installation\n\nWhich service would you like to know more about?";
        }
        
        // Specific service inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.services.networking.keywords)) {
            const service = this.knowledgeBase.services.networking;
            response = `🌐 **${service.title}**\n\n${service.description}\n\n**Our networking services include:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\nWould you like to know more or get a quote?`;
        }
        
        else if (this.containsAny(lowerMessage, this.knowledgeBase.services.security.keywords)) {
            const service = this.knowledgeBase.services.security;
            response = `🔒 **${service.title}**\n\n${service.description}\n\n**Our security solutions include:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\nWould you like to schedule a security assessment?`;
        }
        
        else if (this.containsAny(lowerMessage, this.knowledgeBase.services.pbx.keywords)) {
            const service = this.knowledgeBase.services.pbx;
            response = `📞 **${service.title}**\n\n${service.description}\n\n**Our communication solutions include:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\nInterested in upgrading your communication system?`;
        }
        
        // Contact information
        else if (this.containsAny(lowerMessage, ['contact', 'phone', 'email', 'address', 'location', 'reach', 'call'])) {
            response = `📞 **Contact Information**\n\n**Phone:** ${this.knowledgeBase.contact.phone}\n**Email:** ${this.knowledgeBase.contact.email}\n**Location:** ${this.knowledgeBase.contact.location}\n**Hours:** ${this.knowledgeBase.contact.hours}\n\n${this.knowledgeBase.contact.support}`;
        }
        
        // Quote requests
        else if (this.containsAny(lowerMessage, ['quote', 'price', 'cost', 'pricing', 'estimate', 'how much'])) {
            response = "💰 **Get a Quote**\n\nI'd be happy to help you get a quote! To provide you with an accurate estimate, our team will need to understand your specific requirements.\n\n**You can get a quote by:**\n• Calling us at +254 700 000 000\n• Emailing us at info@ozoneitsystem.co.ke\n• Visiting our contact page\n\nWould you like me to direct you to our contact form?";
        }
        
        // About company
        else if (this.containsAny(lowerMessage, ['about', 'company', 'who are you', 'experience', 'history'])) {
            response = `🏢 **About OZONE I.T SYSTEM LTD**\n\n${this.knowledgeBase.company.about}\n\n**Our Mission:** ${this.knowledgeBase.company.mission}\n\n**Experience:** ${this.knowledgeBase.company.experience}\n**Projects:** ${this.knowledgeBase.company.projects}\n**Clients:** ${this.knowledgeBase.company.clients}`;
        }
        
        // Support and maintenance
        else if (this.containsAny(lowerMessage, ['support', 'maintenance', 'help', 'problem', 'issue', 'repair'])) {
            response = "🔧 **Support & Maintenance**\n\nWe provide comprehensive support services:\n\n• 24/7 Emergency Support\n• Regular Maintenance\n• System Troubleshooting\n• Software Updates\n• Hardware Repairs\n\nFor immediate support, please call us at +254 700 000 000 or email support@ozoneitsystem.co.ke";
        }
        
        // FAQ handling
        else if (this.containsAny(lowerMessage, ['faq', 'frequently asked', 'common questions'])) {
            response = "❓ **Frequently Asked Questions**\n\nHere are some common questions:\n\n" + 
                this.knowledgeBase.faq.slice(0, 3).map((faq, index) => 
                    `**${index + 1}. ${faq.question}**\n${faq.answer}\n`
                ).join('\n');
        }
        
        // Goodbye
        else if (this.containsAny(lowerMessage, ['bye', 'goodbye', 'see you', 'thanks', 'thank you'])) {
            response = "Thank you for chatting with me! 😊 If you have any more questions about OZONE I.T SYSTEM's services, feel free to ask anytime. Have a great day!";
        }
        
        // Default response with intelligent suggestions
        else {
            const suggestions = this.getIntelligentSuggestions(lowerMessage);
            response = `I understand you're asking about "${message}". ${suggestions}\n\nI can help you with:\n• Information about our services\n• Contact details\n• Getting quotes\n• Technical support\n• Company information\n\nWhat would you like to know more about?`;
            showQuickActions = true;
        }
        
        this.addBotMessage(response, showQuickActions);
    }

    getIntelligentSuggestions(message) {
        // Simple keyword matching for suggestions
        if (message.includes('install')) {
            return "It sounds like you're interested in installation services.";
        } else if (message.includes('network') || message.includes('internet')) {
            return "Are you looking for networking solutions?";
        } else if (message.includes('security') || message.includes('camera')) {
            return "Are you interested in our security systems?";
        } else if (message.includes('phone') || message.includes('communication')) {
            return "Would you like to know about our PBX systems?";
        } else {
            return "I'm here to help with any questions about our I.T services.";
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'services':
                this.processUserMessage('What services do you offer?');
                break;
            case 'contact':
                this.processUserMessage('How can I contact you?');
                break;
            case 'quote':
                this.processUserMessage('How can I get a quote?');
                break;
            default:
                this.addBotMessage("I'm not sure how to handle that action. How can I help you?");
        }
    }

    getQuickActionsHTML() {
        return `
            <div class="quick-actions">
                <button class="quick-action" data-action="services">Our Services</button>
                <button class="quick-action" data-action="contact">Contact Info</button>
                <button class="quick-action" data-action="quote">Get Quote</button>
            </div>
        `;
    }

    // Voice Recognition
    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.value = transcript;
                    this.sendUserMessage();
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.addBotMessage("Sorry, I couldn't hear you clearly. Please try typing your message.");
            };
        }
    }

    startVoiceInput() {
        if (this.recognition) {
            const voiceInput = document.getElementById('voiceInput');
            voiceInput.classList.add('listening');
            
            this.recognition.start();
            
            this.recognition.onend = () => {
                voiceInput.classList.remove('listening');
            };
        } else {
            this.addBotMessage("Voice input is not supported in your browser. Please type your message.");
        }
    }

    handleTyping() {
        // Could implement typing indicators or suggestions here
    }

    hasUserInteracted() {
        return this.messageHistory.some(msg => msg.type === 'user');
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add CSS for typing indicator
const typingCSS = `
.typing-dots {
    display: flex;
    gap: 4px;
    padding: 8px 0;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-secondary);
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.voice-input.listening {
    background: var(--error-color) !important;
    animation: pulse 1s infinite;
}

.install-prompt {
    position: fixed;
    bottom: 100px;
    right: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    box-shadow: var(--shadow-xl);
    z-index: 1001;
    max-width: 300px;
}

.install-prompt-content {
    text-align: center;
}

.install-prompt-content p {
    margin-bottom: 15px;
    color: var(--text-primary);
}

.install-prompt-content .btn {
    margin: 5px;
    padding: 8px 16px;
    font-size: 14px;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = typingCSS;
document.head.appendChild(style);

// Initialize AI Chat Assistant
document.addEventListener('DOMContentLoaded', () => {
    const aiChatAssistant = new AIChatAssistant();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIChatAssistant;
}