
/**
 * Generates a random alphanumeric ID with the ELCODERS protocol
 * @param length The length of the ID to generate (default: 8)
 * @returns A random ID string with ELCODERS prefix
 */
export const generateRandomId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const prefix = 'EL';
  let result = prefix;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Generates a unique transaction ID for EL ACCESS payments
 * @returns A transaction ID with format: ELTR-XXXXX-XXXXX
 */
export const generateTransactionId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let firstPart = '';
  let secondPart = '';
  
  for (let i = 0; i < 5; i++) {
    firstPart += characters.charAt(Math.floor(Math.random() * characters.length));
    secondPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `ELTR-${firstPart}-${secondPart}`;
};

/**
 * Generates a unique receipt ID for EL ACCESS payments
 * @returns A receipt ID with format: ELRC-XXXXXXXX
 */
export const generateReceiptId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  let randomPart = '';
  
  for (let i = 0; i < 4; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `ELRC-${timestamp}${randomPart}`;
};
