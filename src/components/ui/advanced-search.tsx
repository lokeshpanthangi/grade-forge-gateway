import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Calendar, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFilter {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'range';
  options?: { value: string; label: string; }[];
  value: any;
}

interface AdvancedSearchProps {
  onSearch: (filters: Record<string, any>) => void;
  filters: SearchFilter[];
  placeholder?: string;
}

export function AdvancedSearch({ onSearch, filters, placeholder = "Search..." }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [savedSearches, setSavedSearches] = useState<string[]>(['Computer Science Students', 'Fall 2024 Enrollments']);

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = { ...activeFilters, [filterId]: value };
    setActiveFilters(newFilters);
    onSearch({ searchTerm, ...newFilters });
  };

  const clearFilter = (filterId: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterId];
    setActiveFilters(newFilters);
    onSearch({ searchTerm, ...newFilters });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    onSearch({});
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Name this search:');
    if (searchName) {
      setSavedSearches([...savedSearches, searchName]);
    }
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="card-elevated p-6 space-y-4">
      {/* Main Search Bar */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch({ searchTerm: e.target.value, ...activeFilters });
            }}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center space-x-2 ${activeFilterCount > 0 ? 'border-primary text-primary' : ''}`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterId, value]) => {
            const filter = filters.find(f => f.id === filterId);
            if (!filter || !value) return null;
            
            return (
              <div key={filterId} className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Tag className="w-3 h-3" />
                <span>{filter.label}: {value}</span>
                <button onClick={() => clearFilter(filterId)} className="hover:bg-primary/20 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-text-muted">
            Clear all
          </Button>
        </div>
      )}

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4 animate-slide-up">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-2">
                <label className="form-label">{filter.label}</label>
                {filter.type === 'text' && (
                  <Input
                    placeholder={`Enter ${filter.label.toLowerCase()}`}
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  />
                )}
                {filter.type === 'select' && (
                  <select
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    className="form-input"
                  >
                    <option value="">All {filter.label}</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {filter.type === 'date' && (
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                    <Input
                      type="date"
                      value={activeFilters[filter.id] || ''}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="pl-10"
                    />
                  </div>
                )}
                {filter.type === 'range' && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={activeFilters[filter.id]?.min || ''}
                      onChange={(e) => handleFilterChange(filter.id, { 
                        ...activeFilters[filter.id], 
                        min: e.target.value 
                      })}
                    />
                    <span className="text-text-muted">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={activeFilters[filter.id]?.max || ''}
                      onChange={(e) => handleFilterChange(filter.id, { 
                        ...activeFilters[filter.id], 
                        max: e.target.value 
                      })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Saved Searches */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Saved searches:</span>
              <div className="flex flex-wrap gap-2">
                {savedSearches.map((search) => (
                  <button
                    key={search}
                    className="text-xs bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary px-2 py-1 rounded transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={saveCurrentSearch}>
              Save current search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}