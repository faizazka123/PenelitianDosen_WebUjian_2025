import Card from "@/Components/Card";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DOMPurify from 'dompurify';
import { useState } from "react";

const DetailUjian = ({ ujian }) => {
    const [searchTerm, setSearchTerm] = useState("");

    console.log(ujian)

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="max-w-xl w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col border-b-2 border-gray-200 py-5 ps-5">
                        <h5 className="text-xl ps-5 font-bold tracking-tight text-gray-800">
                            Detail Ujian
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-3 gap-2 text-gray-800 mb-2">
                            <div className="col-span-1 font-normal">Judul Ujian</div>
                            <div className="col-span-2">: {ujian.data.judul}</div>

                            <div className="col-span-1 font-normal">Mata Pelajaran</div>
                            <div className="col-span-2">: {ujian.data.idMapel.nama}</div>

                            <div className="col-span-1 font-normal">Tahun Ajaran</div>
                            <div className="col-span-2">: {ujian.data.tahunAjaran}</div>

                            <div className="col-span-1 font-normal">Kelas</div>
                            <div className="col-span-2">: {ujian.data.kelas}</div>

                            <div className="col-span-1 font-normal">Waktu Ujian</div>
                            <div className="col-span-2">: {ujian.data.jamAwal} - {ujian.data.jamAkhir} WIB</div>

                            <div className="col-span-1 font-normal">Deskripsi Ujian</div>
                            <div className="col-span-2">:</div>
                        </div>
                        <p
                            className="mb-3 font-normal text-gray-800"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ujian.data.deskripsi) }}
                        />

                        <div className="mt-5 flex justify-end">
                            <button
                                onClick={() => window.history.back()}
                                className="w-2/6 bg-gray-400 rounded-lg text-white py-1 px-4"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default DetailUjian;