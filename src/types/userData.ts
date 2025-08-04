export interface TRole {
  id: number;
  name: string;
}

export interface UserDataType {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hashed: string;
  date_of_birth: string;
  gender: string;
  address?: string;
  country: string;
  phone_number: string;

  role_id: number;
  role: TRole;

  age?: string;
  blood_group?: string;
  height_cm?: number;
  weight_lbs?: number;
}
