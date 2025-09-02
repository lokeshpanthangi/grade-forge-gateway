import React from 'react';
import { Plus , UserPlus, BookPlus, ClipboardPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const actions = [
    {
      label: "Add Student",
      icon: UserPlus,
      href: "/students/new",
      variant: "default" as const,
    },
    {
      label: "Create Course",
      icon: BookPlus,
      href: "/courses/new",
      variant: "secondary" as const,
    },
    {
      label: "New Enrollment",
      icon: ClipboardPlus,
      href: "/enrollments/new",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Plus className="w-5 h-5 text-text-secondary" />
      </div>
      
      <div className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="w-full justify-start space-x-3"
            onClick={() => {
              // For now, just log the action
              console.log(`Navigate to ${action.href}`);
            }}
          >
            <action.icon className="w-4 h-4" />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Create and manage university resources quickly
        </p>
      </div>
    </div>
  );
}