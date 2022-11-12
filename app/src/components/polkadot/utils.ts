export function isChrome(): boolean {
  return navigator.userAgent.includes('Chrome/');
}

export function isFirefox(): boolean {
  return navigator.userAgent.includes('Firefox/');
}
