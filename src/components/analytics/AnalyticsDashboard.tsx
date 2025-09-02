import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, GraduationCap, Download, Calendar, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChartData {
  name: string;
  value: number;
  students?: number;
  courses?: number;
  gpa?: number;
}

const enrollmentTrendsData: ChartData[] = [
  { name: 'Jan', value: 2400, students: 2400 },
  { name: 'Feb', value: 2600, students: 2600 },
  { name: 'Mar', value: 2800, students: 2800 },
  { name: 'Apr', value: 2700, students: 2700 },
  { name: 'May', value: 2900, students: 2900 },
  { name: 'Jun', value: 3100, students: 3100 },
  { name: 'Jul', value: 2950, students: 2950 },
  { name: 'Aug', value: 3200, students: 3200 },
  { name: 'Sep', value: 3400, students: 3400 },
  { name: 'Oct', value: 3300, students: 3300 },
  { name: 'Nov', value: 3500, students: 3500 },
  { name: 'Dec', value: 3450, students: 3450 }
];

const departmentData: ChartData[] = [
  { name: 'Computer Science', value: 890, students: 890, courses: 45 },
  { name: 'Mathematics', value: 720, students: 720, courses: 38 },
  { name: 'Biology', value: 650, students: 650, courses: 32 },
  { name: 'Physics', value: 420, students: 420, courses: 28 },
  { name: 'Chemistry', value: 380, students: 380, courses: 25 },
  { name: 'English', value: 340, students: 340, courses: 22 }
];

const gpaDistributionData: ChartData[] = [
  { name: '3.5-4.0', value: 35, gpa: 3.75 },
  { name: '3.0-3.4', value: 28, gpa: 3.2 },
  { name: '2.5-2.9', value: 22, gpa: 2.7 },
  { name: '2.0-2.4', value: 12, gpa: 2.2 },
  { name: '1.5-1.9', value: 2, gpa: 1.7 },
  { name: 'Below 1.5', value: 1, gpa: 1.2 }
];

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">Analytics Dashboard</h1>
          <p className="text-body text-text-secondary mt-1">
            Comprehensive insights into enrollment trends, performance metrics, and institutional analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="form-input w-auto"
            >
              <option value="semester">Current Semester</option>
              <option value="year">Academic Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Departments</option>
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
              <option value="biology">Biology</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Enrollment Growth</p>
              <p className="text-3xl font-bold text-success">+18.7%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-success opacity-20" />
          </div>
          <p className="text-xs text-text-muted">Compared to last semester</p>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Average GPA</p>
              <p className="text-3xl font-bold text-primary">3.24</p>
            </div>
            <BarChart3 className="w-10 h-10 text-primary opacity-20" />
          </div>
          <p className="text-xs text-text-muted">Institution-wide average</p>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Course Completion</p>
              <p className="text-3xl font-bold text-success">94.2%</p>
            </div>
            <BookOpen className="w-10 h-10 text-success opacity-20" />
          </div>
          <p className="text-xs text-text-muted">Success rate this semester</p>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Student Satisfaction</p>
              <p className="text-3xl font-bold text-primary">4.1/5</p>
            </div>
            <Users className="w-10 h-10 text-primary opacity-20" />
          </div>
          <p className="text-xs text-text-muted">Based on course evaluations</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrollment Trends Chart */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Enrollment Trends</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            {enrollmentTrendsData.slice(-6).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${(item.value / 3500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-primary w-12 text-right">
                    {item.students?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Department Enrollment</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{dept.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">{dept.courses} courses</span>
                    <span className="text-sm font-semibold text-primary">{dept.students}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(dept.students! / 890) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GPA Distribution and Course Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* GPA Distribution */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">GPA Distribution</h3>
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-3">
            {gpaDistributionData.map((range) => (
              <div key={range.name} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{range.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${range.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-primary w-8 text-right">
                    {range.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Top Courses</h3>
            <BookOpen className="w-5 h-5 text-success" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
              <div>
                <p className="text-sm font-medium text-success">CS-301</p>
                <p className="text-xs text-success opacity-80">Advanced Algorithms</p>
              </div>
              <span className="text-sm font-bold text-success">4.8/5</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <div>
                <p className="text-sm font-medium text-primary">MATH-201</p>
                <p className="text-xs text-primary opacity-80">Calculus II</p>
              </div>
              <span className="text-sm font-bold text-primary">4.6/5</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-violet-soft rounded-lg">
              <div>
                <p className="text-sm font-medium text-primary">BIO-101</p>
                <p className="text-xs text-primary opacity-80">Intro to Biology</p>
              </div>
              <span className="text-sm font-bold text-primary">4.5/5</span>
            </div>
          </div>
        </div>

        {/* Faculty Performance */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Faculty Stats</h3>
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-violet-soft rounded-lg">
              <p className="text-2xl font-bold text-primary">89</p>
              <p className="text-sm text-primary opacity-80">Total Faculty</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-success-light rounded-lg">
                <p className="text-lg font-bold text-success">76</p>
                <p className="text-xs text-success opacity-80">Active</p>
              </div>
              <div className="text-center p-3 bg-warning-light rounded-lg">
                <p className="text-lg font-bold text-warning-foreground">13</p>
                <p className="text-xs text-warning-foreground opacity-80">Sabbatical</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Avg Teaching Load</span>
                <span className="text-sm font-medium text-foreground">3.2/4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="card-elevated p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Key Insights & Recommendations</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-success-light rounded-lg">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-success mb-1">Strong Enrollment Growth</h4>
                <p className="text-xs text-success opacity-80">
                  18.7% increase in enrollments indicates successful recruitment and retention strategies.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-violet-soft rounded-lg">
            <div className="flex items-start space-x-3">
              <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-primary mb-1">High Academic Performance</h4>
                <p className="text-xs text-primary opacity-80">
                  94.2% course completion rate demonstrates effective academic support systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}