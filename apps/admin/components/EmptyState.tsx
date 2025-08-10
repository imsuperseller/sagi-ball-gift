import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function EmptyState({ title = 'Nothing here yet', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <Card className="rounded-2xl border border-border/50">
      <CardContent className="py-10 text-center">
        <div className="text-lg font-medium">{title}</div>
        {subtitle && <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}
