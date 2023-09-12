import { ReactNode } from "react";

export type IError = {
  error: unknown;
};

export type IErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
