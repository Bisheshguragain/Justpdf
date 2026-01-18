// Utility: Rate limiting using LocalStorage and cookies
export function canDownload() {
  const now = Date.now();
  let data = JSON.parse(localStorage.getItem('jpdl') || '{}');
  if (!data.ts || now - data.ts > 24 * 60 * 60 * 1000) {
    data = { count: 0, ts: now };
  }
  if (data.count >= 3) return false;
  return true;
}

export function recordDownload() {
  const now = Date.now();
  let data = JSON.parse(localStorage.getItem('jpdl') || '{}');
  if (!data.ts || now - data.ts > 24 * 60 * 60 * 1000) {
    data = { count: 0, ts: now };
  }
  data.count = (data.count || 0) + 1;
  localStorage.setItem('jpdl', JSON.stringify(data));
  // Fallback to cookies
  document.cookie = `jpdl=${JSON.stringify(data)};max-age=86400;path=/`;
}

export function getDownloadCount() {
  let data = JSON.parse(localStorage.getItem('jpdl') || '{}');
  return data.count || 0;
}
