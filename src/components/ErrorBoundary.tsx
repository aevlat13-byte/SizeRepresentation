import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  override componentDidCatch(error: Error) {
    // Keep console logging so teachers/devs can inspect browser devtools.
    console.error('Pixel Byte Quest crashed:', error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', padding: '1rem', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#67e8f9' }}>Pixel Byte Quest failed to load</h1>
          <p>
            The app hit a runtime error. Please open browser DevTools Console for details.
          </p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#1e293b', padding: '0.75rem', borderRadius: '0.5rem' }}>
            {this.state.message || 'Unknown runtime error'}
          </pre>
        </main>
      );
    }

    return this.props.children;
  }
}
