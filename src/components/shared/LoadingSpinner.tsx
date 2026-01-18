interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizes = {
  sm: { spinner: 16, text: '0.625rem' },
  md: { spinner: 24, text: '0.75rem' },
  lg: { spinner: 32, text: '0.875rem' }
};

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const { spinner, text } = sizes[size];
  
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '0.5rem'
      }}
    >
      <svg
        width={spinner}
        height={spinner}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#2d3748"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="#00c3ff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {message && (
        <p style={{ color: '#8b949e', fontSize: text }}>
          {message}
        </p>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 14, 20, 0.8)',
        zIndex: 10
      }}
    >
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
}

export function SectionLoader({ message }: { message?: string }) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        backgroundColor: '#151b23',
        borderRadius: '4px'
      }}
    >
      <LoadingSpinner size="sm" message={message} />
    </div>
  );
}
