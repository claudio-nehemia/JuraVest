// types/registration.ts
export interface RegistrationData {
  step1?: {
    nama: string;
    email: string;
    no_telp: string;
  };
  step2?: {
    password: string;
    password_confirmation: string;
    completed?: boolean; // opsional kalau mau seragam
  };
  step3?: {
    role_id: number;
    completed?: boolean;
  };
}
