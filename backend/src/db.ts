import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

let pool: Pool | null = null;
const useMockFile = true; // Set to true to use local JSON file DB for instant testing and verification.
const MOCK_DB_PATH = path.join(__dirname, '../data/db.json');

// Ensure data folder exists
if (!fs.existsSync(path.dirname(MOCK_DB_PATH))) {
  fs.mkdirSync(path.dirname(MOCK_DB_PATH), { recursive: true });
}

interface DBState {
  services: any[];
  projects: any[];
  clients: any[];
  careers: any[];
  blogPosts: any[];
  contactRequests: any[];
  quoteRequests: any[];
  admins: any[];
}

const DEFAULT_DB_STATE: DBState = {
  services: [
    { id: 1, title: 'Custom Software Development', description: 'Tailored software solutions designed to fit your business requirements and scale efficiently.', category: 'Development', icon: 'Cpu' },
    { id: 2, title: 'Mobile App Development', description: 'High-performance native and cross-platform mobile apps for iOS and Android platforms.', category: 'Development', icon: 'Smartphone' },
    { id: 3, title: 'Cloud Integration & DevOps', description: 'Modern cloud infrastructure architecture, migration, and automation utilizing AWS and Docker.', category: 'Cloud', icon: 'Cloud' }
  ],
  projects: [
    { id: 1, title: 'School Management System', description: 'A comprehensive ERP system for schools facilitating student profiles, grading, fees, and communication.', category: 'EdTech', image: '/images/school.jpg', client: 'Nech Academy' },
    { id: 2, title: 'Hospital Management System', description: 'A digital healthcare workspace for patient registration, doctor schedules, billing, and lab reports.', category: 'Healthcare', image: '/images/hospital.jpg', client: 'Care Health' },
    { id: 3, title: 'E-Commerce Platform', description: 'Highly scalable, glassmorphic e-commerce storefront with admin panel, cart, and payment integrations.', category: 'SaaS', image: '/images/ecommerce.jpg', client: 'SwiftShop' }
  ],
  clients: [
    { id: 1, name: 'Nech Academy', logo: '/logos/academy.png' },
    { id: 2, name: 'Care Health', logo: '/logos/carehealth.png' },
    { id: 3, name: 'SwiftShop', logo: '/logos/swiftshop.png' }
  ],
  careers: [
    { id: 1, title: 'Frontend Developer (React)', department: 'Engineering', location: 'Remote / Chennai', type: 'Full-time', description: 'Looking for a skilled frontend engineer proficient in React, TS, and CSS transitions.' },
    { id: 2, title: 'Backend Developer (Node.js)', department: 'Engineering', location: 'Remote', type: 'Full-time', description: 'Seeking a Node.js specialist to design scalable APIs and manage database operations.' }
  ],
  blogPosts: [
    { id: 1, title: 'Why Startups Choose React + Node.js in 2026', content: 'In today\'s fast-paced tech landscape, startups require tools that facilitate rapid prototyping and clean scalability...', author: 'Nech Editorial', date: '2026-06-15' },
    { id: 2, title: 'Transitioning to a Secure DevSecOps Workflow', content: 'Security is no longer an afterthought. Implementing static scans, secure uploads, and role authorization is vital...', author: 'Security Team', date: '2026-06-10' }
  ],
  contactRequests: [],
  quoteRequests: [],
  admins: [
    { id: 1, username: 'admin', passwordHash: '$2a$10$gK7c5NKSxLZR99sZXfiqx.pzCwnEatqR.LZgIjquCPFqSDvDumha.' } // Password is 'admin123'
  ]
};

// Initialize file db if not exists
if (!fs.existsSync(MOCK_DB_PATH)) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(DEFAULT_DB_STATE, null, 2));
}

export function getMockData(): DBState {
  try {
    const data = fs.readFileSync(MOCK_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return DEFAULT_DB_STATE;
  }
}

export function saveMockData(data: DBState) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2));
}

// PostgreSQL setup (Optional connection if configuration exists)
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
  });
}

export async function query(text: string, params?: any[]): Promise<any> {
  if (pool) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (e) {
      console.error('PG query failed, falling back to mock database', e);
    }
  }

  // Fallback / Default file-based database logic
  const mockDb = getMockData();
  const lowerText = text.toLowerCase();

  // Simple parser mock for CRUD operations
  if (lowerText.includes('select * from services')) {
    return { rows: mockDb.services };
  } else if (lowerText.includes('select * from projects')) {
    return { rows: mockDb.projects };
  } else if (lowerText.includes('select * from clients')) {
    return { rows: mockDb.clients };
  } else if (lowerText.includes('select * from careers')) {
    return { rows: mockDb.careers };
  } else if (lowerText.includes('select * from blog_posts') || lowerText.includes('select * from blogposts')) {
    return { rows: mockDb.blogPosts };
  } else if (lowerText.includes('select * from contact_requests')) {
    return { rows: mockDb.contactRequests };
  } else if (lowerText.includes('select * from quote_requests')) {
    return { rows: mockDb.quoteRequests };
  } else if (lowerText.includes('select * from admins') && params && params.length > 0) {
    const admin = mockDb.admins.find(a => a.username === params[0]);
    return { rows: admin ? [admin] : [] };
  }

  return { rows: [] };
}

export async function initDb() {
  console.log('Database initialized successfully using JSON fallback store at', MOCK_DB_PATH);
}
