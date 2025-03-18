export default function DaftarUjianCard({ detail }) {
    const renderTable = (label, value) => {
        return (
            <tr className="mb-[10rem]">
                <td className="w-[8rem]">{label}</td>
                <td className="w-[2rem]">:</td>
                <td className="p-1">{value}</td>
            </tr>
        );
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow ">
                <div className="border-b-2 border-abu py-5 ps-5">
                    <h5 className="text-xl font-bold tracking-tight">
                        Detail Ujian
                    </h5>
                </div>
                <div className="p-5">
                    <table className="border-none">
                        <tbody>
                            {renderTable("Judul Ujian", "test")}
                            {renderTable("Mata Pelajaran", "test")}
                            {renderTable("Tahun Ajaran", "test")}
                            {renderTable("Kelas", "test")}
                            {renderTable("Waktu Ujian", "test")}
                            {renderTable("Deskripsi Ujian", "")}
                        </tbody>
                    </table>
                    <p className="mt-2">
                        Kuis ini bertujuan untuk menguji pemahaman siswa tentang
                        materi Gerak Lurus dan Hukum Newton yang telah
                        dipelajari. Siswa diharapkan untuk mengerjakan soal
                        secara mandiri tanpa bekerja sama atau menyontek.
                        Pastikan untuk membaca soal dengan teliti dan menjawab
                        dengan jelas.
                    </p>
                    <div className="mt-5 flex justify-end">
                        <a href={route("dashboard")} className="w-1/6">
                            <button className="w-full bg-abu_tua font-bold rounded-lg text-white py-1 px-4">
                                Tutup
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
