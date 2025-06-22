export interface UsahaBaru {
    nama_usaha: string | null;
    pemilik_usaha: string | null;
    // user_id: number | null;
    tipe_usaha: 'Usaha Baru';
    jenis_usaha_id: number | null;
    target_pasar_id: number | null;

    usaha_baru: {
        rencana_lokasi_operasional: string | null;
        rencana_mulai_usaha: string | null;
        alokasi_dana: string | null;
        perkiraan_dana: number | null;
        latar_belakang: string | null;
    };

    [key: string]: any;
}
