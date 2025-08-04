export interface TRole {
  id: number;
  name: string;
}

// Updated UserDataType interface based on your database schema
export interface UserDataType {
  // Required fields from database
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hashed: string;
  date_of_birth: string; // DateTime from DB, stored as ISO string
  gender: string;
  role_id: number;

  // Optional fields from database
  profile_image_id?: number | null;
  profile_image?: string | null;
  age?: string | null;
  blood_group?: string | null;
  height_cm?: number | null;
  weight_lbs?: number | null;
  address?: string | null;
  country?: string | null;
  phone_number?: string | null;
  temperature?: string | null;
  blood_pressure?: string | null;
  heart_bit_rate?: string | null;

  // Related data
  role?: TRole;
}

// You might also need this if not already defined
export interface TRole {
  id: number;
  name: string;
  // Add other role fields as needed
}
