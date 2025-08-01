export function loadLinks() {
  return JSON.parse(localStorage.getItem('links') || '[]');
}
export function saveLinks(list) {
  localStorage.setItem('links', JSON.stringify(list));
}
