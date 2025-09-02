import React, { useState } from 'react';
import { Search, Filter, Plus, BookOpen, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  department: string;
  credits: number;
  capacity: number;
  enrolled: number;
  professor: string;
  semester: string;
  prerequisites: string[];
  status: 'active' | 'inactive' | 'full';
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS-301',
    title: 'Advanced Algorithms',
    description: 'Study of advanced algorithmic techniques and data structures.',
    department: 'Computer Science',
    credits: 3,
    capacity: 30,
    enrolled: 28,
    professor: 'Dr. Sarah Johnson',
    semester: 'Fall 2024',
    prerequisites: ['CS-201', 'MATH-210'],
    status: 'active'
  },
  {
    id: '2',
    code: 'MATH-201',
    title: 'Calculus II',
    description: 'Continuation of differential and integral calculus.',
    department: 'Mathematics',
    credits: 4,
    capacity: 45,
    enrolled: 45,
    professor: 'Dr. Michael Chen',
    semester: 'Fall 2024',
    prerequisites: ['MATH-101'],
    status: 'full'
  },
  {
    id: '3',
    code: 'BIO-101',
    title: 'Introduction to Biology',
    description: 'Fundamental concepts in biological sciences.',
    department: 'Biology',
    credits: 3,
    capacity: 40,
    enrolled: 32,
    professor: 'Dr. Emily Rodriguez',
    semester: 'Fall 2024',
    prerequisites: [],
    status: 'active'
  },
  {
    id: '4',
    code: 'PHYS-201',
    title: 'Classical Mechanics',
    description: 'Study of motion, forces, and energy in classical physics.',
    department: 'Physics',
    credits: 4,
    capacity: 25,
    enrolled: 15,
    professor: 'Dr. David Kim',
    semester: 'Fall 2024',
    prerequisites: ['PHYS-101', 'MATH-201'],
    status: 'active'
  }
];

export function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getStatusBadge = (course: Course) => {
    if (course.status === 'full') {
      return 'status-badge error';
    }
    if (course.enrolled / course.capacity > 0.9) {
      return 'status-badge warning';
    }
    return 'status-badge success';
  };

  const getStatusText = (course: Course) => {
    if (course.status === 'full') return 'Full';
    if (course.enrolled / course.capacity > 0.9) return 'Nearly Full';
    return 'Available';
  };

  const getEnrollmentPercentage = (course: Course) => {
    return (course.enrolled / course.capacity) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">Courses</h1>
          <p className="text-body text-text-secondary mt-1">
            Manage course offerings, enrollment, and academic scheduling
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-surface rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              List
            </button>
          </div>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
              <Input
                placeholder="Search courses by title, code, or professor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {filteredCourses.map((course) => (
          <div key={course.id} className="card-elevated p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-mono text-primary bg-gradient-violet-soft px-2 py-1 rounded">
                    {course.code}
                  </span>
                  <span className={getStatusBadge(course)}>
                    {getStatusText(course)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                <p className="text-sm text-text-secondary">{course.department}</p>
              </div>
              <BookOpen className="w-5 h-5 text-text-muted" />
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Credits</span>
                <span className="text-sm font-medium">{course.credits}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Enrollment</span>
                  <span className="text-sm font-medium">{course.enrolled}/{course.capacity}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getEnrollmentPercentage(course)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Professor</span>
                <span className="text-sm font-medium">{course.professor}</span>
              </div>
            </div>

            {course.prerequisites.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-text-muted mb-2">Prerequisites:</p>
                <div className="flex flex-wrap gap-1">
                  {course.prerequisites.map((prereq) => (
                    <span key={prereq} className="text-xs bg-surface text-text-secondary px-2 py-1 rounded">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <div className="flex items-center space-x-4 text-xs text-text-muted">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{course.semester}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.enrolled} enrolled</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="card-elevated p-12 text-center">
          <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || selectedDepartment !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Get started by creating your first course'
            }
          </p>
          {!searchTerm && selectedDepartment === 'all' && (
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Create First Course
            </Button>
          )}
        </div>
      )}
    </div>
  );
}