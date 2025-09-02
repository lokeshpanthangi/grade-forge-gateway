import React from 'react';
import { Clock, User, BookOpen, UserCheck } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'enrollment' | 'student' | 'course' | 'professor';
  message: string;
  timestamp: string;
  user?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'enrollment',
    message: 'Sarah Johnson enrolled in Advanced Calculus',
    timestamp: '2 minutes ago',
    user: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'student',
    message: 'New student Michael Chen registered',
    timestamp: '15 minutes ago',
    user: 'Michael Chen'
  },
  {
    id: '3',
    type: 'course',
    message: 'Physics 201 capacity increased to 45 students',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'professor',
    message: 'Dr. Amanda Wilson assigned to Biology 101',
    timestamp: '2 hours ago',
    user: 'Dr. Amanda Wilson'
  },
  {
    id: '5',
    type: 'enrollment',
    message: 'Alex Rodriguez completed enrollment for semester',
    timestamp: '3 hours ago',
    user: 'Alex Rodriguez'
  }
];

export function RecentActivity() {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'enrollment':
        return BookOpen;
      case 'student':
        return User;
      case 'course':
        return BookOpen;
      case 'professor':
        return UserCheck;
      default:
        return Clock;
    }
  };

  const getIconBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'enrollment':
        return 'bg-primary/10 text-primary';
      case 'student':
        return 'bg-success/10 text-success';
      case 'course':
        return 'bg-warning/10 text-warning-foreground';
      case 'professor':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-surface text-text-secondary';
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Clock className="w-5 h-5 text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3 group hover:bg-surface rounded-lg p-2 -m-2 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {activity.message}
                </p>
                <p className="text-xs text-text-muted mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary-hover font-medium transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
}