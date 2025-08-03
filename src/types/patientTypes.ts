export interface ChronicCondition {
  [x: string]: any;
  name: string;
  diagnosed: string;
  treating_physician: string;
  last_updated: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
