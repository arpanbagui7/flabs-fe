import React, { Component } from "react";
import { Result } from "antd";
import {
  IErrorBoundaryProps,
  ErrorBoundaryState,
} from "@/interface/error.interface";

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Result status='500' title='Something went wrong. Please try again' />
      );
    }
    return this.props.children;
  }
}
