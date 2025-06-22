export interface UsahaOngoing {
    nama_usaha: string | null;
    pemilik_usaha: string | null;
    // user_id: number | null;
    tipe_usaha: 'Usaha Ongoing';
    jenis_usaha_id: number | null;
    target_pasar_id: number | null;

    usaha_ongoing: {
        lokasi_operasional: string | null;
        tahun_berdiri: string | null;
        jumlah_karyawan: string | null;
        estimasi_omzet: number | null;
        biaya_operasional: number | null;
        rencana_penggunaan_dana: string | null;
        proyeksi_usaha: string | null;
        media_social: string | null;
    };

    [key: string]: any;
}
