import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { User, JenisUsaha, TargetPasar, Wirausaha, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader, 
    CardTitle,
} from "@/components/ui/card";

// Define proper types for the form data
interface UsahaOngoingData {
  lokasi_operasional: string;
  tahun_berdiri: string;
  jumlah_karyawan: string;
  estimasi_omzet: string | number;
  biaya_operasional: string | number;
  rencana_penggunaan_dana: string;
  proyeksi_usaha: string;
  media_social: string;
  kebutuhan_dana: string | number;
}

interface FormData {
  _method?: string; // Tambahkan ini untuk method spoofing
  user_id: string | number;
  nama_usaha: string;
  jenis_usaha_id: string | number;
  target_pasar_id: string | number;
  tipe_usaha: string;
  usaha_ongoing: UsahaOngoingData;
  foto_profil: File | string | null;
  deskripsi: string;
  [key:string]:any;
}

interface Props extends PageProps {
  mode: 'create' | 'edit';
  targetPasars: TargetPasar[];
  jenisUsahas: JenisUsaha[];
  users: User[];
  wirausaha?: Wirausaha;
}

export default function OngoingForm({ 
  mode, 
  targetPasars, 
  jenisUsahas, 
  users, 
  wirausaha,
  flash 
}: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    _method: mode === 'edit' ? 'PUT' : undefined, // Tambahkan method spoofing
    user_id: wirausaha?.user_id || '',
    nama_usaha: wirausaha?.nama_usaha || '',
    jenis_usaha_id: wirausaha?.jenis_usaha_id || '',
    target_pasar_id: wirausaha?.target_pasar_id || '',
    tipe_usaha: 'Usaha Ongoing',
    foto_profil: null as File | null,
    deskripsi: wirausaha?.deskripsi || '',
    usaha_ongoing: {
      lokasi_operasional: wirausaha?.usaha_ongoing?.lokasi_operasional || '',
      tahun_berdiri: wirausaha?.usaha_ongoing?.tahun_berdiri || '',
      jumlah_karyawan: wirausaha?.usaha_ongoing?.jumlah_karyawan || '',
      estimasi_omzet: wirausaha?.usaha_ongoing?.estimasi_omzet || '',
      biaya_operasional: wirausaha?.usaha_ongoing?.biaya_operasional || '',
      rencana_penggunaan_dana: wirausaha?.usaha_ongoing?.rencana_penggunaan_dana || '',
      proyeksi_usaha: wirausaha?.usaha_ongoing?.proyeksi_usaha || '',
      media_social: wirausaha?.usaha_ongoing?.media_social || '',
      kebutuhan_dana: wirausaha?.usaha_ongoing?.kebutuhan_dana || ''
    }
  });

  // Helper function untuk update nested data dengan proper typing
  const updateUsahaOngoing = (field: keyof UsahaOngoingData, value: string | number) => {
    setData('usaha_ongoing', {
      ...data.usaha_ongoing,
      [field]: value
    });
  };

  // Helper function untuk update main form data dengan proper typing
  const updateMainData = (field: keyof Omit<FormData, 'usaha_ongoing'>, value: string | number) => {
    setData(field, value);
  };

  // Client-side validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi field utama
    const requiredMainFields: (keyof Omit<FormData, 'usaha_ongoing' | 'tipe_usaha' | '_method'>)[] = [
      'user_id', 
      'nama_usaha', 
      'jenis_usaha_id', 
      'target_pasar_id'
    ];
    
    for (const field of requiredMainFields) {
      const value = data[field];
      if (!value || value.toString().trim() === '') {
        alert(`Field ${String(field).replace('_', ' ')} wajib diisi!`);
        return;
      }
    }

    // Validasi field usaha_ongoing
    const requiredOngoingFields: (keyof UsahaOngoingData)[] = [
      'lokasi_operasional',
      'tahun_berdiri', 
      'jumlah_karyawan',
      'estimasi_omzet',
      'biaya_operasional',
      'rencana_penggunaan_dana',
      'proyeksi_usaha',
      'media_social'
    ];

    for (const field of requiredOngoingFields) {
      const value = data.usaha_ongoing[field];
      if (!value || value.toString().trim() === '') {
        alert(`Field ${field.replace('_', ' ')} wajib diisi!`);
        return;
      }
    }
    
    // Log data untuk debugging
    console.log('Data yang akan dikirim:', data);
    
    if (mode === 'create') {
      post('/admin/wirausaha/ongoingStore', {
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
        onSuccess: () => {
          console.log('Data berhasil disimpan');
        }
      });
    } else {
      // Gunakan post dengan _method: 'PUT' untuk handle file upload, sama seperti NewForm
      post(`/admin/wirausaha/ongoingUpdate/${wirausaha!.id}`, {
        forceFormData: true, // Penting untuk file upload
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
        onSuccess: () => {
          console.log('Data berhasil diupdate');
        }
      });
    }
  };

  const pageTitle = mode === 'create' ? 'Tambah Usaha Ongoing' : 'Edit Usaha Ongoing';
  const buttonText = processing ? 'Menyimpan...' : (mode === 'create' ? 'Simpan' : 'Update');

  // Type-safe error accessor
  const getError = (field: string): string | undefined => {
    return errors[field as keyof typeof errors];
  };

  return (
    <AppLayout>
      <Head title={pageTitle} />
      
      <div className="p-4 w-full">
        {flash?.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {flash.error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 items-start">
                {/* Pemilik Usaha */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Pemilik Usaha</Label>
                  <select
                    value={data.user_id}
                    onChange={(e) => updateMainData('user_id', e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Pilih Pemilik</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[1rem]">
                    {getError('user_id') && <InputError message={getError('user_id')!} />}
                  </div>
                </div>

                {/* Nama Usaha */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Nama Usaha</Label>
                  <Input
                    type="text"
                    value={data.nama_usaha}
                    onChange={(e) => updateMainData('nama_usaha', e.target.value)}
                    placeholder="Masukkan nama usaha"
                    maxLength={50}
                  />
                  <div className="min-h-[1rem]">
                    {getError('nama_usaha') && <InputError message={getError('nama_usaha')!} />}
                  </div>
                </div>

                {/* Jenis Usaha */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Jenis Usaha</Label>
                  <select
                    value={data.jenis_usaha_id}
                    onChange={(e) => updateMainData('jenis_usaha_id', e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Pilih Jenis Usaha</option>
                    {jenisUsahas.map((jenis) => (
                      <option key={jenis.id} value={jenis.id}>
                        {jenis.jenis_usaha}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[1rem]">
                    {getError('jenis_usaha_id') && <InputError message={getError('jenis_usaha_id')!} />}
                  </div>
                </div>

                {/* Target Pasar */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Target Pasar</Label>
                  <select
                    value={data.target_pasar_id}
                    onChange={(e) => updateMainData('target_pasar_id', e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Pilih Target Pasar</option>
                    {targetPasars.map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.target_pasar}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[1rem]">
                    {getError('target_pasar_id') && <InputError message={getError('target_pasar_id')!} />}
                  </div>
                </div>

                {/* Lokasi Operasional */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Lokasi Operasional</Label>
                  <Input
                    type="text"
                    value={data.usaha_ongoing.lokasi_operasional}
                    onChange={(e) => updateUsahaOngoing('lokasi_operasional', e.target.value)}
                    placeholder="Masukkan lokasi operasional"
                    maxLength={50}
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.lokasi_operasional') && 
                      <InputError message={getError('usaha_ongoing.lokasi_operasional')!} />}
                  </div>
                </div>

                {/* Tahun Berdiri */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Tahun Berdiri</Label>
                  <Input
                    type="text"
                    value={data.usaha_ongoing.tahun_berdiri}
                    onChange={(e) => updateUsahaOngoing('tahun_berdiri', e.target.value)}
                    placeholder="2024"
                    maxLength={4}
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.tahun_berdiri') && 
                      <InputError message={getError('usaha_ongoing.tahun_berdiri')!} />}
                  </div>
                </div>

                {/* Jumlah Karyawan */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Jumlah Karyawan</Label>
                  <Input
                    type="text"
                    value={data.usaha_ongoing.jumlah_karyawan}
                    onChange={(e) => updateUsahaOngoing('jumlah_karyawan', e.target.value)}
                    placeholder="Masukkan jumlah karyawan"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.jumlah_karyawan') && 
                      <InputError message={getError('usaha_ongoing.jumlah_karyawan')!} />}
                  </div>
                </div>

                <div className="flex flex-col space-y-0.5">
                  <Label>Perkiraan Kebutuhan Dana</Label>
                  <Input
                    type="number"
                    value={data.usaha_ongoing.kebutuhan_dana}
                    onChange={(e) => updateUsahaOngoing('kebutuhan_dana', e.target.value)}
                    placeholder="Masukkan kebutuhan dana"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.kebutuhan_dana') && 
                      <InputError message={getError('usaha_ongoing.kebutuhan_dana')!} />}
                  </div>
                </div>

                {/* Estimasi Omzet */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Estimasi Omzet (Rp)</Label>
                  <Input
                    type="number"
                    value={data.usaha_ongoing.estimasi_omzet}
                    onChange={(e) => updateUsahaOngoing('estimasi_omzet', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.estimasi_omzet') && 
                      <InputError message={getError('usaha_ongoing.estimasi_omzet')!} />}
                  </div>
                </div>

                {/* Biaya Operasional */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Biaya Operasional (Rp)</Label>
                  <Input
                    type="number"
                    value={data.usaha_ongoing.biaya_operasional}
                    onChange={(e) => updateUsahaOngoing('biaya_operasional', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.biaya_operasional') && 
                      <InputError message={getError('usaha_ongoing.biaya_operasional')!} />}
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Media Sosial</Label>
                  <Input
                    type="text"
                    value={data.usaha_ongoing.media_social}
                    onChange={(e) => updateUsahaOngoing('media_social', e.target.value)}
                    placeholder="@instagram, facebook.com/page"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.media_social') && 
                      <InputError message={getError('usaha_ongoing.media_social')!} />}
                  </div>
                </div>

                {/* Rencana Penggunaan Dana */}
                <div className="col-span-2 flex flex-col space-y-0.5">
                  <Label>Rencana Penggunaan Dana</Label>
                  <textarea
                    value={data.usaha_ongoing.rencana_penggunaan_dana}
                    onChange={(e) => updateUsahaOngoing('rencana_penggunaan_dana', e.target.value)}
                    rows={4}
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Jelaskan rencana penggunaan dana..."
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.rencana_penggunaan_dana') && 
                      <InputError message={getError('usaha_ongoing.rencana_penggunaan_dana')!} />}
                  </div>
                </div>

                {/* Proyeksi Usaha */}
                <div className="col-span-2 flex flex-col space-y-0.5 mb-2">
                  <Label>Proyeksi Usaha</Label>
                  <textarea
                    value={data.usaha_ongoing.proyeksi_usaha}
                    onChange={(e) => updateUsahaOngoing('proyeksi_usaha', e.target.value)}
                    rows={4}
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Jelaskan proyeksi usaha ke depan..."
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_ongoing.proyeksi_usaha') && 
                      <InputError message={getError('usaha_ongoing.proyeksi_usaha')!} />}
                  </div>
                </div>
                <div className="col-span-2 flex flex-col space-y-0.5 mb-2">
                <Label>Deskripsi Usaha</Label>
                <textarea
                  value={data.deskripsi}
                  onChange={(e) => updateMainData('deskripsi', e.target.value)}
                  rows={6}
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Jelaskan deskripsi usaha"
                />
                <div className="min-h-[1rem]">
                  {getError('deskripsi') && 
                    <InputError message={getError('deskripsi')!} />}
                </div>
              </div>

              <div className="flex flex-col space-y-0.5 mb-2">
              <Label>Icon</Label>
                  {mode === 'edit' && wirausaha?.foto_profil_url && (
                  <img src={wirausaha.foto_profil_url} alt={wirausaha.nama_usaha} className="mb-2 h-32 w-32 rounded object-cover border" />
                      )}
                      <Input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setData('foto_profil', e.target.files?.[0] || null)} 
                      />
                      <div className="min-h-[1rem]">
                          {errors.foto_profil && <InputError message={errors.foto_profil} />}
                      </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={processing} className="mr-2">
                {buttonText}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.visit('/admin/wirausaha/ongoingIndex')}
              >
                Batal
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}