import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";

export default function Prep({ kerja }) {
    return (
        <AuthenticatedLayout>
            <Head title="Ujian Start" />
            <div className="flex flex-col justify-center items-center gap-5">
                <Card />

                <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="border-b-2 border-blue-600 py-5 ps-5">
                        <h5 className="text-2xl font-bold tracking-tight text-blue-900 dark:text-white">
                            Kuis Fisika
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="flex flex-row justify-start items-center gap-3 mb-3">
                            <img
                                src="/img/question.png"
                                width={20}
                                alt="soal"
                            />
                            <p className="font-normal text-blue-700">
                                Jumlah Soal :{" "}
                                <span className="font-bold">5</span> Soal
                            </p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 mb-3">
                            <img
                                src="/img/contract.png"
                                width={20}
                                alt="soal"
                            />
                            <p className="font-normal text-blue-700">
                                Bentuk Soal :{" "}
                                <span className="font-bold">pilihan ganda</span>
                            </p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 mb-3">
                            <img
                                src="/img/repeat.png"
                                width={20}
                                alt="durasi"
                            />
                            <p className="font-normal text-blue-700">
                                Durasi : <span>01:30:00</span>
                            </p>
                        </div>
                        <p className="mb-3 font-normal text-blue-800">
                            Kuis ini bertujuan untuk menguji pemahaman siswa
                            tentang materi Gerak Lurus dan Hukum Newton yang
                            telah dipelajari. Siswa diharapkan untuk mengerjakan
                            soal secara mandiri tanpa bekerja sama atau
                            menyontek. Pastikan untuk membaca soal dengan teliti
                            dan menjawab dengan jelas
                        </p>
                        <div className="flex justify-between mt-5 gap-16">
                            <a href={route("dashboard")} className="w-full">
                                <button className="w-full bg-gray-200 rounded-lg border-2 hover:border-blue-700 text-blue-700 py-1 px-4">
                                    Kembali
                                </button>
                            </a>
                            <a href={route("kerjas.soal")} className="w-full">
                                <button className="w-full bg-blue-700 rounded-lg border-2 border-white hover:bg-blue-800 text-white py-1 px-4">
                                    Mulai
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <pre>{JSON.stringify(kerja)}</pre> */}
            </div>
        </AuthenticatedLayout>
    );
}
