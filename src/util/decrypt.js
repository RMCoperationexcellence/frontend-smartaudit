import CryptoJS from 'crypto-js';

// Encryption function
export const encrypt = (text, secretKey) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decryption function
export const decrypt = (encryptedData, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error(`Error decrypting: ${error}`);
      return null; // or throw an error
    }
  };