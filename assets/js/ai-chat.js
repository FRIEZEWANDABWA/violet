// AI Chat Assistant - Always Visible
class AIChatAssistant {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messageHistory = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadKnowledgeBase();
        this.showChatButton();
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
            chatMinimize.addEventListener('click', (e) => {
                e.stopPropagation();
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
        }

        if (voiceInput) {
            voiceInput.addEventListener('click', () => {
                this.startVoiceInput();
            });
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            }
        });
    }

    showChatButton() {
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle) {
            chatToggle.style.display = 'flex';
            chatToggle.style.opacity = '1';
            chatToggle.style.visibility = 'visible';
        }
    }

    showInitialPopup() {
        // Chat starts minimized by default - no auto-popup
        this.isOpen = false;
        this.isMinimized = true;
    }

    toggleChat() {
        if (this.isOpen) {
            this.minimizeChat();
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
            
            // Hide notification badge
            if (notification) {
                notification.style.display = 'none';
            }
            
            // Change chat toggle icon
            const chatIcon = chatToggle?.querySelector('i');
            if (chatIcon) {
                chatIcon.className = 'fas fa-times';
            }
            
            // Add initial message if first time opening
            if (this.messageHistory.length === 0) {
                this.addBotMessage("👋 Hi! I'm Ozone AI. How can I help you with OZONE I.T SYSTEM services today?", true);
            }
            
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    minimizeChat() {
        const aiChat = document.getElementById('aiChat');
        const chatToggle = document.getElementById('chatToggle');
        
        if (aiChat) {
            aiChat.classList.remove('active');
            this.isOpen = false;
            this.isMinimized = true;
        }
        
        // Show notification badge
        const notification = chatToggle?.querySelector('.chat-notification');
        if (notification) {
            notification.style.display = 'flex';
            notification.textContent = '💬';
        }
        
        // Change chat toggle icon
        const chatIcon = chatToggle?.querySelector('i');
        if (chatIcon) {
            chatIcon.className = 'fas fa-comments';
        }
    }

    sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        chatInput.value = '';
        
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
        
        this.messageHistory.push({ type: 'user', message, timestamp: Date.now() });
    }

    addBotMessage(message, showQuickActions = false) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
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
        
        this.messageHistory.push({ type: 'bot', message, timestamp: Date.now() });
    }

    processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = "";
        let showQuickActions = false;
        
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey'])) {
            response = "Hello! 👋 I'm Ozone AI. Welcome to OZONE I.T SYSTEM. How can I help you today?";
            showQuickActions = true;
        }
        else if (this.containsAny(lowerMessage, ['service', 'services'])) {
            response = "We offer:\n🌐 Networking Solutions\n🔒 Security Systems\n📞 PBX & IPBX Systems\n🎥 Audio Visual Systems\n💻 ICT Supply & Installation\n🔗 Fiber Links Installation";
        }
        else if (this.containsAny(lowerMessage, ['contact', 'phone', 'email'])) {
            response = "📞 Contact us:\nPhone: +254 700 000 000\nEmail: info@ozoneitsystem.co.ke\nLocation: Nairobi, Kenya";
        }
        else if (this.containsAny(lowerMessage, ['quote', 'price', 'cost'])) {
            response = "For a quote, please contact us at +254 700 000 000 or email info@ozoneitsystem.co.ke with your requirements.";
        }
        else {
            response = "I can help you with information about our services, contact details, or getting quotes. What would you like to know?";
            showQuickActions = true;
        }
        
        this.addBotMessage(response, showQuickActions);
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

    startVoiceInput() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.value = transcript;
                    this.sendUserMessage();
                }
            };
            
            recognition.start();
        }
    }

    loadKnowledgeBase() {
        // Knowledge base for responses
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

// Initialize AI Chat Assistant
document.addEventListener('DOMContentLoaded', () => {
    const aiChatAssistant = new AIChatAssistant();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIChatAssistant;
}