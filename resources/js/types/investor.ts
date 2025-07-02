export interface Investor {
    nama_investor: string | null;
    user_id: number | null;
    tujuan_investasi: string | null;
    target_pasar_ids: number[];
    jenis_usaha_ids: number[];

    [key: string]: any;
}
