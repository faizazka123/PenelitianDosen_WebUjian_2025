import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import { useEffect } from "react";

export default function Prep({ kerja, jumlahSoal }) {

    useEffect(() => {
        if (localStorage.getItem("examStartTime")) {
            localStorage.removeItem("examStartTime");
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Ujian Start" />
            <div className="flex flex-col justify-center items-center gap-5">
                <Card />

                <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col border-b-2 border-blue-600 py-5 ps-5">
                        <a className="w-5 mb-5" href={route("dashboard")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                shapeRendering="geometricPrecision"
                                textRendering="geometricPrecision"
                                imageRendering="optimizeQuality"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                viewBox="0 0 512 404.43"
                            >
                                <path
                                    fillRule="nonzero"
                                    d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"
                                />
                            </svg>
                        </a>
                        <h5 className="text-2xl font-bold tracking-tight text-text-active">
                            {kerja.idUjian.judul}
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="flex flex-row justify-start items-center gap-3 mb-5 text-primary">
                            <img
                                src="/img/question.png"
                                width={20}
                                alt="soal"
                            />
                            <p className="font-normal">Jumlah Soal : {jumlahSoal} Soal</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 mb-5 text-primary">
                            <img
                                src="/img/contract.png"
                                width={20}
                                alt="soal"
                            />
                            <p className="font-normal">
                                Bentuk Soal : pilihan ganda
                            </p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 mb-5 text-primary">
                            <img
                                src="/img/repeat.png"
                                width={20}
                                alt="durasi"
                            />
                            <p className="font-normal">
                                Durasi : <span>{kerja.idUjian.durasi}</span>
                            </p>
                        </div>
                        <p className="mb-3 font-normal text-primary">
                            {kerja.idUjian.deskripsi}
                        </p>
                        <div className="mt-5 flex justify-end">
                            <a href={route("kerjas.soal", { id: kerja.idKerja })} className="w-2/6">
                                <button className="w-full bg-blue-700 rounded-lg text-white py-1 px-4">
                                    Mulai
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
