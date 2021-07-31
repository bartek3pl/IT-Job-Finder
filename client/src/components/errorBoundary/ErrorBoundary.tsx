import React, { Component } from 'react';
import styled from 'styled-components';
import routes from '@components/routing/routesStrings';

interface ErrorBoundaryState {
  hasError: boolean;
}

const StyledErrorBoundary = styled.div``;

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  timeout: any;

  interval: any;

  constructor(props: any) {
    super(props);
    this.timeout = null;
    this.interval = null;
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const { hasError } = this.state;
    if (hasError) {
      this.timeout = this.timer();
    }
    console.error(error);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  timer = () =>
    setTimeout(() => {
      window.location.replace(routes.login);
    }, 5000);

  handleRedirect = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.location.replace(routes.login);
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <StyledErrorBoundary>Error</StyledErrorBoundary>
    ) : (
      children || null
    );
  }
}

export default ErrorBoundary;
