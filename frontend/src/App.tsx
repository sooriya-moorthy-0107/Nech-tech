import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ParticleBackground } from './components/ParticleBackground';
import { Chatbot } from './components/Chatbot';
import { 
  Sun, Moon, Menu, X, ChevronRight, MessageCircle, Shield, Users, Award
} from 'lucide-react';

// Common Layout components
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glassmorphism" style={{
      position: 'sticky',
      top: '16px',
      margin: '16px auto',
      maxWidth: '1200px',
      width: '95%',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderRadius: '16px'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <img 
          src="/images/logo.png" 
          alt="Nech Technology Logo" 
          style={{
            height: '42px',
            borderRadius: '6px',
            objectFit: 'contain'
          }} 
        />
        <span style={{ fontWeight: 800, fontSize: '20px', fontFamily: 'var(--font-heading)' }}>
          Nech <span style={{ color: 'var(--accent-cyan)' }}>Technology</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navHome')}</Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navAbout')}</Link>
        <Link to="/services" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navServices')}</Link>
        <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navPortfolio')}</Link>
        <Link to="/careers" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navCareers')}</Link>
        <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navBlog')}</Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500 }}>{t('navContact')}</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Language selector */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as any)}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
          <option value="hi">हिन्दी</option>
        </select>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-trigger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 1000
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navHome')}</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navAbout')}</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navServices')}</Link>
          <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navPortfolio')}</Link>
          <Link to="/careers" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navCareers')}</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navBlog')}</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>{t('navContact')}</Link>
          <hr style={{ borderColor: 'var(--glass-border)' }} />
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--accent-cyan)', fontWeight: 600 }}>{t('adminPanelLink')}</Link>
        </div>
      )}
    </nav>
  );
};

// Footer component
const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer style={{
      marginTop: '80px',
      padding: '40px 24px',
      borderTop: '1px solid var(--glass-border)',
      textAlign: 'center',
      background: 'rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>{t('navHome')}</Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>{t('navAbout')}</Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>{t('navContact')}</Link>
        <Link to="/admin" style={{ textDecoration: 'none', color: 'var(--accent-cyan)' }}>{t('adminPanelLink')}</Link>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{t('copyrightText')}</p>
    </footer>
  );
};

// --- PAGES ---

