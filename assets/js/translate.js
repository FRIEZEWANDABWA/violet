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
        'chat-placeholder': 'Ask me anything...',
        'story1-title': 'Born to Serve',
        'story1-text': 'Born and raised in Mihuu, I know firsthand the struggles of everyday citizens. Before leadership, I was a small-scale trader and tailor, working hard to provide for my family. But I always carried a dream bigger than myself: to serve my people and transform our community.',
        'story2-title': 'The Journey Begins',
        'story2-text': 'That dream became reality in 2013 when I was nominated MCA. In 2017, you entrusted me with your votes—and again in 2022. Each step has been fueled by your faith and my unwavering commitment to service.',
        'quote': 'Leadership is not about titles—it\'s about service, integrity, and leaving no one behind.',
        'timeline-2013': 'Nominated MCA',
        'timeline-2017': 'Elected MCA',
        'timeline-2022': 'Re-elected MCA',
        'timeline-2027': 'Parliament Bound',
        'roads': 'Road Networks',
        'water': 'Clean Water Access',
        'health': 'Healthcare Facilities',
        'education': 'Education Support',
        'land': 'Land Rights',
        'youth': 'Youth Programs',
        'vision-intro': 'Leadership doesn\'t stop at the ward level. My mission is to take Mihuu\'s voice to Parliament, where bigger policies and larger resources can transform our lives.',
        'agenda1': 'Education First',
        'agenda2': 'Youth Empowerment',
        'agenda3': 'Healthcare for All',
        'agenda4': 'Agriculture & Jobs',
        'agenda5': 'Infrastructure Development'
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
        'chat-placeholder': 'Niulize chochote...',
        'story1-title': 'Nizaliwa Kutumikia',
        'story1-text': 'Nilizaliwa na kulelewa Mihuu, najua mapambano ya kila siku ya raia wa kawaida. Kabla ya uongozi, nilikuwa mfanyabiashara mdogo na mshonaji, nikifanya kazi kwa bidii kutoa mahitaji ya familia yangu.',
        'story2-title': 'Safari Inaanza',
        'story2-text': 'Ndoto hiyo ikawa ukweli mnamo 2013 nilipoteuliwa MCA. Mnamo 2017, mliniamini kura zenu—na tena mnamo 2022. Kila hatua imechukuliwa na imani yenu.',
        'quote': 'Uongozi si kuhusu majina—ni kuhusu huduma, uongozi, na kutowaacha mtu yeyote nyuma.',
        'timeline-2013': 'MCA Aliyeteuliwa',
        'timeline-2017': 'MCA Aliyechaguliwa',
        'timeline-2022': 'MCA Aliyechaguliwa Tena',
        'timeline-2027': 'Njiani Bungeni',
        'roads': 'Mitandao ya Barabara',
        'water': 'Upatikanaji wa Maji Safi',
        'health': 'Vituo vya Afya',
        'education': 'Msaada wa Elimu',
        'land': 'Haki za Ardhi',
        'youth': 'Mipango ya Vijana',
        'vision-intro': 'Uongozi hauishii kiwango cha ward. Dhamira yangu ni kuchukua sauti ya Mihuu Bungeni, ambapo sera kubwa na rasilimali kubwa zinaweza kubadilisha maisha yetu.',
        'agenda1': 'Elimu Kwanza',
        'agenda2': 'Uwezeshaji wa Vijana',
        'agenda3': 'Afya kwa Wote',
        'agenda4': 'Kilimo na Kazi',
        'agenda5': 'Maendeleo ya Miundombinu'
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

function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Add language toggle button and setup mobile nav
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
            min-height: 44px;
        `;
        langBtn.onclick = toggleLanguage;
        navActions.appendChild(langBtn);
    }
    
    // Setup mobile navigation
    setupMobileNav();
});