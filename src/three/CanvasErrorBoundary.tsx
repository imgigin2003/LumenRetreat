import { Component, type ReactNode } from 'react';
import { CanvasFallback } from './CanvasFallback';

interface Props {
  children: ReactNode;
  fallbackLabel?: string;
}
interface State {
  hasError: boolean;
}

/** Catches WebGL / renderer errors and shows the calm gradient fallback. */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <CanvasFallback label={this.props.fallbackLabel} />;
    }
    return this.props.children;
  }
}
