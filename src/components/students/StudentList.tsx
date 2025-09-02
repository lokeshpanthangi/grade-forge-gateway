import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  year: number;
  gpa: number;
  status: 'active' | 'inactive' | 'probation';
  credits: number;
  enrollmentDate: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    major: 'Computer Science',
    year: 3,
    gpa: 3.8,
    status: 'active',
    credits: 89,
    enrollmentDate: '2022-08-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    major: 'Mathematics',
    year: 2,
    gpa: 3.6,
    status: 'active',
    credits: 54,
    enrollmentDate: '2023-01-20'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    major: 'Biology',
    year: 4,
    gpa: 2.1,
    status: 'probation',
    credits: 110,
    enrollmentDate: '2021-08-15'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@university.edu',
    major: 'Physics',
    year: 1,
    gpa: 3.9,
    status: 'active',
    credits: 28,
    enrollmentDate: '2024-08-15'
  }
];

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return 'status-badge success';
      case 'probation':
        return 'status-badge error';
      case 'inactive':
        return 'status-badge warning';
      default:
        return 'status-badge info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">Students</h1>
          <p className="text-body text-text-secondary mt-1">
            Manage and monitor student information and academic progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
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
                placeholder="Search students by name, email, or major..."
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
              <option value="active">Active</option>
              <option value="probation">Probation</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card-elevated p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{student.name}</h3>
                  <p className="text-sm text-text-secondary">{student.major}</p>
                </div>
              </div>
              <span className={getStatusBadge(student.status)}>
                {student.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Year</span>
                <span className="text-sm font-medium">{student.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">GPA</span>
                <span className="text-sm font-medium">{student.gpa.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Credits</span>
                <span className="text-sm font-medium">{student.credits}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <span className="text-xs text-text-muted">
                Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
              </span>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="card-elevated p-12 text-center">
          <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || selectedStatus !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Get started by adding your first student'
            }
          </p>
          {!searchTerm && selectedStatus === 'all' && (
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add First Student
            </Button>
          )}
        </div>
      )}
    </div>
  );
}