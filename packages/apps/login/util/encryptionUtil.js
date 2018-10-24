import crypto from 'crypto';

const secret = '4tt3nbor0ughW1thD0ug1454nD4242a70092c4ce';
const algorithm = 'aes-128-ecb';

const toBase64 = string => Buffer.from(string, 'utf8').toString('base64');

const fromBase64 = string => Buffer.from(string, 'base64').toString('utf8');

const encrypt = string => {
  const cipher = crypto.createCipheriv(algorithm, secret);
  let encrypted = cipher.update(string, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return toBase64(encrypted);
};

const decrypt = string => {
  const decipher = crypto.createDecipher(algorithm, secret);
  let dec = decipher.update(string, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return fromBase64(dec);
};

export { encrypt, decrypt, };
