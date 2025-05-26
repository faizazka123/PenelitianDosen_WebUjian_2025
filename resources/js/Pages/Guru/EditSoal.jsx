import "react-quill/dist/quill.snow.css";
import Card from "@/Components/Card";
import InputLabel from "@/Components/InputLabel";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DOMPurify from 'dompurify';
import { useState } from "react";
import ReactQuill from "react-quill";
import InputError from "@/Components/InputError";
import { router } from "@inertiajs/react";

const EditSoal = ({ ujian, pertanyaan }) => {
    const [pertanyaanList, setPertanyaanList] = useState([
        {
            isi: "",
            gambar: null,
            jawabanList: [
                { isi: "", gambar: null, benar: true },
                { isi: "", gambar: null, benar: false },
            ],
        },
    ]);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append("ujian_id", ujian.data.idujian); // kirim id ujian

        pertanyaanList.forEach((p, i) => {
            formData.append(`pertanyaan[${i}][isi]`, p.isi);
            if (p.gambar) formData.append(`pertanyaan[${i}][gambar]`, p.gambar);

            p.jawabanList.forEach((j, jIndex) => {
                formData.append(`pertanyaan[${i}][jawaban][${jIndex}][isi]`, j.isi);
                if (j.gambar) formData.append(`pertanyaan[${i}][jawaban][${jIndex}][gambar]`, j.gambar);
                formData.append(`pertanyaan[${i}][jawaban][${jIndex}][benar]`, j.benar ? "1" : "0");
            });
        });

        router.post("/guru/soal", formData);
    };

    const tambahPertanyaan = () => {
        setPertanyaanList([
            ...pertanyaanList,
            {
                isi: "",
                gambar: null,
                jawabanList: [
                    { isi: "", gambar: null, benar: true },
                    { isi: "", gambar: null, benar: false },
                ],
            },
        ]);
    };

    const tambahJawaban = (indexPertanyaan) => {
        const newList = [...pertanyaanList];
        newList[indexPertanyaan].jawabanList.push({
            isi: "",
            gambar: null,
            benar: false,
        });
        setPertanyaanList(newList);
    };

    const setJawabanBenar = (indexPertanyaan, indexJawaban) => {
        const newList = [...pertanyaanList];
        newList[indexPertanyaan].jawabanList = newList[indexPertanyaan].jawabanList.map((j, i) => ({
            ...j,
            benar: i === indexJawaban,
        }));
        setPertanyaanList(newList);
    };

    console.log(ujian.data.idujian)

    return (
        <GuruAuthenticatedLayout>
            <div className="p-5 space-y-10">
                {pertanyaanList.map((pertanyaan, indexP) => (
                    <div key={indexP} className="space-y-10 border-b-4 border-gray-800 pb-5">
                        <div className="flex items-start gap-3">
                            <div className="pt-2 font-bold">No. {indexP + 1}</div>
                            <div className="flex-1 space-y-2">
                                <ReactQuill
                                    value={pertanyaan.isi}
                                    onChange={(val) => {
                                        const newList = [...pertanyaanList];
                                        newList[indexP].isi = val;
                                        setPertanyaanList(newList);
                                    }}
                                />
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id={`gambar-pertanyaan-${indexP}`}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const newList = [...pertanyaanList];
                                                newList[indexP].gambar = file;
                                                setPertanyaanList(newList);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`gambar-pertanyaan-${indexP}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
                                    >
                                        Pilih Gambar
                                    </label>
                                    <span className="text-sm text-gray-600">
                                        {pertanyaan.gambar?.name || "Tidak ada gambar yang terpilih"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Jawaban */}
                        <div className="ps-12 space-y-10">
                            {pertanyaan.jawabanList.map((jawaban, indexJ) => (
                                <div key={indexJ} className="flex gap-4 items-start">
                                    <div className="pt-2 font-bold">{String.fromCharCode(65 + indexJ)}.</div>
                                    <div className="flex-1 space-y-2">
                                        <ReactQuill
                                            value={jawaban.isi}
                                            onChange={(val) => {
                                                const newList = [...pertanyaanList];
                                                newList[indexP].jawabanList[indexJ].isi = val;
                                                setPertanyaanList(newList);
                                            }}
                                        />
                                        <div className="flex gap-3 items-center">
                                            <input
                                                type="file"
                                                className="hidden"
                                                id={`gambar-jawaban-${indexP}-${indexJ}`}
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const newList = [...pertanyaanList];
                                                        newList[indexP].jawabanList[indexJ].gambar = file;
                                                        setPertanyaanList(newList);
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor={`gambar-jawaban-${indexP}-${indexJ}`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
                                            >
                                                Pilih Gambar
                                            </label>
                                            <span className="text-sm text-gray-600">
                                                {jawaban.gambar?.name || "Tidak ada gambar yang terpilih"}
                                            </span>

                                            <div className="flex items-center gap-2 ps-4 border-2 border-blue-500 px-3 py-1 rounded-xl">
                                                <input
                                                    type="radio"
                                                    name={`benar-${indexP}`}
                                                    checked={jawaban.benar}
                                                    onChange={() => setJawabanBenar(indexP, indexJ)}
                                                />
                                                <label className="text-sm">Atur Sebagai Jawaban</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => tambahJawaban(indexP)}
                                className="px-4 py-2 bg-yellow-400 text-white rounded-md cursor-pointer hover:bg-yellow-500 transition"
                            >
                                Tambah Jawaban
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex flex-row justify-between">
                    <button
                        onClick={tambahPertanyaan}
                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Tambah Pertanyaan
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-10 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        Simpan
                    </button>
                </div>
            </div>

        </GuruAuthenticatedLayout>
    );
};
export default EditSoal;
