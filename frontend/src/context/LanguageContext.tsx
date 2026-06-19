import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ta' | 'hi';

const translations = {
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navSolutions: 'Solutions',
    navPortfolio: 'Portfolio',
    navCareers: 'Careers',
    navBlog: 'Blog',
    navContact: 'Contact Us',
    heroTitle: 'Transforming Startups with Premium Software Engineering',
    heroSubtitle: 'Nech Technology builds secure, scalable, glassmorphic software, custom databases, and robust cloud pipelines.',
    ctaQuote: 'Get a Free Quote',
    ctaConsultation: 'Book a Free Consultation',
    ctaDemo: 'Request a Demo',
    whyChooseTitle: 'Why Choose Nech Technology?',
    developmentProcessTitle: 'Our Development Process',
    clientsTitle: 'Our Trusted Clients',
    recentPostsTitle: 'Recent Insights & Blogs',
    techStackTitle: 'Our Technology Ecosystem',
    getQuoteHeader: 'Get Your Project Quote',
    demoHeader: 'Book a Live Product Demo',
    consultationHeader: 'Schedule a Business Consultation',
    adminPanelLink: 'Admin Portal',
    copyrightText: '© 2026 Nech Technology Pvt Ltd. All Rights Reserved.',
    
    // Development Steps
    devStep1Title: 'Requirement Analysis',
    devStep1Desc: 'Understand business goals, challenges, and project requirements to define the right solution.',
    devStep2Title: 'UI/UX Design',
    devStep2Desc: 'Create intuitive, engaging, and responsive user interfaces.',
    devStep3Title: 'Development',
    devStep3Desc: 'Build scalable, secure, high-performance applications using modern technologies.',
    devStep4Title: 'Testing & QA',
    devStep4Desc: 'Comprehensive testing for reliability, security, and performance.',
    devStep5Title: 'Deployment',
    devStep5Desc: 'Deploy using industry best practices on cloud-ready infrastructure.',
    devStep6Title: 'Support',
    devStep6Desc: 'Ongoing support, updates, monitoring, and enhancements post-delivery.'
  },
  ta: {
    navHome: 'முகப்பு',
    navAbout: 'எங்களைப் பற்றி',
    navServices: 'சேவைகள்',
    navSolutions: 'தீர்வுகள்',
    navPortfolio: 'போர்ட்ஃபோலியோ',
    navCareers: 'வேலைவாய்ப்பு',
    navBlog: 'வலைப்பதிவு',
    navContact: 'தொடர்பு கொள்ள',
    heroTitle: 'பிரீமியம் மென்பொருள் பொறியியலுடன் ஸ்டார்ட்அப்களை மாற்றுதல்',
    heroSubtitle: 'நெக் டெக்னாலஜி பாதுகாப்பான, அளவிடக்கூடிய, அதிநவீன மென்பொருள், தனிப்பயன் தரவுத்தளங்கள் மற்றும் வலுவான கிளவுட் உள்கட்டமைப்பை உருவாக்குகிறது.',
    ctaQuote: 'இலவச மேற்கோள் பெறுக',
    ctaConsultation: 'இலவச ஆலோசனையை முன்பதிவு செய்க',
    ctaDemo: 'டெமோவைக் கோருங்கள்',
    whyChooseTitle: 'நெக் டெக்னாலஜியை ஏன் தேர்வு செய்ய வேண்டும்?',
    developmentProcessTitle: 'எங்கள் வளர்ச்சி செயல்முறை',
    clientsTitle: 'எங்கள் நம்பகமான வாடிக்கையாளர்கள்',
    recentPostsTitle: 'சமீபத்திய நுண்ணறிவுகள் & வலைப்பதிவுகள்',
    techStackTitle: 'எங்கள் தொழில்நுட்ப சுற்றுச்சூழல் அமைப்பு',
    getQuoteHeader: 'உங்கள் திட்டத்திற்கான மேற்கோளைப் பெறுங்கள்',
    demoHeader: 'நேரடி தயாரிப்பு டெமோவை முன்பதிவு செய்யுங்கள்',
    consultationHeader: 'வணிக ஆலோசனையைத் திட்டமிடுங்கள்',
    adminPanelLink: 'நிர்வாக போர்டல்',
    copyrightText: '© 2026 நெக் டெக்னாலஜி பிரைவேட் லிமிடெட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Development Steps
    devStep1Title: 'தேவை பகுப்பாய்வு',
    devStep1Desc: 'சரியான தீர்வை வரையறுக்க வணிக இலக்குகள், சவால்கள் மற்றும் திட்டத் தேவைகளைப் புரிந்து கொள்ளுங்கள்.',
    devStep2Title: 'UI/UX வடிவமைப்பு',
    devStep2Desc: 'உள்ளுணர்வு, ஈர்க்கக்கூடிய மற்றும் பதிலளிக்கக்கூடிய பயனர் இடைமுகங்களை உருவாக்குதல்.',
    devStep3Title: 'மென்பொருள் உருவாக்கம்',
    devStep3Desc: 'நவீன தொழில்நுட்பங்களைப் பயன்படுத்தி அளவிடக்கூடிய, பாதுகாப்பான, உயர் செயல்திறன் கொண்ட பயன்பாடுகளை உருவாக்குதல்.',
    devStep4Title: 'சோதனை மற்றும் தரம்',
    devStep4Desc: 'நம்பகத்தன்மை, பாதுகாப்பு மற்றும் செயல்திறனுக்கான விரிவான சோதனை.',
    devStep5Title: 'நிறுவல் (Deployment)',
    devStep5Desc: 'கிளவுட் உள்கட்டமைப்பில் தொழில்துறையின் சிறந்த நடைமுறைகளைப் பயன்படுத்தி நிறுவுதல்.',
    devStep6Title: 'ஆதரவு & பராமரிப்பு',
    devStep6Desc: 'விநியோகத்திற்குப் பிந்தைய ஆதரவு, மேம்படுத்தல்கள், கண்காணிப்பு மற்றும் மேம்பாடுகள்.'
  },
  hi: {
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navServices: 'सेवाएं',
    navSolutions: 'समाधान',
    navPortfolio: 'पोर्टफोलियो',
    navCareers: 'करियर',
    navBlog: 'ब्लॉग',
    navContact: 'संपर्क करें',
    heroTitle: 'प्रीमियम सॉफ्टवेयर इंजीनियरिंग के साथ स्टार्टअप्स का कायाकल्प',
    heroSubtitle: 'नेच टेक्नोलॉजी सुरक्षित, स्केलेबल सॉफ्टवेयर, कस्टम डेटाबेस और मजबूत क्लाउड पाइपलाइन बनाती है।',
    ctaQuote: 'मुफ़्त कोटेशन प्राप्त करें',
    ctaConsultation: 'मुफ़्त परामर्श बुक करें',
    ctaDemo: 'डेमो का अनुरोध करें',
    whyChooseTitle: 'नेच टेक्नोलॉजी क्यों चुनें?',
    developmentProcessTitle: 'हमारी विकास प्रक्रिया',
    clientsTitle: 'हमारे विश्वसनीय ग्राहक',
    recentPostsTitle: 'हालिया ब्लॉग और विचार',
    techStackTitle: 'हमारा प्रौद्योगिकी पारिस्थितिकी तंत्र',
    getQuoteHeader: 'अपनी परियोजना के लिए कोटेशन प्राप्त करें',
    demoHeader: 'लाइव उत्पाद डेमो बुक करें',
    consultationHeader: 'व्यावसायिक परामर्श निर्धारित करें',
    adminPanelLink: 'एडमिन पोर्टल',
    copyrightText: '© 2026 नेच टेक्नोलॉजी प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।',

    // Development Steps
    devStep1Title: 'आवश्यकता विश्लेषण',
    devStep1Desc: 'सही समाधान को परिभाषित करने के लिए व्यावसायिक लक्ष्यों, चुनौतियों और परियोजना आवश्यकताओं को समझें.',
    devStep2Title: 'UI/UX डिज़ाइन',
    devStep2Desc: 'सहज, आकर्षक और उत्तरदायी यूजर इंटरफेस बनाना।',
    devStep3Title: 'विकास (Development)',
    devStep3Desc: 'आधुनिक तकनीकों का उपयोग करके स्केलेबल, सुरक्षित, उच्च प्रदर्शन वाले एप्लिकेशन बनाना।',
    devStep4Title: 'परीक्षण और क्यूए',
    devStep4Desc: 'विश्वसनीयता, सुरक्षा और प्रदर्शन के लिए व्यापक परीक्षण।',
    devStep5Title: 'तैनाती (Deployment)',
    devStep5Desc: 'क्लाउड-रेडी इंफ्रास्ट्रक्चर पर उद्योग के सर्वोत्तम प्रथाओं का उपयोग करके तैनात करना।',
    devStep6Title: 'सहायता और रखरखाव',
    devStep6Desc: 'वितरण के बाद निरंतर सहायता, अपडेट, निगरानी और संवर्द्धन।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
