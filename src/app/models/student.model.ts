import { ReportCard } from "./report-card.model";

export interface Student {
    student_id: string;
    name: string;
    current_year: number;
    graduation_year: number;
    avg_gpa: number;
    age: number;
    dob: Date;
    enrolled: boolean;
    expanded: boolean;
    reportCard?: ReportCard
  }