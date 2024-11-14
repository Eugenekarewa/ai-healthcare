const crypto = require("crypto");

// Encrypt data using a secret key
export const encryptData = (data: string): string => {
  const algorithm = 'aes-256-ctr'; // Encryption algorithm
  const secretKey = process.env.SECRET_KEY || 'your-secret-key'; // You should store your key securely
  const iv = crypto.randomBytes(16); // Initialization vector for extra security

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

  // Return the IV and encrypted data, encoded as base64 strings
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Decrypt data using the same secret key
export const decryptData = (encryptedData: string): string => {
  const algorithm = 'aes-256-ctr';
  const secretKey = process.env.SECRET_KEY || 'your-secret-key';

  const [ivString, encryptedString] = encryptedData.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const encrypted = Buffer.from(encryptedString, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return decrypted.toString('utf8');
};
