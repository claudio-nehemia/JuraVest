import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface JenisUsaha {
    id: number;
    jenis_usaha: string;
}

export interface TargetPasar {
    id: number;
    target_pasar: string;
}

export interface UsahaOngoing {
  lokasi_operasional: string;
  tahun_berdiri: string;
  jumlah_karyawan: string;
  estimasi_omzet: number;
  biaya_operasional: number;
  rencana_penggunaan_dana: string;
  proyeksi_usaha: string;
  media_social: string;
  kebutuhan_dana: number;
}

export interface UsahaBaru {
  rencana_lokasi_operasional: string;
  rencana_mulai_usaha: string;
  alokasi_dana: string;
  perkiraan_dana: number;
  latar_belakang: string;
}

export interface Wirausaha {
  id: number;
  user_id: number;
  nama_usaha: string;
  jenis_usaha_id: number;
  target_pasar_id: number;
  tipe_usaha: 'Usaha Ongoing' | 'Usaha Baru';
  usaha_ongoing?: UsahaOngoing;
  usaha_baru?: UsahaBaru;
  user?: User;
  jenis_usaha?: JenisUsaha;
  match_score: number;
  target_pasar?: TargetPasar;
  foto_profil: string | null;
  foto_profil_url: string | null;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}

export interface PageProps {
  auth: {
    user: User;
  };
  flash: {
    success?: string;
    error?: string;
  };
}