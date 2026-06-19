"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
exports.authMiddleware = authMiddleware;
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
// Resolution: Environment -> Local File Query -> Random Gen + Log
function getSecret() {
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
    }
    catch (err) {
        // ignore
    }
    return randomSecret;
}
exports.JWT_SECRET = getSecret();
function authMiddleware(req, res, next) {
    // Read token from cookie or Auth header
    let token = req.headers.authorization?.split(' ')[1];
    if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, val) => {
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
        const decoded = jwt.verify(token, exports.JWT_SECRET, { algorithms: ['HS256'] });
        req.adminId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
