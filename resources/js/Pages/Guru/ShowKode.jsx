import Card from "@/Components/Card";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DOMPurify from 'dompurify';
import { useState } from "react";

const ShowKode = ({ ujian }) => {
    const [searchTerm, setSearchTerm] = useState("");

    console.log(ujian)

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col justify-center items-center gap-5 px-28">
                <div className="max-w-full w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col border-b-2 border-gray-200 py-5 ps-5">
                        <h5 className="text-xl ps-5 font-bold tracking-tight text-gray-800">
                            Detail Ujian
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-6 gap-2 text-gray-800 mb-2">
                            <div className="col-span-1 font-normal">Judul Ujian</div>
                            <div className="col-span-5">: {ujian.data.judul}</div>

                            <div className="col-span-1 font-normal">Mata Pelajaran</div>
                            <div className="col-span-5">: {ujian.data.idMapel.nama}</div>

                            <div className="col-span-1 font-normal">Waktu Ujian</div>
                            <div className="col-span-5">: {ujian.data.jamAwal} - {ujian.data.jamAkhir} WIB</div>

                            <div className="col-span-1 font-normal">Kuota Ujian</div>
                            <div className="col-span-5">: {ujian.data.kuota}</div>

                            <div className="col-span-1 font-normal">Kode Ujian</div>
                            <div className="col-span-5">:</div>
                        </div>
                        <p
                            className="mb-3 font-bold text-center text-5xl text-gray-800"
                        >
                            {ujian.data.kodeUjian}
                        </p>

                        <div className="mt-5 flex justify-end">
                            <a href={route('guru.daftar')} className="w-2/6">
                                <button className="w-full bg-gray-400 rounded-lg text-white py-1 px-4">
                                    Tutup
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default ShowKode;