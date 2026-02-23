import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen bg-luxury-dark text-white flex flex-col items-center justify-center p-8 text-center font-sans tracking-widest">
                    <h1 className="text-4xl font-serif text-luxury-gold mb-6 uppercase">Something went wrong</h1>
                    <p className="text-sm text-luxury-text-gray max-w-lg mb-10 leading-relaxed uppercase">
                        We apologize for the inconvenience. Our system encountered an unexpected error while rendering this page.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-4 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors uppercase text-xs font-bold w-full max-w-xs"
                    >
                        Return to Homepage
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <div className="mt-16 text-left max-w-4xl w-full bg-black p-6 border border-red-900/50 overflow-x-auto">
                            <h2 className="text-red-500 font-bold mb-2">Developer Details:</h2>
                            <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap">
                                {this.state.error.toString()}
                                <br />
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
