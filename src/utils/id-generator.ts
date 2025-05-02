
/**
 * Generates a random alphanumeric ID with a specified length
 * @param length The length of the ID to generate (default: 8)
 * @returns A random ID string
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
