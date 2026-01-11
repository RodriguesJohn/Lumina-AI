
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface IntakeCase {
  id: string;
  patientName: string;
  source: 'Web Lead' | 'Phone Call' | 'Referral';
  value: number;
  priority: Priority;
  status: 'Pending AI' | 'Needs Human' | 'Scheduled' | 'At Risk';
  waitTime: string;
  nextAction: string;
}

export interface Metric {
  label: string;
  value: string | number;
  trend?: number;
  status?: 'normal' | 'warning' | 'critical';
  category: 'Financial' | 'Operational' | 'Efficiency';
  isPrimary?: boolean;
}
