// Internationalization (i18n) for Violet Makhanu's website
// English and Kiswahili support

class VioletI18n {
    constructor() {
        this.currentLang = localStorage.getItem('violet-lang') || 'en';
        this.translations = this.initTranslations();
        this.init();
    }

    init() {
        this.createLanguageToggle();
        this.translatePage();
        this.setupEventListeners();
    }

    initTranslations() {
        return {
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.achievements': 'Achievements',
                'nav.vision': 'Vision 2027',
                'nav.media': 'Media',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title': 'From <span class="highlight">Mihuu</span> to Parliament<br>Leadership You Can <span class="highlight">Trust</span>',
                'hero.subtitle': 'Impact You Can See. Service You Can Count On.<br>Your elected MCA ready to take our voice to Parliament.',
                'hero.cta1': 'See My Journey',
                'hero.cta2': 'Join the Movement',

                // KPI Cards
                'kpi.schools': 'Schools Supported',
                'kpi.dispensaries': 'Dispensaries Built',
                'kpi.families': 'Families Connected to Water',
                'kpi.terms': 'Terms as MCA',

                // About Section
                'about.title': 'My Story',
                'about.subtitle': 'From humble beginnings to servant leadership',
                'about.story1.title': 'Born to Serve',
                'about.story1.text': 'Born and raised in Mihuu, I know firsthand the struggles of everyday citizens. Before leadership, I was a small-scale trader and tailor, working hard to provide for my family. But I always carried a dream bigger than myself: to serve my people and transform our community.',
                'about.story2.title': 'The Journey Begins',
                'about.story2.text': 'That dream became reality in 2013 when I was nominated MCA. In 2017, you entrusted me with your votes—and again in 2022. Each step has been fueled by your faith and my unwavering commitment to service.',
                'about.quote': 'Leadership is not about titles—it\'s about service, integrity, and leaving no one behind.',

                // Timeline
                'timeline.2013': 'Nominated MCA',
                'timeline.2013.desc': 'Started my leadership journey under ODM',
                'timeline.2017': 'Elected MCA',
                'timeline.2017.desc': 'Delivered tangible development projects',
                'timeline.2022': 'Re-elected MCA',
                'timeline.2022.desc': 'Chairperson of Youth Affairs & Sports Committee',
                'timeline.2027': 'Parliament Bound',
                'timeline.2027.desc': 'Ready to take Mihuu\'s voice to the next level',

                // Achievements
                'achievements.title': 'Proven Impact',
                'achievements.subtitle': 'Tangible results that speak for themselves',
                'achievement.roads': 'Road Networks',
                'achievement.roads.desc': 'Improved road infrastructure across Mihuu Ward, connecting communities and boosting economic activities.',
                'achievement.water': 'Clean Water Access',
                'achievement.water.desc': 'Expanded access to clean water through strategic borehole projects, serving over 1000 families.',
                'achievement.health': 'Healthcare Facilities',
                'achievement.health.desc': 'Construction and upgrade of dispensaries for better healthcare access across the ward.',
                'achievement.education': 'Education Support',
                'achievement.education.desc': 'Fair and transparent bursary distribution, supporting over 10 schools and hundreds of students.',
                'achievement.land': 'Land Rights',
                'achievement.land.desc': 'Strong voice in defending community land and heritage, including the protection of Chetambe Hills.',
                'achievement.youth': 'Youth Programs',
                'achievement.youth.desc': 'Football tournaments, mentorship programs, and skills training for youth empowerment.',

                // Vision 2027
                'vision.title': 'Vision 2027 & Beyond',
                'vision.subtitle': 'Taking Mihuu\'s voice to Parliament',
                'vision.intro': 'Leadership doesn\'t stop at the ward level. My mission is to take Mihuu\'s voice to Parliament, where bigger policies and larger resources can transform our lives. As your next MP, I envision a constituency where every child gets an education, every youth has a job or skill, and every family enjoys better healthcare and infrastructure.',
                'agenda.1': 'Education First',
                'agenda.1.desc': 'More bursaries, scholarships, and digital learning hubs for our children\'s future.',
                'agenda.2': 'Youth Empowerment',
                'agenda.2.desc': 'Vocational training, sports development, and start-up funding for our youth.',
                'agenda.3': 'Healthcare for All',
                'agenda.3.desc': 'Modern facilities and expanded dispensaries across every village.',
                'agenda.4': 'Agriculture & Jobs',
                'agenda.4.desc': 'Support for farmers, market access, and investment in agribusiness.',
                'agenda.5': 'Infrastructure Development',
                'agenda.5.desc': 'Roads, water, and electricity to every corner of our constituency.',

                // Media Hub
                'media.title': 'Media Hub',
                'media.subtitle': 'See leadership in action',
                'media.gallery': 'Gallery',
                'media.videos': 'Videos',
                'media.news': 'News',

                // Contact
                'contact.title': 'Stay Connected',
                'contact.subtitle': 'Your voice matters. I\'m here to listen.',
                'contact.office': 'Office Location',
                'contact.office.address': 'Mihuu Ward Offices<br>Bungoma County, Kenya',
                'contact.phone': 'Phone',
                'contact.email': 'Email',
                'contact.form.name': 'Your Name',
                'contact.form.email': 'Email Address',
                'contact.form.phone': 'Phone Number',
                'contact.form.subject': 'Select Subject',
                'contact.form.message': 'Your Message',
                'contact.form.ai': 'AI Quick Answer',
                'contact.form.send': 'Send Message',

                // Footer
                'footer.tagline': 'Service • Impact • Leadership',
                'footer.links': 'Quick Links',
                'footer.involve': 'Get Involved',
                'footer.connect': 'Connect',
                'footer.copyright': '© 2024 Hon. Violet Makhanu. All rights reserved.',
                'footer.built': 'Built with ❤️ for the people of Mihuu Ward',

                // AI Chat
                'chat.title': 'Violet AI Assistant',
                'chat.status': 'Online',
                'chat.placeholder': 'Ask me anything...',
                'chat.welcome': 'Hello! I\'m Violet\'s AI assistant. How can I help you learn more about Hon. Violet Makhanu and her work in Mihuu Ward?',
                
                // Form Options
                'form.bursary': 'Bursary Application',
                'form.project': 'Project Inquiry',
                'form.volunteer': 'Volunteer Opportunity',
                'form.general': 'General Inquiry'
            },

            sw: {
                // Navigation
                'nav.home': 'Nyumbani',
                'nav.about': 'Kuhusu',
                'nav.achievements': 'Mafanikio',
                'nav.vision': 'Maono 2027',
                'nav.media': 'Vyombo',
                'nav.contact': 'Mawasiliano',

                // Hero Section
                'hero.title': 'Kutoka <span class="highlight">Mihuu</span> hadi Bunge<br>Uongozi Unao<span class="highlight">weza</span> Kuuamini',
                'hero.subtitle': 'Athari Unazoweza Kuona. Huduma Unayoweza Kutegemea.<br>MCA wako aliyechaguliwa tayari kuchukua sauti yetu Bungeni.',
                'hero.cta1': 'Ona Safari Yangu',
                'hero.cta2': 'Jiunge na Harakati',

                // KPI Cards
                'kpi.schools': 'Shule Zilizosaidiwa',
                'kpi.dispensaries': 'Zahanati Zilizojengwa',
                'kpi.families': 'Familia Zilizounganishwa na Maji',
                'kpi.terms': 'Vipindi kama MCA',

                // About Section
                'about.title': 'Hadithi Yangu',
                'about.subtitle': 'Kutoka mwanzo wa unyenyekevu hadi uongozi wa kutumikia',
                'about.story1.title': 'Nizaliwa Kutumikia',
                'about.story1.text': 'Nilizaliwa na kulelewa Mihuu, najua mapambano ya kila siku ya raia wa kawaida. Kabla ya uongozi, nilikuwa mfanyabiashara mdogo na mshonaji, nikifanya kazi kwa bidii kutoa mahitaji ya familia yangu. Lakini daima nilishika ndoto kubwa kuliko mimi mwenyewe: kutumikia watu wangu na kubadilisha jamii yetu.',
                'about.story2.title': 'Safari Inaanza',
                'about.story2.text': 'Ndoto hiyo ikawa ukweli mnamo 2013 nilipoteuliwa MCA. Mnamo 2017, mliniamini kura zenu—na tena mnamo 2022. Kila hatua imechukuliwa na imani yenu na kujitolea kwangu kwa huduma.',
                'about.quote': 'Uongozi si kuhusu majina—ni kuhusu huduma, uongozi, na kutowaacha mtu yeyote nyuma.',

                // Timeline
                'timeline.2013': 'MCA Aliyeteuliwa',
                'timeline.2013.desc': 'Nilianza safari yangu ya uongozi chini ya ODM',
                'timeline.2017': 'MCA Aliyechaguliwa',
                'timeline.2017.desc': 'Nilitoa miradi ya maendeleo ya kimsingi',
                'timeline.2022': 'MCA Aliyechaguliwa Tena',
                'timeline.2022.desc': 'Mwenyekiti wa Kamati ya Mambo ya Vijana na Michezo',
                'timeline.2027': 'Njiani Bungeni',
                'timeline.2027.desc': 'Tayari kuchukua sauti ya Mihuu kiwango cha juu',

                // Achievements
                'achievements.title': 'Athari Zilizothibitishwa',
                'achievements.subtitle': 'Matokeo ya kimsingi yanayozungumza yenyewe',
                'achievement.roads': 'Mitandao ya Barabara',
                'achievement.roads.desc': 'Kuboresha miundombinu ya barabara kote Mihuu Ward, kuunganisha jamii na kuongeza shughuli za kiuchumi.',
                'achievement.water': 'Upatikanaji wa Maji Safi',
                'achievement.water.desc': 'Kupanua upatikanaji wa maji safi kupitia miradi ya kisima, ikitumikia familia zaidi ya 1000.',
                'achievement.health': 'Vituo vya Afya',
                'achievement.health.desc': 'Ujenzi na uboreshaji wa zahanati kwa upatikanaji bora wa huduma za afya kote wardini.',
                'achievement.education': 'Msaada wa Elimu',
                'achievement.education.desc': 'Ugavi wa haki na uwazi wa bursary, kusaidia shule zaidi ya 10 na mamia ya wanafunzi.',
                'achievement.land': 'Haki za Ardhi',
                'achievement.land.desc': 'Sauti kali katika kulinda ardhi ya jamii na urithi, ikiwa ni pamoja na ulinzi wa Milima ya Chetambe.',
                'achievement.youth': 'Mipango ya Vijana',
                'achievement.youth.desc': 'Mashindano ya mpira, mipango ya uongozaji, na mafunzo ya ujuzi kwa uwezeshaji wa vijana.',

                // Vision 2027
                'vision.title': 'Maono 2027 na Zaidi',
                'vision.subtitle': 'Kuchukua sauti ya Mihuu Bungeni',
                'vision.intro': 'Uongozi hauishii kiwango cha ward. Dhamira yangu ni kuchukua sauti ya Mihuu Bungeni, ambapo sera kubwa na rasilimali kubwa zinaweza kubadilisha maisha yetu. Kama Mbunge wenu wa baadaye, naona jimbo ambapo kila mtoto anapata elimu, kila kijana ana kazi au ujuzi, na kila familia inafurahia huduma bora za afya na miundombinu.',
                'agenda.1': 'Elimu Kwanza',
                'agenda.1.desc': 'Bursary zaidi, ufadhili, na vituo vya kujifunzia vya kidijitali kwa mustakbal wa watoto wetu.',
                'agenda.2': 'Uwezeshaji wa Vijana',
                'agenda.2.desc': 'Mafunzo ya ufundi, maendeleo ya michezo, na ufadhili wa kuanzisha biashara kwa vijana wetu.',
                'agenda.3': 'Afya kwa Wote',
                'agenda.3.desc': 'Vituo vya kisasa na zahanati zilizopanuliwa kote kila kijiji.',
                'agenda.4': 'Kilimo na Kazi',
                'agenda.4.desc': 'Msaada kwa wakulima, upatikanaji wa masoko, na uwekezaji katika biashara za kilimo.',
                'agenda.5': 'Maendeleo ya Miundombinu',
                'agenda.5.desc': 'Barabara, maji, na umeme kila pembe ya jimbo letu.',

                // Media Hub
                'media.title': 'Kituo cha Vyombo',
                'media.subtitle': 'Ona uongozi vitendoni',
                'media.gallery': 'Galeri',
                'media.videos': 'Video',
                'media.news': 'Habari',

                // Contact
                'contact.title': 'Endelea Kuungana',
                'contact.subtitle': 'Sauti yako ni muhimu. Niko hapa kusikiliza.',
                'contact.office': 'Mahali pa Ofisi',
                'contact.office.address': 'Ofisi za Mihuu Ward<br>Kaunti ya Bungoma, Kenya',
                'contact.phone': 'Simu',
                'contact.email': 'Barua pepe',
                'contact.form.name': 'Jina Lako',
                'contact.form.email': 'Anwani ya Barua pepe',
                'contact.form.phone': 'Nambari ya Simu',
                'contact.form.subject': 'Chagua Mada',
                'contact.form.message': 'Ujumbe Wako',
                'contact.form.ai': 'Jibu la Haraka la AI',
                'contact.form.send': 'Tuma Ujumbe',

                // Footer
                'footer.tagline': 'Huduma • Athari • Uongozi',
                'footer.links': 'Viungo vya Haraka',
                'footer.involve': 'Jiunge',
                'footer.connect': 'Unganisha',
                'footer.copyright': '© 2024 Mhe. Violet Makhanu. Haki zote zimehifadhiwa.',
                'footer.built': 'Imejengwa kwa ❤️ kwa watu wa Mihuu Ward',

                // AI Chat
                'chat.title': 'Msaidizi wa AI wa Violet',
                'chat.status': 'Mtandaoni',
                'chat.placeholder': 'Niulize chochote...',
                'chat.welcome': 'Hujambo! Mimi ni msaidizi wa AI wa Violet. Ninawezaje kukusaidia kujifunza zaidi kuhusu Mhe. Violet Makhanu na kazi yake katika Mihuu Ward?',
                
                // Form Options
                'form.bursary': 'Ombi la Bursary',
                'form.project': 'Ulizo la Mradi',
                'form.volunteer': 'Fursa ya Kujitolea',
                'form.general': 'Ulizo wa Jumla'
            }
        };
    }

    createLanguageToggle() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        const langToggle = document.createElement('button');
        langToggle.className = 'lang-toggle';
        langToggle.id = 'lang-toggle';
        langToggle.innerHTML = this.currentLang === 'en' ? 'SW' : 'EN';
        langToggle.title = this.currentLang === 'en' ? 'Badili kwa Kiswahili' : 'Switch to English';
        
        // Add styles
        langToggle.style.cssText = `
            background: none;
            border: 2px solid var(--primary);
            color: var(--primary);
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.3s ease;
            margin-left: 0.5rem;
        `;

        navActions.appendChild(langToggle);
    }

    setupEventListeners() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'sw' : 'en';
        localStorage.setItem('violet-lang', this.currentLang);
        
        this.translatePage();
        this.updateToggleButton();
        this.updateAIChat();
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });

        // Update document language
        document.documentElement.lang = this.currentLang === 'sw' ? 'sw' : 'en';
        
        // Force update of dynamic content
        this.updateDynamicContent();
    }

    updateToggleButton() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.innerHTML = this.currentLang === 'en' ? 'SW' : 'EN';
            langToggle.title = this.currentLang === 'en' ? 'Badili kwa Kiswahili' : 'Switch to English';
        }
    }

    updateAIChat() {
        // Update AI chat knowledge base
        if (window.violetAIChat) {
            window.violetAIChat.currentLang = this.currentLang;
            
            // Clear chat and show new welcome message
            const chatBody = document.getElementById('chat-body');
            if (chatBody) {
                chatBody.innerHTML = `
                    <div class="chat-message bot">
                        <div class="message-content">
                            <p>${this.getTranslation('chat.welcome')}</p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    updateDynamicContent() {
        // Update form options
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const options = subjectSelect.querySelectorAll('option');
            options.forEach(option => {
                const value = option.value;
                if (value === 'bursary') {
                    option.textContent = this.currentLang === 'sw' ? 'Ombi la Bursary' : 'Bursary Application';
                } else if (value === 'project') {
                    option.textContent = this.currentLang === 'sw' ? 'Ulizo la Mradi' : 'Project Inquiry';
                } else if (value === 'volunteer') {
                    option.textContent = this.currentLang === 'sw' ? 'Fursa ya Kujitolea' : 'Volunteer Opportunity';
                } else if (value === 'general') {
                    option.textContent = this.currentLang === 'sw' ? 'Ulizo wa Jumla' : 'General Inquiry';
                }
            });
        }
        
        // Update input placeholders
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.placeholder = this.getTranslation('chat.placeholder');
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return this.translations.en[key] || key;
            }
        }
        
        return translation || key;
    }

    // Public method to get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Public method to set language
    setLanguage(lang) {
        if (lang === 'en' || lang === 'sw') {
            this.currentLang = lang;
            localStorage.setItem('violet-lang', this.currentLang);
            this.translatePage();
            this.updateToggleButton();
            this.updateAIChat();
        }
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        window.violetI18n = new VioletI18n();
    }, 100);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VioletI18n;
}