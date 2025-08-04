export interface EducationItem {
  id: number;
  title: string;
  institution: string;
  achievement?: string;
  timeline: string;
}


export interface Certification {
  id: number;
  name: string;
  certified_year: string | number;
  validation_year: string | number;
  institution: string;
  isActive?: boolean; // optional since some objects have it
}

export interface EducationProps {
  userId: number;
  education: EducationItem[];
}
export interface CertificationProps {
  certifications: Certification[];
}

export interface Award {
  title: string;
  organization: string;
  year: string | number;
}

export interface AwardProps {
  awards: Award[];
}

// types/doctorTypes.ts
export interface Publication {
  title: string;
  journal: string;
  date: string;
}

export interface Research {
  id: number;
  research_name: string;
  publication_year: number;
  published_by: string;
}

export interface PublicationResearchProps {
  publications: Publication[];
  research: Research[];
}

export interface PersonalInfo {
  last_name: string;
  first_name: string;
  specialization: string;
  license_number: string;
  email: string;
  phone: string;
  hospital: string;
  years_of_experience: string;
}

export interface PersonalDetailsProps {
    image: string;

  personalInfo: PersonalInfo;
}


export interface DoctorProfileData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  research: Research;
}

