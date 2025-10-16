import React, { Component, ErrorInfo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    const { t } = useTranslation();

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-base mb-4">
              {t('error.title', 'Kaut kas nogāja greizi')}
            </h2>
            <p className="text-text-muted mb-6">
              {t('error.description', 'Diemžēl radās neparedzēta kļūda. Lūdzu, mēģiniet vēlreiz.')}
            </p>
            <button
              onClick={this.handleReload}
              className="px-4 py-2 bg-primary text-background rounded-lg font-medium 
                       hover:bg-primary/90 transition-colors 
                       focus:outline-none focus-visible:ring-2 
                       focus-visible:ring-primary focus-visible:ring-offset-2 
                       focus-visible:ring-offset-background"
            >
              {t('error.reload', 'Pārlādēt lapu')}
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-6 p-4 bg-surface rounded-lg text-left text-sm text-text-muted overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;