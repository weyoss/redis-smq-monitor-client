export * from './delete-message';
export * from './get-messages';
export * from './purge-messages';
export * from './requeue-message';
export * from './namespaces';

export interface IHTTPResponse<T> {
    data: T;
}
