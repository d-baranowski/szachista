import Encryption from "./Encryption";

export default (secret: any): string => Encryption.encrypt(btoa(JSON.stringify(secret)));
