import React, { useState } from 'react';
import { Check, ChevronDown, Download, Mail, Trash2, Edit, Archive, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BulkAction {
  id: string;
  label: string;
  icon: React.ElementType;
  variant?: 'default' | 'destructive' | 'secondary';
  requiresConfirmation?: boolean;
}

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onAction: (actionId: string) => void;
  actions: BulkAction[];
}

const defaultActions: BulkAction[] = [
  { id: 'export', label: 'Export Selected', icon: Download, variant: 'secondary' },
  { id: 'email', label: 'Send Email', icon: Mail, variant: 'default' },
  { id: 'edit', label: 'Bulk Edit', icon: Edit, variant: 'secondary' },
  { id: 'archive', label: 'Archive', icon: Archive, variant: 'secondary', requiresConfirmation: true },
  { id: 'delete', label: 'Delete', icon: Trash2, variant: 'destructive', requiresConfirmation: true }
];

export function BulkActions({ 
  selectedCount, 
  totalCount, 
  onSelectAll, 
  onClearSelection, 
  onAction, 
  actions = defaultActions 
}: BulkActionsProps) {
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleAction = (actionId: string, requiresConfirmation?: boolean) => {
    if (requiresConfirmation) {
      setShowConfirmation(actionId);
    } else {
      onAction(actionId);
      setIsActionsOpen(false);
    }
  };

  const confirmAction = (actionId: string) => {
    onAction(actionId);
    setShowConfirmation(null);
    setIsActionsOpen(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="card-elevated p-4 border-l-4 border-l-primary animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-medium text-foreground">
                {selectedCount} of {totalCount} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectedCount < totalCount ? onSelectAll : onClearSelection}
              >
                {selectedCount < totalCount ? 'Select All' : 'Clear Selection'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClearSelection}>
                Clear
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <Button variant="outline" size="sm" onClick={() => handleAction('export')}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Actions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isActionsOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isActionsOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface-elevated border border-border rounded-lg shadow-lg z-50 animate-scale-in">
                  <div className="py-1">
                    {actions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAction(action.id, action.requiresConfirmation)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-surface transition-colors ${
                            action.variant === 'destructive' 
                              ? 'text-destructive hover:bg-destructive-light' 
                              : 'text-foreground'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar for Bulk Operations */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Ready to perform bulk operations</span>
            <span>{selectedCount} items selected</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-surface-elevated border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Action</h3>
            <p className="text-text-secondary mb-4">
              Are you sure you want to {actions.find(a => a.id === showConfirmation)?.label.toLowerCase()} {selectedCount} selected items? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowConfirmation(null)}>
                Cancel
              </Button>
              <Button
                variant={actions.find(a => a.id === showConfirmation)?.variant || 'default'}
                onClick={() => confirmAction(showConfirmation)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isActionsOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsActionsOpen(false)}
        />
      )}
    </>
  );
}