import { ErrorInfo } from 'react';

export interface ErrorBoundaryPropsInterface {}

export interface ErrorBoundaryStateInterface {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
