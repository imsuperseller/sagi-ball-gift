'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-foreground mb-2 text-right">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground text-right">{subtitle}</p>}
      {actions && <div className="mt-4">{actions}</div>}
      <div className="h-px mt-4 bg-gradient-to-r from-pitch/30 via-accent/40 to-transparent rounded" />
    </div>
  );
}
