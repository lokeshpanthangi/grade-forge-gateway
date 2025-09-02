import React, { useState } from 'react';
import { Search, Plus, Users, BookOpen, Calendar, GraduationCap, Filter, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  enrollmentDate: string;
  status: 'enrolled' | 'waitlisted' | 'dropped' | 'completed';
  grade?: string;
  credits: number;
}

const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Sarah Johnson',
    courseId: '1',
    courseCode: 'CS-301',
    courseTitle: 'Advanced Algorithms',
    semester: 'Fall 2024',
    enrollmentDate: '2024-08-15',
    status: 'enrolled',
    credits: 3
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Michael Chen',
    courseId: '2',
    courseCode: 'MATH-201',
    courseTitle: 'Calculus II',
    semester: 'Fall 2024',
    enrollmentDate: '2024-08-16',
    status: 'enrolled',
    credits: 4
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Emily Rodriguez',
    courseId: '3',
    courseCode: 'BIO-101',
    courseTitle: 'Introduction to Biology',
    semester: 'Fall 2024',
    enrollmentDate: '2024-08-17',
    status: 'enrolled',
    credits: 3
  },
  {
    id: '4',
    studentId: '1',
    studentName: 'Sarah Johnson',
    courseId: '4',
    courseCode: 'PHYS-201',
    courseTitle: 'Classical Mechanics',
    semester: 'Fall 2024',
    enrollmentDate: '2024-08-18',
    status: 'waitlisted',
    credits: 4
  },
  {
    id: '5',
    studentId: '4',
    studentName: 'David Kim',
    courseId: '2',
    courseCode: 'MATH-201',
    courseTitle: 'Calculus II',
    semester: 'Spring 2024',
    enrollmentDate: '2024-01-15',
    status: 'completed',
    grade: 'A',
    credits: 4
  }
];

export function EnrollmentManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'by-student' | 'by-course'>('all');

  const filteredEnrollments = mockEnrollments.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || enrollment.status === selectedStatus;
    const matchesSemester = selectedSemester === 'all' || enrollment.semester === selectedSemester;
    
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const getStatusBadge = (status: Enrollment['status']) => {
    switch (status) {
      case 'enrolled':
        return 'status-badge success';
      case 'waitlisted':
        return 'status-badge warning';
      case 'dropped':
        return 'status-badge error';
      case 'completed':
        return 'status-badge info';
      default:
        return 'status-badge info';
    }
  };

  const getGradeBadge = (grade?: string) => {
    if (!grade) return null;
    
    const gradeColors: Record<string, string> = {
      'A': 'bg-success text-success-foreground',
      'A-': 'bg-success text-success-foreground',
      'B+': 'bg-primary text-primary-foreground',
      'B': 'bg-primary text-primary-foreground',
      'B-': 'bg-primary text-primary-foreground',
      'C+': 'bg-warning text-warning-foreground',
      'C': 'bg-warning text-warning-foreground',
      'C-': 'bg-warning text-warning-foreground',
      'D': 'bg-destructive text-destructive-foreground',
      'F': 'bg-destructive text-destructive-foreground'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${gradeColors[grade] || 'bg-surface text-text-secondary'}`}>
        {grade}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">Enrollments</h1>
          <p className="text-body text-text-secondary mt-1">
            Manage student course enrollments, waitlists, and academic records
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            New Enrollment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Enrollments</p>
              <p className="text-2xl font-bold text-primary">8,924</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-20" />
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Active Students</p>
              <p className="text-2xl font-bold text-success">2,847</p>
            </div>
            <GraduationCap className="w-8 h-8 text-success opacity-20" />
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Waitlisted</p>
              <p className="text-2xl font-bold text-warning">127</p>
            </div>
            <Calendar className="w-8 h-8 text-warning opacity-20" />
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Completion Rate</p>
              <p className="text-2xl font-bold text-primary">94.2%</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-elevated p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
              <Input
                placeholder="Search by student name, course code, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="enrolled">Enrolled</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="dropped">Dropped</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Semesters</option>
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
              <option value="Summer 2024">Summer 2024</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
          <span className="text-sm font-medium text-text-secondary">View by:</span>
          <div className="flex items-center bg-surface rounded-lg p-1">
            {(['all', 'by-student', 'by-course'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === mode 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {mode === 'all' ? 'All' : mode === 'by-student' ? 'Student' : 'Course'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollments List */}
      <div className="card-elevated">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Student</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Course</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Semester</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Grade</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Credits</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Enrolled</th>
                <th className="text-right p-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment, index) => (
                <tr key={enrollment.id} className={`border-t border-border hover:bg-surface transition-colors ${index % 2 === 0 ? 'bg-surface-elevated' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground">
                          {enrollment.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{enrollment.studentName}</p>
                        <p className="text-xs text-text-muted">ID: {enrollment.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{enrollment.courseCode}</p>
                      <p className="text-xs text-text-muted">{enrollment.courseTitle}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{enrollment.semester}</span>
                  </td>
                  <td className="p-4">
                    <span className={getStatusBadge(enrollment.status)}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {getGradeBadge(enrollment.grade) || (
                      <span className="text-sm text-text-muted">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{enrollment.credits}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text-muted">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredEnrollments.length === 0 && (
        <div className="card-elevated p-12 text-center">
          <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No enrollments found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || selectedStatus !== 'all' || selectedSemester !== 'all'
              ? 'Try adjusting your search criteria' 
              : 'Get started by creating your first enrollment'
            }
          </p>
          {!searchTerm && selectedStatus === 'all' && selectedSemester === 'all' && (
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Create First Enrollment
            </Button>
          )}
        </div>
      )}
    </div>
  );
}