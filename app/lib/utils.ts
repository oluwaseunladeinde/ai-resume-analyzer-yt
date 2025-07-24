/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 * @param bytes - The file size in bytes
 * @returns A formatted string representing the file size with appropriate unit
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  // Determine the appropriate unit by calculating the logarithm
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Format the number with 2 decimal places and return with the unit
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const generateUUID = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Fallback for environments without crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
       const r = Math.random() * 16 | 0;
       const v = c === 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
  };