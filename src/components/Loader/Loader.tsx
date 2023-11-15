import React from 'react';
import './Loader.css';
import { LoaderProps } from './Loader.types';

export function Loader({ isLoading, children, variant = 'circle' }: LoaderProps) {
  const loaderClass = variant === 'dot' ? 'spinner-grow spinner-grow-sm' : 'spinner-border';

  return isLoading ? (
    <div className={loaderClass} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>{children}</>
  );
}
