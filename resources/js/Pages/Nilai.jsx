import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Nilai(kerjas) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Nilai Ujian
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className='flex items-center justify-between mx-3 mb-5'>
                            <h3 className=" text-xl font-semibold">Daftar Nilai Ujian</h3>
                        </div>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Judul</th>
                                    <th className="border px-4 py-2">Mata Pelajaran</th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">Tahun Ajaran</th>
                                    <th className="border px-4 py-2">Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kerjas.kerjas.data.length > 0 ? (
                                    kerjas.kerjas.data.map((kerja) => (
                                        <tr key={kerja.idKerja}>
                                            <td className="border px-4 py-2">{kerja.idUjian.judul}</td>
                                            <td className="border px-4 py-2">{kerja.idUjian.idMapel.nama}</td>
                                            <td className="border px-4 py-2 hidden sm:table-cell">{kerja.idUjian.tahunAjaran}</td>
                                            <td className="border px-4 py-2">{kerja.nilai !== null ? kerja.nilai : "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border px-4 py-2 text-center" colSpan="5">
                                            Belum ada Ujian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
