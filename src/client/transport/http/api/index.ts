export * from './delete-message';
export * from './get-messages';
export * from './purge-messages';
export * from './requeue-message';
export * from './namespaces';

export const API_URL = process.env.API_URL ?? '';

export interface IHTTPResponse<T> {
    data: T;
}
