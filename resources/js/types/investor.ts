export interface Investor {
    nama_investor: string | null;
    user_id: number | null;
    tujuan_investasi: string | null;
    target_pasar_invest: number[];
    jenis_usaha_invest: number[];

    [key: string]: any;
}
