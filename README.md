# Hon. Violet Makhanu - Official Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

A modern, responsive, and multilingual website for Hon. Violet Namaemba Makhanu, MCA for Mihuu Ward, Bungoma County, Kenya.

## 🌟 Features

- **Bilingual Support** - English and Kiswahili
- **Mobile-First Design** - Fully responsive across all devices
- **AI Chat Assistant** - Interactive help and information
- **Progressive Web App** - Installable with offline support
- **Modern UI/UX** - Dark/light mode with smooth animations
- **SEO Optimized** - Fast loading and search engine friendly

## 🚀 Live Website

Visit the live website: [https://violetmakhanu.netlify.app](https://violetmakhanu.netlify.app)

## 📱 Pages

- **Home** - Overview and key information
- **About** - Personal story and leadership journey
- **Achievements** - Proven impact and project details
- **Vision 2027** - Future plans and parliamentary agenda
- **Media** - Photo gallery and news updates
- **Contact** - Get in touch and office information

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 🌍 Multilingual Support

The website supports both English and Kiswahili:
- Click the **EN/SW** toggle in the navigation
- All content translates instantly
- AI chat responds in selected language

## 📦 Installation & Development

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/FRIEZEWANDABWA/violet.git
   cd violet
   ```

2. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open http://localhost:8000 in your browser

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Deploy automatically on push

### Manual Deployment
1. Upload all files to your web server
2. Ensure proper MIME types for .webp files
3. Configure HTTPS for PWA features

## 📊 Performance

- **Load Time**: < 2 seconds
- **Lighthouse Score**: 90+ (Performance, SEO, Best Practices, Accessibility)
- **Mobile Optimized**: Touch-friendly with responsive design
- **PWA Ready**: Installable with offline functionality

## 🎨 Customization

### Colors
Update CSS custom properties in `assets/css/style.css`:
```css
:root {
  --primary: #2563eb;
  --secondary: #06b6d4;
  --accent: #10b981;
}
```

### Content
- Update text content in HTML files
- Add translations in `assets/js/translate.js`
- Replace images in `pics/` folder

### AI Chat
Modify responses in `assets/js/ai-chat.js`:
```javascript
const knowledgeBase = {
  en: { /* English responses */ },
  sw: { /* Kiswahili responses */ }
};
```

## 📞 Contact & Support

For technical support or questions:
- **Email**: info@ozoneitsystem.co.ke
- **Website**: [Ozone IT System](https://ozoneitsystem.netlify.app)

## 📄 License

This website is proprietary software owned by Hon. Violet Makhanu. All rights reserved.

## 🤝 Contributing

This is a private repository for Hon. Violet Makhanu's official website. Contributions are by invitation only.

---

**Built with ❤️ by [Ozone IT System Ltd](https://ozoneitsystem.netlify.app)**

*Transforming political engagement through modern web technology.*