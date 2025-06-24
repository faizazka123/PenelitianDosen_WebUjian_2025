import Card from "@/Components/Card";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import { router } from "@inertiajs/react";
import DOMPurify from 'dompurify';
import { useState } from "react";
import Swal from "sweetalert2";

const ManageSoal = ({ ujian, pertanyaan }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah yakin ingin menghapus soal ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D01E1E',
            cancelButtonColor: '#585858',
            confirmButtonText: 'Iya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("guru.soalHapus", id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Soal berhasil dihapus.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Gagal!',
                            text: 'Terjadi kesalahan saat menghapus soal.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                });
            }
        });
    };

    const handleEdit = (ujianId) => {
        router.get(`/guru/ujian/${ujianId}/soal/edit`);
    };

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col justify-center items-center gap-5">
                {(!pertanyaan || pertanyaan.data.length === 0) ? (
                    <div className="min-w-full">
                        <div className="border-b-2 border-abu py-5 ps-5">
                            <h5 className="text-xl font-bold tracking-tight">Soal</h5>
                        </div>
                        <div className="mt-5 py-10 px-10 flex gap-5">
                            <a href={route('guru.tambahSoal', ujian.data.idujian)} className="py-5 flex flex-col items-center w-full border border-primary rounded-xl">
                                <button>
                                    <img src="/iconTambahSoal.png" width={80} />
                                    <p>Tambah Soal</p>
                                </button>
                            </a>
                            <a href={route('guru.importSoal', ujian.data.idujian)} className="py-5 flex flex-col items-center w-full border border-primary rounded-xl">
                                <button>
                                    <img src="/iconImportSoal.png" width={80} />
                                    <p>Import Soal</p>
                                </button>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="w-1/2">
                        <h5 className="text-xl font-bold tracking-tight mb-4">Detail Soal</h5>
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-12">No</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Soal</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pertanyaan.data.map((item, index) => (
                                    <tr key={item.idPertanyaan}>
                                        <td className="px-4 py-2 align-top text-sm">{index + 1}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <div dangerouslySetInnerHTML={{ __html: item.pertanyaan }} />
                                            {console.log(item)}
                                            {item.image && (
                                                <div>
                                                    <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" width={350} />
                                                </div>
                                            )}
                                            <div className="mt-2 space-y-1">
                                                {item.jawabans.map((jawaban, index) => (
                                                    <div
                                                        key={jawaban.id}
                                                        className={`flex gap-2 p-1 px-2 rounded ${jawaban.jawaban_benar ? 'bg-green-200' : ''}`}
                                                    >
                                                        {String.fromCharCode(65 + index)}. <span dangerouslySetInnerHTML={{ __html: jawaban.text }}></span>
                                                        {jawaban.image && (
                                                            <div>
                                                                <img src={`http://127.0.0.1:8000/storage/${jawaban.image}`} alt={`Jawaban ${index}`} className="mt-1 max-w-xs" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-center align-top space-x-2">
                                            <button onClick={() => handleEdit(ujian.data.idujian)}>
                                                <img src={`${window.LARAVEL_URL}/material_edit.png`} width={25} />
                                            </button>
                                            <button onClick={() => handleDelete(item.idPertanyaan)}>
                                                <img src={`${window.LARAVEL_URL}/material_delete.png`} width={25} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default ManageSoal;
