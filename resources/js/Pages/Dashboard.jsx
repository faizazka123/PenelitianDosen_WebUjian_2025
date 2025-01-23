import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import KodeInputForm from '@/Components/KodeInputForm';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard(kerjas) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="bg-green-100 border mb-5 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> {flash.success}</span>
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {flash.error}</span>
                        </div>
                    )}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className='flex items-center justify-between mx-3 mb-5'>
                            <h3 className=" text-xl font-semibold">List Ujian</h3>
                            <KodeInputForm />
                        </div>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Judul</th>
                                    <th className="border px-4 py-2">Mata Pelajaran</th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">Tahun Ajaran</th>
                                    <th className="border px-4 py-2">Durasi</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kerjas.kerjas.data.length > 0 ? (
                                    kerjas.kerjas.data.map((kerja) => (
                                        <tr key={kerja.idKerja}>
                                            <td className="border px-4 py-2">{kerja.idUjian.judul}</td>
                                            <td className="border px-4 py-2">{kerja.idUjian.idMapel.nama}</td>
                                            <td className="border px-4 py-2 hidden sm:table-cell">{kerja.idUjian.tahunAjaran}</td>
                                            <td className="border px-4 py-2">{kerja.idUjian.durasi}</td>
                                            <td className="border px-4 py-2">
                                                <a href={kerja.isActive ? route('ujian.show', kerja.idKerja) : '#'}>
                                                    <button
                                                        className={`px-4 py-2 rounded-md ${kerja.isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            }`}
                                                        disabled={!kerja.isActive}
                                                    >
                                                        Masuk
                                                    </button>
                                                </a>
                                            </td>
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
