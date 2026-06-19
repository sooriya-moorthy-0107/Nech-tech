import express, { Request, Response } from 'express';
import cors from 'cors';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';
import { getMockData, saveMockData, initDb } from './db';
import { authMiddleware, JWT_SECRET, AuthenticatedRequest } from './middleware/auth';
import { multerUpload, validateResumeFile } from './middleware/upload';

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Enable CORS with secure restrictions (Allowing frontend on localhost:3000)
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://nech-tech.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Initialize Database schema fallback
initDb();

// --- PUBLIC WEBSITE ENDPOINTS ---

// Get all services
app.get('/api/services', (req: Request, res: Response) => {
  const db = getMockData();
  res.json(db.services);
});

// Get all projects
app.get('/api/projects', (req: Request, res: Response) => {
  const db = getMockData();
  res.json(db.projects);
});

// Get all clients (PRD Section 5)
app.get('/api/clients', (req: Request, res: Response) => {
  const db = getMockData();
  // Return clients sorted alphabetically by name
  const sortedClients = [...db.clients].sort((a, b) => a.name.localeCompare(b.name));
  res.json(sortedClients);
});

// Get all careers
app.get('/api/careers', (req: Request, res: Response) => {
  const db = getMockData();
  res.json(db.careers);
});

// Get all blog posts
app.get('/api/blog', (req: Request, res: Response) => {
  const db = getMockData();
  res.json(db.blogPosts);
});

// Get single blog post details
app.get('/api/blog/:id', (req: Request, res: Response) => {
  const db = getMockData();
  const post = db.blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.json(post);
});

// Handle contact forms (General inquiry)
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message, type } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Simple input validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format' });
  }

  const db = getMockData();
  const newRequest = {
    id: Date.now(),
    name,
    email,
    message,
    type: type || 'Inquiry',
    date: new Date().toISOString()
  };

  db.contactRequests.push(newRequest);
  saveMockData(db);

  res.json({ success: true, message: 'Contact request submitted successfully' });
});

// Handle Quote/Consultation/Demo bookings (Get Quote Form, Consultation Booking, Demo Booking)
app.post('/api/quote-request', (req: Request, res: Response) => {
  const { name, email, company, serviceType, message, bookingType, dateSelected } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const db = getMockData();
  const newQuoteRequest = {
    id: Date.now(),
    name,
    email,
    company: company || '',
    serviceType: serviceType || 'General',
    message: message || '',
    bookingType: bookingType || 'Quote', // 'Quote' | 'Consultation' | 'Demo'
    dateSelected: dateSelected || new Date().toISOString(),
    status: 'Pending',
    date: new Date().toISOString()
  };

  db.quoteRequests.push(newQuoteRequest);
  saveMockData(db);

  res.json({ success: true, message: 'Request submitted successfully' });
});

// Handle Resume Upload & Career Applications
app.post('/api/careers/apply', multerUpload.single('resume'), validateResumeFile, (req: Request, res: Response) => {
  const { name, email, jobId, coverLetter } = req.body;
  if (!name || !email || !jobId) {
    // Delete file if metadata is missing
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ error: 'Name, email, and Job ID are required' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Resume file is required' });
  }

  const db = getMockData();
  const job = db.careers.find(c => c.id === parseInt(jobId));
  if (!job) {
    fs.unlinkSync(req.file.path);
    return res.status(404).json({ error: 'Job opening not found' });
  }

  // Update job entry with candidate application
  if (!job.applicants) {
    job.applicants = [];
  }

  job.applicants.push({
    id: Date.now(),
    name,
    email,
    coverLetter: coverLetter || '',
    resumeFilename: req.file.filename,
    date: new Date().toISOString()
  });

  saveMockData(db);
  res.json({ success: true, message: 'Application submitted successfully' });
});

// --- ADMIN PANEL AUTHENTICATION ---

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const db = getMockData();
  const admin = db.admins.find(a => a.username === username);

  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate session token (HS256)
  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '8h'
  });

  // Set httpOnly secure cookie
  res.setHeader('Set-Cookie', `admin-token=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=28800`);
  res.json({ success: true, token, username: admin.username });
});

// Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', 'admin-token=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0');
  res.json({ success: true });
});

// --- SECURED ADMIN ENDPOINTS (CRUD) ---

// Verify Auth state
app.get('/api/admin/verify', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json({ authenticated: true });
});

