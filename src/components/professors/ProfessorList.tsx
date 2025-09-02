import React, { useState } from 'react';
import { Search, Filter, Plus, UserCheck, BookOpen, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Professor {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialty: string[];
  hireDate: string;
  teachingLoad: number;
  maxLoad: number;
  currentCourses: string[];
  status: 'active' | 'sabbatical' | 'retired';
  profileImage?: string;
}

const mockProfessors: Professor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    specialty: ['Algorithms', 'Machine Learning', 'Data Structures'],
    hireDate: '2018-08-15',
    teachingLoad: 3,
    maxLoad: 4,
    currentCourses: ['CS-301', 'CS-401', 'CS-205'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Mathematics',
    specialty: ['Calculus', 'Linear Algebra', 'Statistics'],
    hireDate: '2015-01-20',
    teachingLoad: 4,
    maxLoad: 4,
    currentCourses: ['MATH-201', 'MATH-301', 'MATH-101', 'STAT-205'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Biology',
    specialty: ['Molecular Biology', 'Genetics', 'Biochemistry'],
    hireDate: '2020-08-15',
    teachingLoad: 2,
    maxLoad: 4,
    currentCourses: ['BIO-101', 'BIO-301'],
    status: 'active'
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    email: 'david.kim@university.edu',
    phone: '+1 (555) 456-7890',
    department: 'Physics',
    specialty: ['Classical Mechanics', 'Quantum Physics', 'Thermodynamics'],
    hireDate: '2012-08-15',
    teachingLoad: 0,
    maxLoad: 4,
    currentCourses: [],
    status: 'sabbatical'
  },
  {
    id: '5',
    name: 'Dr. Amanda Wilson',
    email: 'amanda.wilson@university.edu',
    phone: '+1 (555) 567-8901',
    department: 'Chemistry',
    specialty: ['Organic Chemistry', 'Analytical Chemistry'],
    hireDate: '2019-01-10',
    teachingLoad: 3,
    maxLoad: 4,
    currentCourses: ['CHEM-101', 'CHEM-201', 'CHEM-301'],
    status: 'active'
  }
];

export function ProfessorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProfessors = mockProfessors.filter(professor => {
    const matchesSearch = professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === 'all' || professor.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || professor.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: Professor['status']) => {
    switch (status) {
      case 'active':
        return 'status-badge success';
      case 'sabbatical':
        return 'status-badge warning';
      case 'retired':
        return 'status-badge error';
      default:
        return 'status-badge info';
    }
  };

  const getLoadIndicator = (professor: Professor) => {
    const percentage = (professor.teachingLoad / professor.maxLoad) * 100;
    let colorClass = 'bg-success';
    
    if (percentage >= 90) colorClass = 'bg-destructive';
    else if (percentage >= 75) colorClass = 'bg-warning';
    
    return { percentage, colorClass };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">Faculty</h1>
          <p className="text-body text-text-secondary mt-1">
            Manage faculty members, teaching assignments, and academic expertise
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Professor
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
                placeholder="Search professors by name, department, or specialty..."
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
              <option value="Chemistry">Chemistry</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="sabbatical">Sabbatical</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Professors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfessors.map((professor) => {
          const loadIndicator = getLoadIndicator(professor);
          
          return (
            <div key={professor.id} className="card-elevated p-6 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">
                      {professor.name.split(' ').slice(-1)[0].substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{professor.name}</h3>
                    <p className="text-sm text-text-secondary">{professor.department}</p>
                  </div>
                </div>
                <span className={getStatusBadge(professor.status)}>
                  {professor.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{professor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Phone className="w-3 h-3" />
                  <span>{professor.phone}</span>
                </div>
              </div>

              {/* Teaching Load */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Teaching Load</span>
                  <span className="text-sm font-medium">
                    {professor.teachingLoad}/{professor.maxLoad} courses
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`h-full ${loadIndicator.colorClass} transition-all duration-500`}
                    style={{ width: `${loadIndicator.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {professor.specialty.slice(0, 3).map((specialty) => (
                    <span key={specialty} className="text-xs bg-gradient-violet-soft text-primary px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                  {professor.specialty.length > 3 && (
                    <span className="text-xs bg-surface text-text-secondary px-2 py-1 rounded">
                      +{professor.specialty.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Current Courses */}
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">Current Courses</p>
                {professor.currentCourses.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {professor.currentCourses.slice(0, 3).map((course) => (
                      <span key={course} className="text-xs bg-surface text-foreground px-2 py-1 rounded font-mono">
                        {course}
                      </span>
                    ))}
                    {professor.currentCourses.length > 3 && (
                      <span className="text-xs bg-surface text-text-secondary px-2 py-1 rounded">
                        +{professor.currentCourses.length - 3} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted italic">No current assignments</p>
                )}
              </div>

              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="text-xs text-text-muted">
                  Hired: {new Date(professor.hireDate).toLocaleDateString()}
                </span>
                <Button variant="ghost" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProfessors.length === 0 && (
        <div className="card-elevated p-12 text-center">
          <UserCheck className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No professors found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || selectedDepartment !== 'all' || selectedStatus !== 'all'
              ? 'Try adjusting your search criteria' 
              : 'Get started by adding your first faculty member'
            }
          </p>
          {!searchTerm && selectedDepartment === 'all' && selectedStatus === 'all' && (
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add First Professor
            </Button>
          )}
        </div>
      )}
    </div>
  );
}