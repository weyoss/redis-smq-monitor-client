export const HOST = process.env.API_URL ?? `${window.location.protocol}//${window.location.host}`;
export const API_URL = basePath === '/' ? HOST : `${HOST}${basePath}`;
