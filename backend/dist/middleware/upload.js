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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
exports.validateResumeFile = validateResumeFile;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const UPLOAD_DIR = path.join(__dirname, '../../uploads/resumes');
// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
// Multer storage configuration with random UUID naming
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = crypto.randomUUID() + ext;
        cb(null, uniqueName);
    }
});
exports.multerUpload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow .pdf and .docx extensions
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.pdf' || ext === '.docx') {
            cb(null, true);
        }
        else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    }
});
// Middleware to perform magic bytes inspection to confirm file is actually PDF or DOCX (ZIP format)
async function validateResumeFile(req, res, next) {
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
        }
        else if (ext === '.docx' && hex === '504B0304') { // PK.. (Zip signature for DOCX)
            valid = true;
        }
        if (!valid) {
            // Delete malicious file immediately
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: 'File validation failed: Magic bytes do not match expected file type.' });
        }
        next();
    }
    catch (err) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return res.status(500).json({ error: 'Failed to validate uploaded file.' });
    }
}
