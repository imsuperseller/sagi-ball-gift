'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StatTileProps {
  label: string;
  value: string | number;
  delta?: string;
  children?: React.ReactNode;
}

export function StatTile({ label, value, delta, children }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden rounded-2xl shadow-card border border-pitch/10 hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-striped-pitch pointer-events-none opacity-30" />
        <CardContent className="relative p-6 text-right">
          <div className="text-sm text-muted-foreground font-medium">{label}</div>
          <div className="mt-2 text-3xl font-bold text-foreground">{value}</div>
          {delta && (
            <div className="mt-1 text-xs text-pitch font-medium flex items-center gap-1 justify-end">
              <span>↑ {delta}</span>
            </div>
          )}
          {children && <div className="mt-4">{children}</div>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
