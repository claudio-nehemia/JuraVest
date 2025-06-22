export interface DataDiri {
    nama_lengkap: string | null;
    tanggal_lahir: string | null;
    alamat: string | null;
    pendidikan_terakhir: string | null;
    jenis_kelamin: string | null;
    pekerjaan_id: number | null;

    [key: string]: any;
}
