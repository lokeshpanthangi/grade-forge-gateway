import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon: LucideIcon;
  description?: string;
}

export function MetricCard({ title, value, change, icon: Icon, description }: MetricCardProps) {
  return (
    <div className="card-elevated p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {description && (
            <p className="text-xs text-text-muted">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-violet-soft rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      {change && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                change.type === 'positive' 
                  ? 'bg-success-light text-success' 
                  : change.type === 'negative'
                  ? 'bg-destructive-light text-destructive'
                  : 'bg-surface text-text-secondary'
              }`}
            >
              {change.value}
            </span>
            <span className="text-xs text-text-muted">from last month</span>
          </div>
        </div>
      )}
    </div>
  );
}