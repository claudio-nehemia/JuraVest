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
interface UsahaBaruData {
  rencana_lokasi_operasional: string;
  rencana_mulai_usaha: string;
  alokasi_dana: string;
  perkiraan_dana: string | number;
  latar_belakang: string;
}

// Add index signature to make it compatible with Inertia's FormDataType
interface FormData {
  user_id: string | number;
  nama_usaha: string;
  jenis_usaha_id: string | number;
  target_pasar_id: string | number;
  tipe_usaha: string;
  usaha_baru: UsahaBaruData;
  [key: string]: any; // This fixes the TypeScript error
}

interface Props extends PageProps {
  mode: 'create' | 'edit';
  targetPasars: TargetPasar[];
  jenisUsahas: JenisUsaha[];
  users: User[];
  wirausaha?: Wirausaha;
}

export default function NewForm({ 
  mode, 
  targetPasars, 
  jenisUsahas, 
  users, 
  wirausaha,
  flash 
}: Props) {
  const { data, setData, post, put, processing, errors } = useForm<FormData>({
    user_id: wirausaha?.user_id || '',
    nama_usaha: wirausaha?.nama_usaha || '',
    jenis_usaha_id: wirausaha?.jenis_usaha_id || '',
    target_pasar_id: wirausaha?.target_pasar_id || '',
    tipe_usaha: 'Usaha Baru',
    usaha_baru: {
      rencana_lokasi_operasional: wirausaha?.usaha_baru?.rencana_lokasi_operasional || '',
      rencana_mulai_usaha: wirausaha?.usaha_baru?.rencana_mulai_usaha || '',
      alokasi_dana: wirausaha?.usaha_baru?.alokasi_dana || '',
      perkiraan_dana: wirausaha?.usaha_baru?.perkiraan_dana || '',
      latar_belakang: wirausaha?.usaha_baru?.latar_belakang || ''
    }
  });

  // Helper function untuk update nested data dengan proper typing
  const updateUsahaBaru = (field: keyof UsahaBaruData, value: string | number) => {
    setData('usaha_baru', {
      ...data.usaha_baru,
      [field]: value
    });
  };

  // Helper function untuk update main form data dengan proper typing
  const updateMainData = (field: keyof Omit<FormData, 'usaha_baru'>, value: string | number) => {
    setData(field, value);
  };

  // Client-side validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi field utama
    const requiredMainFields: (keyof Omit<FormData, 'usaha_baru' | 'tipe_usaha'>)[] = [
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

    // Validasi field usaha_baru
    const requiredBaruFields: (keyof UsahaBaruData)[] = [
      'rencana_lokasi_operasional',
      'rencana_mulai_usaha', 
      'alokasi_dana',
      'perkiraan_dana',
      'latar_belakang'
    ];

    for (const field of requiredBaruFields) {
      const value = data.usaha_baru[field];
      if (!value || value.toString().trim() === '') {
        alert(`Field ${String(field).replace('_', ' ')} wajib diisi!`);
        return;
      }
    }
    
    // Log data untuk debugging
    console.log('Data yang akan dikirim:', data);
    
    if (mode === 'create') {
      post('/admin/wirausaha/newStore', {
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
        onSuccess: () => {
          console.log('Data berhasil disimpan');
        }
      });
    } else {
      put(`/admin/wirausaha/newUpdate/${wirausaha!.id}`, {
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
        onSuccess: () => {
          console.log('Data berhasil diupdate');
        }
      });
    }
  };

  const pageTitle = mode === 'create' ? 'Tambah Usaha Baru' : 'Edit Usaha Baru';
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

                {/* Rencana Lokasi Operasional */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Rencana Lokasi Operasional</Label>
                  <Input
                    type="text"
                    value={data.usaha_baru.rencana_lokasi_operasional}
                    onChange={(e) => updateUsahaBaru('rencana_lokasi_operasional', e.target.value)}
                    placeholder="Masukkan rencana lokasi operasional"
                    maxLength={50}
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_baru.rencana_lokasi_operasional') && 
                      <InputError message={getError('usaha_baru.rencana_lokasi_operasional')!} />}
                  </div>
                </div>

                {/* Rencana Mulai Usaha */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Rencana Mulai Usaha</Label>
                  <Input
                    type="text"
                    value={data.usaha_baru.rencana_mulai_usaha}
                    onChange={(e) => updateUsahaBaru('rencana_mulai_usaha', e.target.value)}
                    placeholder="2025"
                    maxLength={4}
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_baru.rencana_mulai_usaha') && 
                      <InputError message={getError('usaha_baru.rencana_mulai_usaha')!} />}
                  </div>
                </div>

                {/* Alokasi Dana */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Alokasi Dana</Label>
                  <Input
                    type="text"
                    value={data.usaha_baru.alokasi_dana}
                    onChange={(e) => updateUsahaBaru('alokasi_dana', e.target.value)}
                    placeholder="50% Modal, 30% Operasional, 20% Marketing"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_baru.alokasi_dana') && 
                      <InputError message={getError('usaha_baru.alokasi_dana')!} />}
                  </div>
                </div>

                {/* Perkiraan Dana */}
                <div className="flex flex-col space-y-0.5">
                  <Label>Perkiraan Dana (Rp)</Label>
                  <Input
                    type="number"
                    value={data.usaha_baru.perkiraan_dana}
                    onChange={(e) => updateUsahaBaru('perkiraan_dana', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_baru.perkiraan_dana') && 
                      <InputError message={getError('usaha_baru.perkiraan_dana')!} />}
                  </div>
                </div>

                {/* Latar Belakang */}
                <div className="col-span-2 flex flex-col space-y-0.5 mb-2">
                  <Label>Latar Belakang</Label>
                  <textarea
                    value={data.usaha_baru.latar_belakang}
                    onChange={(e) => updateUsahaBaru('latar_belakang', e.target.value)}
                    rows={6}
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Jelaskan latar belakang, motivasi, dan alasan memulai usaha ini..."
                  />
                  <div className="min-h-[1rem]">
                    {getError('usaha_baru.latar_belakang') && 
                      <InputError message={getError('usaha_baru.latar_belakang')!} />}
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
                onClick={() => router.visit('/admin/wirausaha/newIndex')}
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