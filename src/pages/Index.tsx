import React from 'react';
import { Users, BookOpen, GraduationCap, ClipboardList, TrendingUp, Calendar } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivity } from '../components/dashboard/RecentActivity';

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-display text-foreground mb-2">
          Welcome to UniCourse Management
        </h1>
        <p className="text-body text-text-secondary">
          Streamline your university operations with comprehensive student, course, and enrollment management.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Students"
          value="2,847"
          change={{ value: "+12.5%", type: "positive" }}
          icon={Users}
          description="Active enrollments"
        />
        <MetricCard
          title="Active Courses"
          value="156"
          change={{ value: "+3.2%", type: "positive" }}
          icon={BookOpen}
          description="This semester"
        />
        <MetricCard
          title="Faculty Members"
          value="89"
          change={{ value: "+5.1%", type: "positive" }}
          icon={GraduationCap}
          description="Teaching staff"
        />
        <MetricCard
          title="Enrollments"
          value="8,924"
          change={{ value: "+18.7%", type: "positive" }}
          icon={ClipboardList}
          description="Current semester"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">System Health</h3>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Server Uptime</span>
              <span className="text-sm font-medium text-success">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Response Time</span>
              <span className="text-sm font-medium">142ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Active Sessions</span>
              <span className="text-sm font-medium">1,247</span>
            </div>
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Avg. Class Size</span>
              <span className="text-sm font-medium">28.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Graduation Rate</span>
              <span className="text-sm font-medium text-success">87.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Student-Faculty Ratio</span>
              <span className="text-sm font-medium">16:1</span>
            </div>
          </div>
        </div>

        <QuickActions />
      </div>

      {/* Activity and Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Registration Opens</p>
                  <p className="text-xs text-text-muted">Spring 2025 • Dec 15, 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Final Exams</p>
                  <p className="text-xs text-text-muted">Fall 2024 • Dec 12-19, 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Graduation Ceremony</p>
                  <p className="text-xs text-text-muted">Fall 2024 • Dec 21, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Notifications */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-success-light rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-success font-medium">System Updated</p>
                  <p className="text-xs text-success opacity-80">Database optimization completed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-violet-soft rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-primary font-medium">New Features</p>
                  <p className="text-xs text-primary opacity-80">Enhanced analytics dashboard available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
