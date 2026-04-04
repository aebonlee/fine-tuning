import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean; error: any }

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', padding: '40px 20px', textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--primary-blue)', marginBottom: '16px' }}>
            Oops!
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Something went wrong. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 32px', fontSize: '16px', fontWeight: 600,
              background: 'var(--primary-blue)', color: 'white', border: 'none',
              borderRadius: '12px', cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
