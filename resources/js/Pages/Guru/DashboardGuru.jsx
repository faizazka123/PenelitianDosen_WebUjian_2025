import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KodeInputForm from "@/Components/KodeInputForm";
import { Head, Link, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import CardList from "@/Components/CardList";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import CardUjian from "@/Components/CardUjian";

const DashboardGuru = ({ ujians }) => {
    const { flash } = usePage().props;

    console.log({ ujians });

    return (
        <GuruAuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex mx-auto flex-row gap-5 w-11/12">
                <CardUjian background="bg-biru_tua" title="Jumlah Ujian Aktif" guru={50} />
                <CardUjian background="bg-biru_muda" title="Jumlah Ujian Menunggu" siswa={50} />
            </div>

            <div className="py-7">
                <div className={`mx-auto max-w-7xl min-w-full sm:px-6 lg:px-8`}>
                    {flash.success && (
                        <div
                            className="bg-green-100 border mb-5 border-green-400 text-green-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline">
                                {" "}
                                {flash.success}
                            </span>
                        </div>
                    )}
                    {flash.error && (
                        <div
                            className="bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">
                                {" "}
                                {flash.error}
                            </span>
                        </div>
                    )}

                    <div className="clear-both bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mx-3 mb-5 w-full">
                            <h3 className="text-xl border-b-2 shadow-md border-black font-bold">
                                <div className="flex justify-between">
                                    <span>Daftar Ujian</span>
                                    <a href={route('guru.daftar')}>
                                        <button className="text-blue-500">
                                            More
                                        </button>
                                    </a>
                                </div>
                            </h3>
                        </div>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">No</th>
                                    <th className="border px-4 py-2">Mata Pelajaran</th>
                                    <th className="border px-4 py-2">Judul</th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">Tahun Ajaran</th>
                                    <th className="border px-4 py-2">Detail</th>
                                    <th className="border px-4 py-2">Tambah Soal</th>
                                    <th className="border px-4 py-2">Generate Kode</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ujians.data.length > 0 ? (
                                    ujians.data.map((ujian, index) => (
                                        <tr key={ujian.idujian}>
                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {ujian.idMapel.nama}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {ujian.judul}
                                            </td>
                                            <td className="border px-4 py-2 hidden sm:table-cell">
                                                {ujian.tahunAjaran}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <a href={route('guru.detail', ujian.idujian)}>
                                                    <button
                                                        className={`px-4 py-2 rounded-md bg-blue-500 text-white`}
                                                    >
                                                        Detail
                                                    </button>
                                                </a>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <a href={route('guru.soal', ujian.idujian)}>
                                                    <button
                                                        className={`px-4 py-2 rounded-md bg-yellow-400 text-white`}
                                                    >
                                                        Soal
                                                    </button>
                                                </a>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <a href={route(ujian.kodeUjian ? 'guru.kode' : 'guru.generate', ujian.idujian)}>
                                                    <button
                                                        className={`px-4 py-2 rounded-md bg-green-500 text-white`}
                                                    >
                                                        Generate
                                                    </button>
                                                </a>
                                            </td>
                                            <td className="border px-4 py-2">
                                                {/* <a>
                                                    <button
                                                        className={`px-4 py-2 rounded-md ${kerja.isActive
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                            }`}
                                                        disabled={
                                                            !kerja.isActive
                                                        }
                                                    >
                                                        Masuk
                                                    </button>
                                                </a> */}
                                                <div className="flex gap-5">
                                                    <Link >
                                                        <img
                                                            src={`${window.LARAVEL_URL}/material_edit.png`}
                                                            width={25}
                                                        />
                                                    </Link>
                                                    <button>
                                                        <img
                                                            src={`${window.LARAVEL_URL}/material_delete.png`}
                                                            width={25}
                                                            alt="Hapus"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="border px-4 py-2 text-center"
                                            colSpan="5"
                                        >
                                            Belum ada Ujian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default DashboardGuru;

