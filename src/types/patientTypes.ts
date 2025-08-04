export interface ChronicCondition {
  [x: string]: any;
  name: string;
  diagnosed: string;
  treating_physician: string;
  last_updated: string;
}

export interface ISurgicalHistory {
  id?: number;
  procedure: string;
  surgery_date: string; // ISO format date-time string
  surgeon_name: string;
  hospital_name: string;
  complications?: string; // optional
}

export interface TImmunizationHistory {
  id?: number;
  vaccine_name: string;
  date: string;
  dose_name: string;
  vaccine_provider: string;
}

export interface TPrevious {
  id: number;
  description: string;
  file_url: string;
  created_at: string;
  updated_at?: string;
}

export interface UploadedImage {
  id: number;
  description: string;
  url: string;
  file_url: string;
  created_at: string;
  updated_at?: string;
  uploadDate?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
