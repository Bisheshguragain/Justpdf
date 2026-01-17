// Utility: File validation
export function validatePDF(file) {
  const maxSize = 25 * 1024 * 1024; // 25MB
  if (!file) return 'No file uploaded.';
  if (file.type !== 'application/pdf') return 'Only PDF files are allowed.';
  if (file.size > maxSize) return 'File size exceeds 25MB limit.';
  return null;
}
