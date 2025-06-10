import React, { FormEventHandler } from 'react';
import { useForm, usePage, router, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

interface Pekerjaan {
    id: number;
    job: string;
}

interface User {
    id: number;
    name: string;
}

interface DataDiri {
  id: number;
  user_id: number;
  nama_lengkap: string;
  tanggal_lahir: string;
  alamat: string;
  pendidikan_terakhir: string;
  jenis_kelamin: string;
  pekerjaan_id: number;
}

interface Props {
    mode: 'create' | 'edit';
    pekerjaan: Pekerjaan[];
    jenis_kelamin: string[];
    pendidikan_terakhir: string[];
    auth: {user: User};
    dataDiri?: DataDiri;
}

export default function DataDiriForm({
    mode, 
    pekerjaan,
    jenis_kelamin,
    pendidikan_terakhir,
    dataDiri
}: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_lengkap: dataDiri?.nama_lengkap || '',
        tanggal_lahir: dataDiri?.tanggal_lahir || '',
        alamat: dataDiri?.alamat || '',
        pendidikan_terakhir: dataDiri?.pendidikan_terakhir || '',
        jenis_kelamin: dataDiri?.jenis_kelamin || '',
        pekerjaan_id: dataDiri?.pekerjaan_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(mode === 'create') {
            post('/admin/dataDiri', {
                onSuccess: () => {
                    alert('Data Berhasil Disimpan')
                    reset();
                },
                onError: () => {
                    alert('Gagal Menyimpan Data')
                }
            });
        } else {
            put(`/admin/dataDiri/${dataDiri?.id}`,{
                onSuccess: () => {
                    alert('Data Berhasil Diubah')
                },
                onError: () => {
                    alert('Gagal Memperbarui Data')
                }
            });
        }
    };

    return (
        <AppLayout>
            <Head title={mode === 'create' ? 'Tambah Data Diri' : 'Edit Data Diri'} />

            <div className="p-4 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Link
                                href="/admin/dataDiri"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            {mode === 'create' ? 'Tambah Data Diri' : 'Edit Data Diri'}
                        </CardTitle>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nama Lengkap */}
                                <div>
                                    <label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_lengkap"
                                        value={data.nama_lengkap}
                                        onChange={(e) => setData('nama_lengkap', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.nama_lengkap ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.nama_lengkap && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Lahir <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.tanggal_lahir && (
                                        <p className="mt-1 text-sm text-red-600">{errors.tanggal_lahir}</p>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jenis Kelamin <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.jenis_kelamin ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        {jenis_kelamin.map((jk) => (
                                            <option key={jk} value={jk}>
                                                {jk}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <p className="mt-1 text-sm text-red-600">{errors.jenis_kelamin}</p>
                                    )}
                                </div>

                                {/* Pendidikan Terakhir */}
                                <div>
                                    <label htmlFor="pendidikan_terakhir" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pendidikan Terakhir <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="pendidikan_terakhir"
                                        value={data.pendidikan_terakhir}
                                        onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.pendidikan_terakhir ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Pilih Pendidikan Terakhir</option>
                                        {pendidikan_terakhir.map((pendidikan) => (
                                            <option key={pendidikan} value={pendidikan}>
                                                {pendidikan}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pendidikan_terakhir && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pendidikan_terakhir}</p>
                                    )}
                                </div>

                                {/* Pekerjaan */}
                                <div>
                                    <label htmlFor="pekerjaan_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pekerjaan <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="pekerjaan_id"
                                        value={data.pekerjaan_id}
                                        onChange={(e) => setData('pekerjaan_id', parseInt(e.target.value))}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.pekerjaan_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Pilih Pekerjaan</option>
                                        {pekerjaan.map((job) => (
                                            <option key={job.id} value={job.id}>
                                                {job.job}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pekerjaan_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pekerjaan_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                                    Alamat <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="alamat"
                                    rows={4}
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.alamat ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Masukkan alamat lengkap"
                                />
                                {errors.alamat && (
                                    <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3">
                                <Link
                                    href="/admin/dataDiri"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {mode === 'create' ? 'Simpan' : 'Perbarui'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}