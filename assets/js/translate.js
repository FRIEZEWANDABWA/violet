// Simple translation system that actually works
let currentLang = 'en';

const translations = {
    en: {
        'nav-home': 'Home',
        'nav-about': 'About', 
        'nav-achievements': 'Achievements',
        'nav-vision': 'Vision 2027',
        'nav-media': 'Media',
        'nav-contact': 'Contact',
        'hero-title': 'From <span class="highlight">Mihuu</span> to Parliament<br>Leadership You Can <span class="highlight">Trust</span>',
        'hero-subtitle': 'Impact You Can See. Service You Can Count On.<br>Your elected MCA ready to take our voice to Parliament.',
        'hero-btn1': 'See My Journey',
        'hero-btn2': 'Join the Movement',
        'kpi-schools': 'Schools Supported',
        'kpi-dispensaries': 'Dispensaries Built', 
        'kpi-families': 'Families Connected to Water',
        'kpi-terms': 'Terms as MCA',
        'about-title': 'My Story',
        'about-subtitle': 'From humble beginnings to servant leadership',
        'achievements-title': 'Proven Impact',
        'achievements-subtitle': 'Tangible results that speak for themselves',
        'vision-title': 'Vision 2027 & Beyond',
        'vision-subtitle': 'Taking Mihuu\'s voice to Parliament',
        'media-title': 'Media Hub',
        'media-subtitle': 'See leadership in action',
        'contact-title': 'Stay Connected',
        'contact-subtitle': 'Your voice matters. I\'m here to listen.',
        'tab-gallery': 'Gallery',
        'tab-videos': 'Videos', 
        'tab-news': 'News',
        'contact-office': 'Office Location',
        'contact-phone': 'Phone',
        'contact-email': 'Email',
        'form-name': 'Your Name',
        'form-email': 'Email Address',
        'form-phone': 'Phone Number',
        'form-subject': 'Select Subject',
        'form-message': 'Your Message',
        'btn-ai': 'AI Quick Answer',
        'btn-send': 'Send Message',
        'footer-links': 'Quick Links',
        'footer-involve': 'Get Involved',
        'footer-connect': 'Connect',
        'chat-title': 'Violet AI Assistant',
        'chat-status': 'Online',
        'chat-placeholder': 'Ask me anything...'
    },
    sw: {
        'nav-home': 'Nyumbani',
        'nav-about': 'Kuhusu',
        'nav-achievements': 'Mafanikio', 
        'nav-vision': 'Maono 2027',
        'nav-media': 'Vyombo',
        'nav-contact': 'Mawasiliano',
        'hero-title': 'Kutoka <span class="highlight">Mihuu</span> hadi Bunge<br>Uongozi Unao<span class="highlight">weza</span> Kuuamini',
        'hero-subtitle': 'Athari Unazoweza Kuona. Huduma Unayoweza Kutegemea.<br>MCA wako aliyechaguliwa tayari kuchukua sauti yetu Bungeni.',
        'hero-btn1': 'Ona Safari Yangu',
        'hero-btn2': 'Jiunge na Harakati',
        'kpi-schools': 'Shule Zilizosaidiwa',
        'kpi-dispensaries': 'Zahanati Zilizojengwa',
        'kpi-families': 'Familia Zilizounganishwa na Maji', 
        'kpi-terms': 'Vipindi kama MCA',
        'about-title': 'Hadithi Yangu',
        'about-subtitle': 'Kutoka mwanzo wa unyenyekevu hadi uongozi wa kutumikia',
        'achievements-title': 'Athari Zilizothibitishwa',
        'achievements-subtitle': 'Matokeo ya kimsingi yanayozungumza yenyewe',
        'vision-title': 'Maono 2027 na Zaidi',
        'vision-subtitle': 'Kuchukua sauti ya Mihuu Bungeni',
        'media-title': 'Kituo cha Vyombo',
        'media-subtitle': 'Ona uongozi vitendoni',
        'contact-title': 'Endelea Kuungana',
        'contact-subtitle': 'Sauti yako ni muhimu. Niko hapa kusikiliza.',
        'tab-gallery': 'Galeri',
        'tab-videos': 'Video',
        'tab-news': 'Habari',
        'contact-office': 'Mahali pa Ofisi',
        'contact-phone': 'Simu',
        'contact-email': 'Barua pepe',
        'form-name': 'Jina Lako',
        'form-email': 'Anwani ya Barua pepe',
        'form-phone': 'Nambari ya Simu',
        'form-subject': 'Chagua Mada',
        'form-message': 'Ujumbe Wako',
        'btn-ai': 'Jibu la Haraka la AI',
        'btn-send': 'Tuma Ujumbe',
        'footer-links': 'Viungo vya Haraka',
        'footer-involve': 'Jiunge',
        'footer-connect': 'Unganisha',
        'chat-title': 'Msaidizi wa AI wa Violet',
        'chat-status': 'Mtandaoni',
        'chat-placeholder': 'Niulize chochote...'
    }
};

function translatePage() {
    // Get all elements with translate-id
    document.querySelectorAll('[translate-id]').forEach(element => {
        const key = element.getAttribute('translate-id');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.innerHTML = translations[currentLang][key];
            }
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sw' : 'en';
    translatePage();
    
    // Update button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'SW' : 'EN';
    }
}

// Add language toggle button
document.addEventListener('DOMContentLoaded', () => {
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const langBtn = document.createElement('button');
        langBtn.id = 'lang-toggle';
        langBtn.textContent = 'SW';
        langBtn.style.cssText = `
            background: none;
            border: 2px solid var(--primary);
            color: var(--primary);
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            margin-left: 0.5rem;
        `;
        langBtn.onclick = toggleLanguage;
        navActions.appendChild(langBtn);
    }
});