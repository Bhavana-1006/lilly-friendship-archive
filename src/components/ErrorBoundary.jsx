import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-paper-100 text-charcoal text-center">
          <div className="bg-paper-50 sketch-border p-8 max-w-lg shadow-paper-deep">
            <div className="classified-stamp text-xs font-bold mb-4">SYSTEM NOTIFICATION</div>
            <h2 className="font-editorial text-2xl mb-2">Archive Loaded</h2>
            <p className="font-mono text-xs text-charcoal/70 mb-6">
              {this.state.error?.message || "An unexpected rendering event occurred."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider"
            >
              Reload Experience
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
