import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            padding: '2rem',
            backgroundColor: '#0d1117',
            border: '1px solid #f85149',
            borderRadius: '8px',
            margin: '1rem'
          }}
        >
          <div style={{ color: '#f85149', marginBottom: '1rem', fontSize: '1.5rem' }}>
            ⚠️
          </div>
          <h2 style={{ color: '#e6edf3', marginBottom: '0.5rem', fontSize: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#8b949e', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#238636',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Smaller inline error boundary for specific sections
export function SectionErrorFallback({ section }: { section: string }) {
  return (
    <div 
      style={{
        padding: '1rem',
        backgroundColor: '#151b23',
        border: '1px solid #2d3748',
        borderRadius: '4px',
        textAlign: 'center'
      }}
    >
      <p style={{ color: '#8b949e', fontSize: '0.75rem' }}>
        Failed to load {section}. Try refreshing.
      </p>
    </div>
  );
}
