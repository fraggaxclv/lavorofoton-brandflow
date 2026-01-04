import { useState, useCallback } from 'react';

// Rate limiting storage (persisted in memory - resets on page reload)
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {};

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number; // in milliseconds
  key: string;
}

interface FileValidationConfig {
  maxSizeMB: number;
  allowedTypes: string[];
  allowedMimeTypes: string[];
}

interface UseFormSecurityReturn {
  // Honeypot
  honeypotValue: string;
  setHoneypotValue: (value: string) => void;
  isHoneypotTriggered: () => boolean;
  
  // Rate limiting
  checkRateLimit: () => { allowed: boolean; remainingAttempts: number; resetInSeconds: number };
  incrementRateLimit: () => void;
  
  // File validation
  validateFile: (file: File) => { valid: boolean; error?: string };
  
  // Combined validation
  canSubmit: () => { allowed: boolean; error?: string };
}

export function useFormSecurity(
  rateLimitConfig: RateLimitConfig,
  fileValidationConfig?: FileValidationConfig
): UseFormSecurityReturn {
  const [honeypotValue, setHoneypotValue] = useState('');
  
  // Honeypot detection - if filled, it's a bot
  const isHoneypotTriggered = useCallback(() => {
    return honeypotValue.length > 0;
  }, [honeypotValue]);
  
  // Rate limiting
  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const stored = rateLimitStore[rateLimitConfig.key];
    
    if (!stored || now > stored.resetTime) {
      return {
        allowed: true,
        remainingAttempts: rateLimitConfig.maxAttempts,
        resetInSeconds: 0
      };
    }
    
    const remainingAttempts = rateLimitConfig.maxAttempts - stored.count;
    const resetInSeconds = Math.ceil((stored.resetTime - now) / 1000);
    
    return {
      allowed: remainingAttempts > 0,
      remainingAttempts: Math.max(0, remainingAttempts),
      resetInSeconds
    };
  }, [rateLimitConfig]);
  
  const incrementRateLimit = useCallback(() => {
    const now = Date.now();
    const stored = rateLimitStore[rateLimitConfig.key];
    
    if (!stored || now > stored.resetTime) {
      rateLimitStore[rateLimitConfig.key] = {
        count: 1,
        resetTime: now + rateLimitConfig.windowMs
      };
    } else {
      rateLimitStore[rateLimitConfig.key].count++;
    }
  }, [rateLimitConfig]);
  
  // File validation with real MIME type checking
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    if (!fileValidationConfig) {
      return { valid: true };
    }
    
    // Check file size
    const maxSizeBytes = fileValidationConfig.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return { 
        valid: false, 
        error: `Arquivo muito grande. Máximo permitido: ${fileValidationConfig.maxSizeMB}MB` 
      };
    }
    
    // Check file extension
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop() || '';
    const allowedExtensions = fileValidationConfig.allowedTypes.map(t => t.toLowerCase().replace('.', ''));
    
    if (!allowedExtensions.includes(extension)) {
      return { 
        valid: false, 
        error: `Tipo de arquivo não permitido. Tipos aceitos: ${fileValidationConfig.allowedTypes.join(', ')}` 
      };
    }
    
    // Check MIME type
    const mimeType = file.type.toLowerCase();
    const isValidMime = fileValidationConfig.allowedMimeTypes.some(allowed => {
      // Handle wildcards like 'image/*'
      if (allowed.endsWith('/*')) {
        const prefix = allowed.replace('/*', '/');
        return mimeType.startsWith(prefix);
      }
      return mimeType === allowed;
    });
    
    if (!isValidMime && mimeType !== '') {
      return { 
        valid: false, 
        error: `Tipo MIME inválido detectado. Este arquivo pode não ser o que parece.` 
      };
    }
    
    return { valid: true };
  }, [fileValidationConfig]);
  
  // Combined validation
  const canSubmit = useCallback(() => {
    // Check honeypot
    if (isHoneypotTriggered()) {
      // Silently reject bot submissions
      return { allowed: false, error: 'Erro ao enviar formulário. Tente novamente.' };
    }
    
    // Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      const minutes = Math.ceil(rateCheck.resetInSeconds / 60);
      return { 
        allowed: false, 
        error: `Muitas tentativas. Aguarde ${minutes} minuto(s) antes de tentar novamente.` 
      };
    }
    
    return { allowed: true };
  }, [isHoneypotTriggered, checkRateLimit]);
  
  return {
    honeypotValue,
    setHoneypotValue,
    isHoneypotTriggered,
    checkRateLimit,
    incrementRateLimit,
    validateFile,
    canSubmit
  };
}

// Validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  // Brazilian phone format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  const phoneRegex = /^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const sanitizeInput = (input: string): string => {
  // Remove potential script tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
};
