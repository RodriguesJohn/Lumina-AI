
import React from 'react';
import { LayoutDashboard, Users, Clock, AlertCircle, Settings, ClipboardCheck, BarChart3, Calendar, Cpu } from 'lucide-react';
import { IntakeCase, Metric } from './types';

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'agents', label: 'Manage Agents', icon: <Cpu size={20} /> },
  { id: 'intake', label: 'Active Intake', icon: <ClipboardCheck size={20} /> },
  { id: 'scheduling', label: 'Scheduling', icon: <Calendar size={20} /> },
  { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const MOCK_METRICS: Metric[] = [
  // Financial (Primary)
  { label: 'Revenue at Risk', value: '$245,800', trend: 12, status: 'critical', category: 'Financial', isPrimary: true },
  { label: 'At-Risk Intake Cases', value: '18', status: 'critical', category: 'Financial', isPrimary: true },
  
  // Operational
  { label: 'Same-Day Scheduling', value: '84.2%', trend: 4.5, status: 'normal', category: 'Operational' },
  { label: 'Unscheduled High-Value', value: '7', status: 'warning', category: 'Operational' },
  { label: 'Avg Time-to-Action', value: '4.2m', trend: -2.1, status: 'normal', category: 'Operational' },
  
  // Efficiency
  { label: 'Agent Auto-Handled', value: '91.8%', trend: 1.2, status: 'normal', category: 'Efficiency' },
  { label: 'Needs Human Approval', value: '5', status: 'warning', category: 'Efficiency' },
  { label: 'Chair Utilization', value: '76.4%', trend: -3.2, status: 'normal', category: 'Efficiency' },
];

export const MOCK_CASES: IntakeCase[] = [
  {
    id: 'CS-1021',
    patientName: 'Sarah Jenkins',
    source: 'Phone Call',
    value: 4200,
    priority: 'Critical',
    status: 'At Risk',
    waitTime: '18m',
    nextAction: 'Call Back Required',
  },
  {
    id: 'CS-1022',
    patientName: 'Michael Chen',
    source: 'Web Lead',
    value: 12500,
    priority: 'High',
    status: 'Needs Human',
    waitTime: '4m',
    nextAction: 'Verify Insurance',
  },
  {
    id: 'CS-1023',
    patientName: 'Emma Rodriguez',
    source: 'Referral',
    value: 850,
    priority: 'Medium',
    status: 'Pending AI',
    waitTime: '1m',
    nextAction: 'Data Processing',
  },
  {
    id: 'CS-1024',
    patientName: 'David Thompson',
    source: 'Web Lead',
    value: 3200,
    priority: 'High',
    status: 'Needs Human',
    waitTime: '12m',
    nextAction: 'Schedule Consultation',
  },
  {
    id: 'CS-1025',
    patientName: 'Olivia White',
    source: 'Phone Call',
    value: 1500,
    priority: 'Low',
    status: 'Scheduled',
    waitTime: '0m',
    nextAction: 'Completed',
  },
];
