export const HOST = process.env.API_URL ?? `${window.location.protocol}//${window.location.host}`;
export const BASE_PATH = basePath.replace(/\/+$/, '');
export const API_URL = `${HOST}${BASE_PATH}`;
