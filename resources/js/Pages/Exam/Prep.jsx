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
                            Kuis Fisika
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="flex flex-row justify-start items-center gap-3 mb-5 text-primary">
                            <img
                                src="/img/question.png"
                                width={20}
                                alt="soal"
                            />
                            <p className="font-normal">Jumlah Soal : 5 Soal</p>
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
                                Durasi : <span>01:30:00</span>
                            </p>
                        </div>
                        <p className="mb-3 font-normal text-primary">
                            Kuis ini bertujuan untuk menguji pemahaman siswa
                            tentang materi Gerak Lurus dan Hukum Newton yang
                            telah dipelajari. Siswa diharapkan untuk mengerjakan
                            soal secara mandiri{" "}
                            <b> tanpa bekerja sama atau menyontek.</b> Pastikan
                            untuk membaca soal dengan teliti dan menjawab dengan
                            jelas
                        </p>
                        <div className="mt-5 flex justify-end">
                            {/* <a href={route("dashboard")} className="w-full">
                                <button className="w-full bg-gray-200 rounded-lg border-2 hover:border-blue-700 text-blue-700 py-1 px-4">
                                    Kembali
                                </button>
                            </a> */}
                            <a href={route("kerjas.soal")} className="w-2/6">
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
