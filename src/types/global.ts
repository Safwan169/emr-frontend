export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
// types/Appointment.ts
export interface Appointment {
  id: string;
  doctorName: string;
  department: string;
  visitType: string;
  date: string;
  time: string;
  room: string;
  rating: number;
  experience: number;
  imageUrl: string;
}

export interface RecentActivity {
  id?:number;
  title:string;
  description:string;
}

export interface RecentActivityCardProps {
  data: RecentActivity[];
}


export type TResponseRedux<T> = TResponse<T>;
