import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

const UPLOAD_DIR = path.join(__dirname, '../../uploads/resumes');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage configuration with random UUID naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = crypto.randomUUID() + ext;
    cb(null, uniqueName);
  }
});

export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow .pdf and .docx extensions
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || ext === '.docx') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

// Middleware to perform magic bytes inspection to confirm file is actually PDF or DOCX (ZIP format)
export async function validateResumeFile(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(4);
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);

    const hex = buffer.toString('hex').toUpperCase();
    const ext = path.extname(req.file.originalname).toLowerCase();

    let valid = false;
    if (ext === '.pdf' && hex === '25504446') { // %PDF
      valid = true;
    } else if (ext === '.docx' && hex === '504B0304') { // PK.. (Zip signature for DOCX)
      valid = true;
    }

    if (!valid) {
      // Delete malicious file immediately
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'File validation failed: Magic bytes do not match expected file type.' });
    }
    
    next();
  } catch (err) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return res.status(500).json({ error: 'Failed to validate uploaded file.' });
  }
}
