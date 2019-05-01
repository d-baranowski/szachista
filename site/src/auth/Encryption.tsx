import crypto from "crypto";

interface IEncyrption {
    encrypt: (value: string) => string,
    decrypt: (value: string) => string
}

const key = process.env.REACT_APP_ENCRYPTION_KEY || "";
const ENCRYPTION_KEY: Buffer = Buffer.from(key); // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

class Encryption implements IEncyrption {
    encrypt(value: string) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(value);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt(value: string) {
        let textParts = value.split(':');

        let iv = new Buffer(textParts.shift() as string, 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

export default new Encryption();