// Home Page
const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error(err));
  }, []);

  const stats = [
    { value: '24/7', label: 'Support Available' },
    { value: '100%', label: 'Startup Friendly' },
    { value: '50+', label: 'Projects Shipped' },
    { value: '99.9%', label: 'Cloud Uptime' }
  ];

  const devSteps = [
    { num: '01', title: t('devStep1Title'), desc: t('devStep1Desc') },
    { num: '02', title: t('devStep2Title'), desc: t('devStep2Desc') },
    { num: '03', title: t('devStep3Title'), desc: t('devStep3Desc') },
    { num: '04', title: t('devStep4Title'), desc: t('devStep4Desc') },
    { num: '05', title: t('devStep5Title'), desc: t('devStep5Desc') },
    { num: '06', title: t('devStep6Title'), desc: t('devStep6Desc') }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }} className="fade-in-up">
      {/* Hero Section */}
      <section style={{
        padding: '80px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px'
      }}>
        <div className="glassmorphism" style={{
          padding: '40px 24px',
          borderRadius: '24px',
          maxWidth: '800px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em'
          }}>SaaS UI • Custom Architecture</span>
          <h1 style={{ fontSize: '42px', margin: '16px 0', lineHeight: 1.2 }}>{t('heroTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '650px', margin: '0 auto' }}>
            {t('heroSubtitle')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/contact?type=quote')}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3)'
              }}
            >
              {t('ctaQuote')}
            </button>
            <button 
              onClick={() => navigate('/contact?type=consultation')}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'var(--glass-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {t('ctaConsultation')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px' }}>{t('whyChooseTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <Award size={36} color="var(--accent-cyan)" />
            <h3 style={{ margin: '16px 0' }}>Modern Glassmorphism UI</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Stunning layouts that prioritize high aesthetic excellence, dark mode integration, and visual harmony.</p>
          </div>
          <div className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <Shield size={36} color="var(--accent-cyan)" />
            <h3 style={{ margin: '16px 0' }}>Rigorous Security First</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Secure upload handling, input escaping, and parameter validation built in to safeguard credentials and user data.</p>
          </div>
          <div className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <Users size={36} color="var(--accent-cyan)" />
            <h3 style={{ margin: '16px 0' }}>Startup & Business Focused</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Highly scalable systems configured to optimize cost, cloud pipelines, and user search engines.</p>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px' }}>{t('developmentProcessTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {devSteps.map(s => (
            <div key={s.num} className="glassmorphism" style={{ padding: '24px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontSize: '28px',
                fontWeight: 800,
                opacity: 0.15,
                color: 'var(--accent-cyan)'
              }}>{s.num}</div>
              <h3 style={{ margin: '12px 0 8px 0', fontSize: '18px' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '40px', fontSize: '32px' }}>{t('techStackTitle')}</h2>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['React.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'AWS', 'Docker', 'PHP', 'Laravel', 'MongoDB', 'React Native', 'Next.js', 'Python', 'Django', 'SQL Server', 'MySQL', 'Bootstrap', 'Java', 'Go', 'Server Development', 'API Development'].map(tech => (
            <div key={tech} className="glassmorphism" style={{
              padding: '12px 24px',
              borderRadius: '30px',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}>{tech}</div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      {clients.length > 0 && (
        <section style={{ padding: '60px 0', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '40px', fontSize: '32px' }}>{t('clientsTitle')}</h2>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {clients.map(c => (
              <div key={c.id} className="glassmorphism" style={{
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 600,
                color: 'var(--text-secondary)'
              }}>
                {c.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <section style={{
        padding: '60px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        textAlign: 'center'
      }}>
        {stats.map((st, i) => (
          <div key={i} className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <div style={{
              fontSize: '40px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{st.value}</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 500 }}>{st.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

// About Page
const About: React.FC = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>About Nech Technology</h1>
      <div className="glassmorphism" style={{ padding: '40px', borderRadius: '20px' }}>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Nech Technology Pvt Ltd. is a modern software engineering partner committed to delivering high-performance SaaS platforms, robust API pipelines, and interactive user experiences.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Founded in Chennai in 2026, we specialize in helping startups design and launch secure product infrastructure. We enforce modern cloud deployments with Docker, optimized persistence using PostgreSQL, and interactive client applications backed by robust TypeScript code.
        </p>

        <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Our Executive Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div className="glassmorphism" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-cyan)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 700 }}>NS</div>
            <h4>NallaSivam.</h4>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>Chief Executive Officer</span>
          </div>
          <div className="glassmorphism" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-blue)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 700 }}>DD</div>
            <h4>Dilli babu D.</h4>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>Chief Technology Officer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Services Page
const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>Our Premium Services</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {services.map(s => (
          <div key={s.id} className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }}>{s.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{s.description}</p>
            <span style={{ display: 'inline-block', marginTop: '16px', fontSize: '12px', background: 'rgba(6,182,212,0.1)', padding: '4px 10px', borderRadius: '12px', color: 'var(--accent-cyan)' }}>{s.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Portfolio Page
const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>Featured Portfolio</h1>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        {['All', 'EdTech', 'Healthcare', 'SaaS'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: filter === cat ? 'var(--accent-cyan)' : 'var(--glass-bg)',
              color: filter === cat ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filtered.map(p => (
          <div key={p.id} className="glassmorphism" style={{ padding: '24px', borderRadius: '16px', cursor: 'pointer' }} onClick={() => setSelectedProject(p)}>
            <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>{p.category}</span>
            <h3 style={{ margin: '8px 0' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineClamp: 2, overflow: 'hidden' }}>{p.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 600 }}>
              View Details <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glassmorphism" style={{
            maxWidth: '600px',
            width: '100%',
            padding: '32px',
            borderRadius: '20px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 600 }}>{selectedProject.category}</span>
            <h2 style={{ margin: '12px 0' }}>{selectedProject.title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{selectedProject.description}</p>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '14px' }}>
              <strong>Client:</strong> {selectedProject.client}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Careers Page
const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', coverLetter: '' });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/careers')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedJob) return;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('coverLetter', formData.coverLetter);
    data.append('jobId', selectedJob.id.toString());
    data.append('resume', file);

    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/careers/apply', {
        method: 'POST',
        body: data
      });
      const resData = await res.json();
      if (res.ok) {
        setMsg('Application submitted successfully!');
        setFormData({ name: '', email: '', coverLetter: '' });
        setFile(null);
        setTimeout(() => {
          setSelectedJob(null);
          setMsg('');
        }, 1500);
      } else {
        setMsg(resData.error || 'Failed to submit application');
      }
    } catch (err) {
      setMsg('Application submission error');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>Careers at Nech Technology</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {jobs.map(j => (
          <div key={j.id} className="glassmorphism" style={{ padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3>{j.title}</h3>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{j.department} • {j.location} • {j.type}</span>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '14px' }}>{j.description}</p>
            </div>
            <button 
              onClick={() => setSelectedJob(j)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'var(--accent-cyan)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Application Dialog */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <form onSubmit={handleApply} className="glassmorphism" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}>
            <button 
              type="button"
              onClick={() => setSelectedJob(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2>Apply: {selectedJob.title}</h2>

            <div>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Cover Letter</label>
              <textarea 
                rows={3}
                value={formData.coverLetter}
                onChange={e => setFormData({...formData, coverLetter: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Resume (PDF/DOCX, Max 5MB)</label>
              <input 
                type="file" 
                required
                accept=".pdf,.docx"
                onChange={e => setFile(e.target.files?.[0] || null)}
                style={{ color: 'var(--text-primary)' }}
              />
            </div>

            {msg && <div style={{ color: msg.includes('success') ? '#22c55e' : '#ef4444', fontSize: '14px' }}>{msg}</div>}

            <button 
              type="submit"
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'var(--accent-cyan)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Submit Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Blog Page
const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center' }}>Nech Editorial Blog</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {posts.map(p => (
          <article key={p.id} className="glassmorphism" style={{ padding: '32px', borderRadius: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.date} • By {p.author}</span>
            <h2 style={{ margin: '12px 0 16px 0' }}>{p.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{p.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

// Contact Page
const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '', type: 'Quote' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const endpoint = formState.type === 'Inquiry' ? ((import.meta.env.VITE_API_URL || '') + '/api/contact') : ((import.meta.env.VITE_API_URL || '') + '/api/quote-request');
    const bodyData = formState.type === 'Inquiry' 
      ? { name: formState.name, email: formState.email, message: formState.message }
      : { name: formState.name, email: formState.email, company: formState.company, message: formState.message, bookingType: formState.type };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Your submission was successful! We will respond shortly.');
        setFormState({ name: '', email: '', company: '', message: '', type: 'Quote' });
      } else {
        setMsg(data.error || 'Submission failed');
      }
    } catch (err) {
      setMsg('Network/Server connection error');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>Let's Work Together</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Info panel */}
        <div className="glassmorphism" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3>Address</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Nech Technology Pvt Ltd.<br />Chennai, Tamil Nadu, India</p>
          </div>
          <div>
            <h3>Support & Inquiries</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>nechtechnology7@gmail.com<br />+91 63796 33873 / +91 90256 53143</p>
          </div>
          <div>
            <h3>Live Interaction</h3>
            <a href="https://wa.me/916379633873?text=Hi" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="glassmorphism" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>I want to...</label>
            <select
              value={formState.type}
              onChange={e => setFormState({...formState, type: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="Quote">Get a Project Quote</option>
              <option value="Consultation">Book a Consultation</option>
              <option value="Demo">Request a Live Demo</option>
              <option value="Inquiry">Send General Inquiry</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Name</label>
            <input 
              type="text" 
              required
              value={formState.name}
              onChange={e => setFormState({...formState, name: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Email</label>
            <input 
              type="email" 
              required
              value={formState.email}
              onChange={e => setFormState({...formState, email: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
            />
          </div>

          {formState.type !== 'Inquiry' && (
            <div>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Company Name</label>
              <input 
                type="text" 
                value={formState.company}
                onChange={e => setFormState({...formState, company: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Message details</label>
            <textarea 
              rows={4}
              required
              value={formState.message}
              onChange={e => setFormState({...formState, message: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
            />
          </div>

          {msg && <div style={{ color: '#22c55e', fontSize: '14px' }}>{msg}</div>}

          <button 
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--accent-cyan)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ADMIN PORTAL PANEL ---
const AdminPanel: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
  // Dashboard states
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [selectedModule, setSelectedModule] = useState<'Services' | 'Projects' | 'Careers' | 'Blogs'>('Services');

  // CRUD Forms
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', category: 'Development' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', category: 'SaaS', client: '' });
  const [careerForm, setCareerForm] = useState({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-time', description: '' });
  const [blogForm, setBlogForm] = useState({ title: '', content: '', author: 'Admin' });

  const fetchAnalytics = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      } else {
        setAuth(false);
      }
    } catch (err) {
      setAuth(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/verify');
      if (res.ok) {
        setAuth(true);
        fetchAnalytics();
      }
    } catch (e) {
      setAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setAuth(true);
        setErrMsg('');
        fetchAnalytics();
      } else {
        const data = await res.json();
        setErrMsg(data.error || 'Authentication failed');
      }
    } catch (err) {
      setErrMsg('Network error during login');
    }
  };

  const handleLogout = async () => {
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/logout', { method: 'POST' });
    setAuth(false);
  };

  // CRUD triggers
  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceForm)
    });
    fetchAnalytics();
    setServiceForm({ title: '', description: '', category: 'Development' });
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectForm)
    });
    fetchAnalytics();
    setProjectForm({ title: '', description: '', category: 'SaaS', client: '' });
  };

  const addCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(careerForm)
    });
    fetchAnalytics();
    setCareerForm({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-time', description: '' });
  };

  const addBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogForm)
    });
    fetchAnalytics();
    setBlogForm({ title: '', content: '', author: 'Admin' });
  };

  if (!auth) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 24px' }} className="fade-in-up">
        <form onSubmit={handleLogin} className="glassmorphism" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ textAlign: 'center' }}>Admin Authentication</h2>
          {errMsg && <div style={{ color: '#ef4444', fontSize: '14px' }}>{errMsg}</div>}
          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
            />
          </div>
          <button 
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--accent-cyan)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }} className="fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Admin Control Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
        >
          Logout Session
        </button>
      </div>

      {analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="glassmorphism" style={{ padding: '20px' }}>
            <h4>Total Services</h4>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{analytics.metrics.services}</div>
          </div>
          <div className="glassmorphism" style={{ padding: '20px' }}>
            <h4>Dynamic Projects</h4>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{analytics.metrics.projects}</div>
          </div>
          <div className="glassmorphism" style={{ padding: '20px' }}>
            <h4>Career Leads</h4>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{analytics.metrics.careers}</div>
          </div>
          <div className="glassmorphism" style={{ padding: '20px' }}>
            <h4>Incoming Leads</h4>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{analytics.metrics.quoteRequests}</div>
          </div>
        </div>
      )}

      {/* CRUD Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px' }}>
        <div className="glassmorphism" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3>Modules</h3>
          {['Services', 'Projects', 'Careers', 'Blogs'].map((mod: any) => (
            <button
              key={mod}
              onClick={() => setSelectedModule(mod)}
              style={{
                textAlign: 'left',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: selectedModule === mod ? 'var(--accent-cyan)' : 'transparent',
                color: selectedModule === mod ? '#fff' : 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {mod}
            </button>
          ))}
        </div>

        <div className="glassmorphism" style={{ padding: '32px' }}>
          {selectedModule === 'Services' && (
            <div>
              <h3>Add New Service</h3>
              <form onSubmit={addService} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input 
                  placeholder="Service Title" 
                  required
                  value={serviceForm.title}
                  onChange={e => setServiceForm({...serviceForm, title: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <textarea 
                  placeholder="Service Description" 
                  required
                  value={serviceForm.description}
                  onChange={e => setServiceForm({...serviceForm, description: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--accent-cyan)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Create Service</button>
              </form>
            </div>
          )}

          {selectedModule === 'Projects' && (
            <div>
              <h3>Add New Project</h3>
              <form onSubmit={addProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input 
                  placeholder="Project Title" 
                  required
                  value={projectForm.title}
                  onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <textarea 
                  placeholder="Project Description" 
                  required
                  value={projectForm.description}
                  onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <input 
                  placeholder="Client Name" 
                  value={projectForm.client}
                  onChange={e => setProjectForm({...projectForm, client: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--accent-cyan)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Create Project</button>
              </form>
            </div>
          )}

          {selectedModule === 'Careers' && (
            <div>
              <h3>Add New Career Listing</h3>
              <form onSubmit={addCareer} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input 
                  placeholder="Job Title" 
                  required
                  value={careerForm.title}
                  onChange={e => setCareerForm({...careerForm, title: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <textarea 
                  placeholder="Job Description" 
                  required
                  value={careerForm.description}
                  onChange={e => setCareerForm({...careerForm, description: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--accent-cyan)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Post Career</button>
              </form>
            </div>
          )}

          {selectedModule === 'Blogs' && (
            <div>
              <h3>Write Blog Article</h3>
              <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <input 
                  placeholder="Article Title" 
                  required
                  value={blogForm.title}
                  onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <textarea 
                  placeholder="Article Content" 
                  required
                  value={blogForm.content}
                  onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--accent-cyan)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Publish Post</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Root Component wrapper
export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ParticleBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <Chatbot />
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};
export default App;
