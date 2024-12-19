import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import KodeInputForm from '@/Components/KodeInputForm';
import { Head } from '@inertiajs/react';

export default function Dashboard(kerjas) {

    console.log(kerjas)

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
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className='flex items-center justify-between my-3'>
                            <h3 className="text-lg font-semibold">List Ujian</h3>
                            <KodeInputForm />
                        </div>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Mata Pelajaran</th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">Tahun Ajaran</th>
                                    <th className="border px-4 py-2">Durasi</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">judul</td>
                                    <td className="border px-4 py-2 hidden sm:table-cell">2024/2025</td>
                                    <td className="border px-4 py-2">1:30:00</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                            onClick={() =>
                                                alert(`Masuk ke ujian`)
                                            }
                                        >
                                            Masuk
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pre>{JSON.stringify(kerjas, undefined, 2)}</pre>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
