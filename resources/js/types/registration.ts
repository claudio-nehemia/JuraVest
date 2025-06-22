// types/registration.ts
import { DataDiri } from '@/types/data-diri';
import { UsahaBaruOngoing } from '@/types/usaha-baru-ongoing';

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
    step3?: DataDiri & {
        completed?: boolean;
    };
    step4?: {
        role_id: number;
        completed?: boolean;
    };
    step5?: {
        status_usaha: 'usaha_baru' | 'usaha_ongoing';
        completed?: boolean;
    };
    step6?: UsahaBaruOngoing & {
        completed?: boolean;
    };
}
