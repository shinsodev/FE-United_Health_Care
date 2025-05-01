export interface Doctor {
  id?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  fullName: string;
}

export interface Specialty {
  id?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  name: string;
  code: string;
  doctors?: Doctor[];
}

export interface SpecialtyFormData {
  name: string;
  code: string;
} 