// cryptoUtils.js

import CryptoJS from 'crypto-js';

// Encryption function
export const encrypt = (text, secretKey) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decryption function
export const decrypt = (encryptedText, secretKey) => {
    try {
        const bytes  = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        console.error('Error decrypting text:', error);
        return null;
    }
};
