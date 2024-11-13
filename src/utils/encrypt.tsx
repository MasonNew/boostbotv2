import CryptoJS from "crypto-js";

const passphrase = "strong_pumpit_phrase";

export const encryptWithAES = (text: string) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
