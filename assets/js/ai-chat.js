// AI Chat Assistant for Violet Makhanu's website

class VioletAIChat {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    init() {
        this.setupChatElements();
        this.setupEventListeners();
        this.autoOpenChat();
    }

    initializeKnowledgeBase() {
        return {
            en: {
                greetings: [
                "Hello! I'm Violet's AI assistant. How can I help you learn more about Hon. Violet Makhanu?",
                "Hi there! I'm here to help you with information about Hon. Violet Makhanu and her work in Mihuu Ward.",
                "Welcome! I can answer questions about Violet's achievements, vision, and how to get involved."
            ],
            
            about: {
                keywords: ['about', 'story', 'background', 'biography', 'who is'],
                response: "Hon. Violet Namaemba Makhanu is a three-term MCA for Mihuu Ward in Bungoma County. She started as a tailor and vegetable vendor before entering politics in 2013. She's known for her grassroots approach and commitment to community development."
            },
            
            achievements: {
                keywords: ['achievements', 'projects', 'accomplishments', 'what has she done', 'impact'],
                response: "Violet has delivered significant impact: improved road networks, expanded clean water access to 1000+ families, constructed 5+ dispensaries, supported 10+ schools with bursaries, and championed youth programs including football tournaments and skills training."
            },
            
            vision: {
                keywords: ['vision', '2027', 'future', 'plans', 'parliament', 'mp'],
                response: "Violet's Vision 2027 focuses on taking Mihuu's voice to Parliament with a 5-point agenda: Education First, Youth Empowerment, Healthcare for All, Agriculture & Jobs, and Infrastructure Development. She aims to bring larger resources and policies to transform lives."
            },
            
            contact: {
                keywords: ['contact', 'reach', 'phone', 'email', 'office', 'how to reach'],
                response: "You can reach Hon. Violet Makhanu at her Mihuu Ward Offices in Bungoma County. Phone: +254 700 000 000, Email: violet@mihuu.go.ke. She's also active on Facebook, Twitter, YouTube, and TikTok."
            },
            
            bursary: {
                keywords: ['bursary', 'scholarship', 'education support', 'school fees', 'student help'],
                response: "Violet provides fair and transparent bursary distribution. To apply, you'll need student details, school information, financial need documentation, and academic records. Applications are reviewed quarterly. Contact her office for the application form."
            },
            
            volunteer: {
                keywords: ['volunteer', 'help', 'join', 'get involved', 'support'],
                response: "Great! Violet welcomes volunteers for youth programs, community outreach, events, and development projects. You can specify your skills and availability in the contact form, and we'll match you with suitable opportunities."
            },
            
            youth: {
                keywords: ['youth', 'young people', 'sports', 'football', 'skills training'],
                response: "As Chairperson of Youth Affairs & Sports Committee, Violet champions youth empowerment through football tournaments, mentorship programs, skills training, and start-up funding initiatives. She believes in nurturing local talent."
            },
            
            healthcare: {
                keywords: ['health', 'hospital', 'dispensary', 'medical', 'healthcare'],
                response: "Violet has constructed and upgraded 5+ dispensaries across Mihuu Ward for better healthcare access. Her Vision 2027 includes modern facilities and expanded dispensaries in every village."
            },
            
            water: {
                keywords: ['water', 'borehole', 'clean water', 'water access'],
                response: "Over 1000 families now have access to clean water through Violet's strategic borehole projects. She continues to expand water infrastructure as a basic necessity for all residents."
            }
            },
            
            sw: {
                greetings: [
                    "Hujambo! Mimi ni msaidizi wa AI wa Violet. Ninawezaje kukusaidia kujifunza zaidi kuhusu Mhe. Violet Makhanu?",
                    "Habari! Niko hapa kukusaidia na maelezo kuhusu Mhe. Violet Makhanu na kazi yake katika Mihuu Ward.",
                    "Karibu! Ninaweza kujibu maswali kuhusu mafanikio ya Violet, maono, na jinsi ya kujihusisha."
                ],
                
                about: {
                    keywords: ['kuhusu', 'hadithi', 'mazingira', 'wasifu', 'ni nani'],
                    response: "Mhe. Violet Namaemba Makhanu ni MCA wa vipindi vitatu kwa Mihuu Ward katika Kaunti ya Bungoma. Alianza kama mshonaji na muuzaji wa mboga kabla ya kuingia siasani mnamo 2013. Anajulikana kwa mbinu zake za msingi na kujitolea kwa maendeleo ya jamii."
                },
                
                achievements: {
                    keywords: ['mafanikio', 'miradi', 'mafanikio', 'amefanya nini', 'athari'],
                    response: "Violet ametoa athari kubwa: kuboresha mitandao ya barabara, kupanua upatikanaji wa maji safi kwa familia 1000+, kujenga zahanati 5+, kusaidia shule 10+ kwa bursary, na kuongoza mipango ya vijana ikiwa ni pamoja na mashindano ya mpira na mafunzo ya ujuzi."
                },
                
                vision: {
                    keywords: ['maono', '2027', 'mustakbal', 'mipango', 'bunge', 'mbunge'],
                    response: "Maono ya Violet 2027 yanalenga kuchukua sauti ya Mihuu Bungeni na ajenda ya hatua 5: Elimu Kwanza, Uwezeshaji wa Vijana, Afya kwa Wote, Kilimo na Kazi, na Maendeleo ya Miundombinu. Analenga kuleta rasilimali kubwa na sera kubadilisha maisha."
                },
                
                contact: {
                    keywords: ['mawasiliano', 'kufikia', 'simu', 'barua pepe', 'ofisi', 'jinsi ya kufikia'],
                    response: "Unaweza kumufikia Mhe. Violet Makhanu katika Ofisi zake za Mihuu Ward katika Kaunti ya Bungoma. Simu: +254 700 000 000, Barua pepe: violet@mihuu.go.ke. Pia yu hai kwenye Facebook, Twitter, YouTube, na TikTok."
                },
                
                bursary: {
                    keywords: ['bursary', 'ufadhili', 'msaada wa elimu', 'ada za shule', 'msaada wa mwanafunzi'],
                    response: "Violet anatoa ugavi wa haki na uwazi wa bursary. Kuomba, utahitaji maelezo ya mwanafunzi, maelezo ya shule, nyaraka za uhitaji wa kifedha, na rekodi za kitaaluma. Maombi yanakaguliwa kila robo mwaka. Wasiliana na ofisi yake kwa fomu ya maombi."
                },
                
                volunteer: {
                    keywords: ['kujitolea', 'kusaidia', 'kujiunga', 'kujihusisha', 'kusaidia'],
                    response: "Vizuri! Violet anakaribisha wajitolea kwa mipango ya vijana, ufikishaji wa jamii, matukio, na miradi ya maendeleo. Unaweza kubainisha ujuzi wako na upatikanaji katika fomu ya mawasiliano, na tutakuunganisha na fursa zinazofaa."
                },
                
                youth: {
                    keywords: ['vijana', 'watu wachanga', 'michezo', 'mpira', 'mafunzo ya ujuzi'],
                    response: "Kama Mwenyekiti wa Kamati ya Mambo ya Vijana na Michezo, Violet anaongoza uwezeshaji wa vijana kupitia mashindano ya mpira, mipango ya uongozaji, mafunzo ya ujuzi, na mipango ya ufadhili wa kuanzisha biashara. Anaamini katika kulea talanta za ndani."
                },
                
                healthcare: {
                    keywords: ['afya', 'hospitali', 'zahanati', 'matibabu', 'huduma za afya'],
                    response: "Violet amejenga na kuboresha zahanati 5+ kote Mihuu Ward kwa upatikanaji bora wa huduma za afya. Maono yake ya 2027 yanajumuisha vituo vya kisasa na zahanati zilizopanuliwa kila kijiji."
                },
                
                water: {
                    keywords: ['maji', 'kisima', 'maji safi', 'upatikanaji wa maji'],
                    response: "Familia zaidi ya 1000 sasa zina upatikanaji wa maji safi kupitia miradi ya kisima ya Violet. Anaendelea kupanua miundombinu ya maji kama mahitaji ya msingi kwa wakazi wote."
                }
            }
        };
    }