// Dashboard Analytics API
app.get('/api/admin/analytics', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const db = getMockData();
  const quotesCount = db.quoteRequests.length;
  const contactsCount = db.contactRequests.length;
  const totalApplicants = db.careers.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);

  res.json({
    metrics: {
      services: db.services.length,
      projects: db.projects.length,
      clients: db.clients.length,
      careers: db.careers.length,
      blogPosts: db.blogPosts.length,
      quoteRequests: quotesCount,
      contactRequests: contactsCount,
      totalApplicants
    },
    recentContacts: db.contactRequests.slice(-5).reverse(),
    recentQuotes: db.quoteRequests.slice(-5).reverse()
  });
});

// --- SERVICES CRUD ---
app.post('/api/admin/services', authMiddleware, (req: Request, res: Response) => {
  const { title, description, category, icon } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });

  const db = getMockData();
  const service = { id: Date.now(), title, description, category: category || 'General', icon: icon || 'Cpu' };
  db.services.push(service);
  saveMockData(db);
  res.json(service);
});

app.put('/api/admin/services/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  const index = db.services.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Service not found' });

  db.services[index] = { ...db.services[index], ...req.body };
  saveMockData(db);
  res.json(db.services[index]);
});

app.delete('/api/admin/services/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  db.services = db.services.filter(s => s.id !== parseInt(req.params.id));
  saveMockData(db);
  res.json({ success: true });
});

// --- PROJECTS CRUD ---
app.post('/api/admin/projects', authMiddleware, (req: Request, res: Response) => {
  const { title, description, category, image, client } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });

  const db = getMockData();
  const project = { id: Date.now(), title, description, category: category || 'General', image: image || '/images/default.jpg', client: client || 'Private' };
  db.projects.push(project);
  saveMockData(db);
  res.json(project);
});

app.put('/api/admin/projects/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  const index = db.projects.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  db.projects[index] = { ...db.projects[index], ...req.body };
  saveMockData(db);
  res.json(db.projects[index]);
});

app.delete('/api/admin/projects/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  db.projects = db.projects.filter(p => p.id !== parseInt(req.params.id));
  saveMockData(db);
  res.json({ success: true });
});

// --- CLIENTS CRUD ---
app.post('/api/admin/clients', authMiddleware, (req: Request, res: Response) => {
  const { name, logo } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const db = getMockData();
  const client = { id: Date.now(), name, logo: logo || '/logos/default.png' };
  db.clients.push(client);
  saveMockData(db);
  res.json(client);
});

app.delete('/api/admin/clients/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  db.clients = db.clients.filter(c => c.id !== parseInt(req.params.id));
  saveMockData(db);
  res.json({ success: true });
});

// --- CAREERS CRUD ---
app.post('/api/admin/careers', authMiddleware, (req: Request, res: Response) => {
  const { title, department, location, type, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });

  const db = getMockData();
  const career = { id: Date.now(), title, department, location, type, description, applicants: [] };
  db.careers.push(career);
  saveMockData(db);
  res.json(career);
});

app.put('/api/admin/careers/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  const index = db.careers.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Job not found' });

  db.careers[index] = { ...db.careers[index], ...req.body };
  saveMockData(db);
  res.json(db.careers[index]);
});

app.delete('/api/admin/careers/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  db.careers = db.careers.filter(c => c.id !== parseInt(req.params.id));
  saveMockData(db);
  res.json({ success: true });
});

// --- BLOGS CRUD ---
app.post('/api/admin/blog', authMiddleware, (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

  const db = getMockData();
  const post = { id: Date.now(), title, content, author: author || 'Admin', date: new Date().toISOString().split('T')[0] };
  db.blogPosts.push(post);
  saveMockData(db);
  res.json(post);
});

app.put('/api/admin/blog/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  const index = db.blogPosts.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  db.blogPosts[index] = { ...db.blogPosts[index], ...req.body };
  saveMockData(db);
  res.json(db.blogPosts[index]);
});

app.delete('/api/admin/blog/:id', authMiddleware, (req: Request, res: Response) => {
  const db = getMockData();
  db.blogPosts = db.blogPosts.filter(b => b.id !== parseInt(req.params.id));
  saveMockData(db);
  res.json({ success: true });
});

// --- SERVING RESUME FILES SECURELY ---
app.get('/api/admin/resumes/:filename', authMiddleware, (req: Request, res: Response) => {
  const filename = path.basename(req.params.filename); // prevent traversal
  const filePath = path.join(__dirname, '../uploads/resumes', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Force safe headers for secure rendering
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Type', 'application/octet-stream');
  
  const filestream = fs.createReadStream(filePath);
  filestream.pipe(res);
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running securely on port ${PORT}`);
});
