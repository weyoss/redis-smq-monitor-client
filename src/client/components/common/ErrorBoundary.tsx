import React, { ErrorInfo, PropsWithChildren } from 'react';

export interface ErrorBoundaryStateInterface {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<PropsWithChildren<{}>, ErrorBoundaryStateInterface> {
    state = { error: null, errorInfo: null };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        });
        // Report error here
    }

    render() {
        const { children } = this.props;
        if (this.state.errorInfo !== null) {
            const { componentStack } = (this.state.errorInfo as unknown) as ErrorInfo;
            const errorStr = ((this.state.error as unknown) as Error).toString();
            return (
                <>
                    <h2>Something went wrong.</h2>

                    <h3>Error</h3>
                    <pre>{errorStr}</pre>

                    <h3>ErrorInfo</h3>
                    <pre>{componentStack}</pre>
                </>
            );
        }
        return children;
    }
}