    setupChatElements() {
        const chatToggle = document.getElementById('chat-toggle');
        const aiChat = document.getElementById('ai-chat');
        const chatMinimize = document.getElementById('chat-minimize');
        
        if (!chatToggle || !aiChat) return;

        // Chat toggle functionality
        chatToggle.addEventListener('click', () => {
            this.toggleChat();
        });

        // Chat minimize functionality
        if (chatMinimize) {
            chatMinimize.addEventListener('click', () => {
                this.closeChat();
            });
        }
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const chatVoice = document.getElementById('chat-voice');

        if (chatInput && chatSend) {
            // Send message on button click
            chatSend.addEventListener('click', () => {
                this.sendMessage();
            });

            // Send message on Enter key
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Voice input functionality
        if (chatVoice && 'webkitSpeechRecognition' in window) {
            this.setupVoiceInput(chatVoice);
        } else if (chatVoice) {
            chatVoice.style.display = 'none';
        }
    }

    setupVoiceInput(voiceBtn) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.style.color = 'var(--error)';
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = transcript;
                this.sendMessage();
            }
        };

        recognition.onend = () => {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.color = '';
        };

        recognition.onerror = () => {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.color = '';
        };
    }

    autoOpenChat() {
        // Auto-open chat once, then auto-minimize after 5 seconds
        const hasAutoOpened = localStorage.getItem('violet-chat-auto-opened');
        
        if (!hasAutoOpened) {
            setTimeout(() => {
                this.openChat();
                localStorage.setItem('violet-chat-auto-opened', 'true');
                
                // Auto-minimize after 5 seconds
                setTimeout(() => {
                    if (this.isOpen) {
                        this.closeChat();
                    }
                }, 5000);
            }, 2000);
        }
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const aiChat = document.getElementById('ai-chat');
        if (aiChat) {
            aiChat.classList.add('active');
            this.isOpen = true;
            
            // Focus on input
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    closeChat() {
        const aiChat = document.getElementById('ai-chat');
        if (aiChat) {
            aiChat.classList.remove('active');
            this.isOpen = false;
        }
    }

    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput || !chatInput.value.trim()) return;

        const userMessage = chatInput.value.trim();
        chatInput.value = '';

        // Add user message to chat
        this.addMessageToChat(userMessage, 'user');

        // Generate and add AI response
        setTimeout(() => {
            const aiResponse = this.generateResponse(userMessage);
            this.addMessageToChat(aiResponse, 'bot');
        }, 500);
    }

    addMessageToChat(message, sender) {
        const chatBody = document.getElementById('chat-body');
        if (!chatBody) return;

        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;

        chatBody.appendChild(messageElement);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // Store in history
        this.chatHistory.push({ message, sender, timestamp: new Date() });
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const currentLang = window.violetI18n ? window.violetI18n.getCurrentLanguage() : 'en';
        const kb = this.knowledgeBase[currentLang] || this.knowledgeBase.en;
        
        // Check for greetings
        const greetingKeywords = currentLang === 'sw' ? 
            ['hujambo', 'habari', 'mambo', 'salamu', 'karibu'] : 
            ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
            
        if (this.containsKeywords(message, greetingKeywords)) {
            return this.getRandomGreeting(currentLang);
        }

        // Check knowledge base
        for (const [topic, data] of Object.entries(kb)) {
            if (topic === 'greetings') continue;
            
            if (data.keywords && this.containsKeywords(message, data.keywords)) {
                return data.response;
            }
        }

        // Navigation suggestions
        const navKeywords = currentLang === 'sw' ? 
            ['elekeza', 'nenda', 'nionyeshe', 'nichukue'] : 
            ['navigate', 'go to', 'show me', 'take me to'];
            
        if (this.containsKeywords(message, navKeywords)) {
            return currentLang === 'sw' ? 
                "Ninaweza kukusaidia kunavigesheni! Jaribu kusema 'kuhusu', 'mafanikio', 'maono', 'mawasiliano', au 'vyombo' kuruka sehemu tofauti za tovuti." :
                "I can help you navigate! Try saying 'about', 'achievements', 'vision', 'contact', or 'media' to jump to different sections of the website.";
        }

        // Default response with suggestions
        return currentLang === 'sw' ? 
            "Ningependa kukusaidia! Unaweza kuniuliza kuhusu hadithi ya Violet, mafanikio, maono ya 2027, jinsi ya kumufikia, maombi ya bursary, fursa za kujitolea, au mipango ya vijana. Ungependa kujua nini?" :
            "I'd be happy to help! You can ask me about Violet's story, achievements, vision for 2027, how to contact her, bursary applications, volunteer opportunities, or youth programs. What would you like to know?";
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword.toLowerCase()));
    }

    getRandomGreeting(lang = 'en') {
        const kb = this.knowledgeBase[lang] || this.knowledgeBase.en;
        const greetings = kb.greetings;
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Public methods for external use
    askQuestion(question) {
        if (!this.isOpen) {
            this.openChat();
        }
        
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = question;
                this.sendMessage();
            }
        }, 300);
    }

    suggestQuestions() {
        const suggestions = [
            "Tell me about Violet's achievements",
            "What is her vision for 2027?",
            "How can I apply for a bursary?",
            "How can I volunteer?",
            "What youth programs are available?"
        ];
        
        return suggestions;
    }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.violetAIChat = new VioletAIChat();
});

// Global function for external access
window.askVioletAI = function(question) {
    if (window.violetAIChat) {
        window.violetAIChat.askQuestion(question);
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VioletAIChat;
}