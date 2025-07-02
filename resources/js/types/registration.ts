// types/registration.ts
import { DataDiri } from '@/types/data-diri';
import { Investor } from '@/types/investor';
import { UsahaBaruOngoing } from '@/types/usaha-baru-ongoing';

export type Step5 =
    | {
          type: 'investor';
          investor: Investor;
          completed?: boolean;
      }
    | {
          type: 'umkm';
          status_usaha: 'usaha_baru' | 'usaha_ongoing';
          completed?: boolean;
      };

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
    step5?: Step5;
    step6?: UsahaBaruOngoing & {
        completed?: boolean;
    };
}
