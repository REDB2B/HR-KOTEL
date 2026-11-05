/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleCategory = 'media_buying' | 'development' | 'affiliate_bd' | 'management';

export type SeniorityLevel = 'middle' | 'senior' | 'lead' | 'c_level';

export type WorkFormat = 'remote' | 'office' | 'hybrid' | 'relocation';

export interface Vacancy {
  id: string;
  title: string;
  category: RoleCategory;
  categoryLabel: string;
  location: string;
  format: WorkFormat;
  formatLabel: string;
  salaryRange: string;
  hot?: boolean;
  publishedDate: string;
  experienceYears: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
  trafficSources?: string[];
  techStack?: string[];
}

export interface CaseStudy {
  id: string;
  clientType: string;
  position: string;
  closedInDays: number;
  candidatesShown: number;
  guaranteeMonths: number;
  highlight: string;
  details: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  rolesList: string[];
  icon: string;
  metrics: string;
}

export interface CalculatorState {
  roleCategory: RoleCategory;
  positionId: string;
  seniority: SeniorityLevel;
  teamSize: number;
  urgency: 'standard' | 'asap';
  format: WorkFormat;
}

export interface CalculationResult {
  estimatedDays: string;
  guaranteeDays: number;
  marketSalaryRange: string;
  availableTalentsCount: number;
  modelType: string;
}
