import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as crypto from 'crypto';

// Resolution: Environment -> Local File Query -> Random Gen + Log
function getSecret(): string {
  if (process.env.JWT_SECRET_KEY) {
    return process.env.JWT_SECRET_KEY;
  }
  const secretFilePath = './jwt_secret.txt';
  if (fs.existsSync(secretFilePath)) {
    return fs.readFileSync(secretFilePath, 'utf-8').trim();
  }
  console.warn("Generating ephemeral secret. Instance-isolated!");
  const randomSecret = crypto.randomBytes(32).toString('hex');
  try {
    fs.writeFileSync(secretFilePath, randomSecret);
  } catch (err) {
    // ignore
  }
  return randomSecret;
}

export const JWT_SECRET = getSecret();

export interface AuthenticatedRequest extends Request {
  adminId?: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Read token from cookie or Auth header
  let token = req.headers.authorization?.split(' ')[1];
  
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc: any, val) => {
      const parts = val.split('=');
      acc[parts[0].trim()] = parts[1]?.trim();
      return acc;
    }, {});
    token = cookies['admin-token'];
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access token missing' });
  }

  try {
    // Verify JWT with a hardcoded algorithm list (HS256) to prevent algorithm confusion attacks
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as any;
    (req as AuthenticatedRequest).adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}
