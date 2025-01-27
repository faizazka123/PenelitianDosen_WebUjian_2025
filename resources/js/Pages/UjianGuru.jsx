import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const UjianGuru = () => {
    const [deskripsi, setDeskripsi] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        mapel: "",
        tahunAjaran: "",
        kelas: "",
        deskripsiUjian: "",
        waktuUjianMulai: "",
        waktuUjianSelesai: "",
        durasi: "",
    });

    const submit = (e) => {
        e.preventDefault();

        data.deskripsiUjian = deskripsi;
        data.durasi = hitungDurasi(
            data.waktuUjianMulai,
            data.waktuUjianSelesai
        );

        console.log(data);

        // post(route("#"), {});
    };

    const hitungDurasi = (mulai, selesai) => {
        const mulaiArray = mulai.split(":");
        const selesaiArray = selesai.split(":");

        const mulaiDate = new Date();
        mulaiDate.setHours(mulaiArray[0], mulaiArray[1], 0, 0); // Set waktu mulai

        const selesaiDate = new Date();
        selesaiDate.setHours(selesaiArray[0], selesaiArray[1], 0, 0); // Set waktu selesai

        const durasiMs = selesaiDate - mulaiDate;

        const durasiMenit = durasiMs / (1000 * 60);

        return durasiMs;
    };
    return (
        <GuruAuthenticatedLayout>
            <Head title="Input Ujian" />
            <form onSubmit={submit}>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="judul"
                        value="Judul Ujian"
                    />
                    <SelectInput
                        id="judul"
                        name="judul"
                        type="text"
                        value={data.judul}
                        isFocused={true}
                        className="w-full ps-5"
                        options={[
                            { value: "kuis", label: "Kuis" },
                            { value: "uts", label: "UTS" },
                            { value: "uas", label: "UAS" },
                        ]}
                        onChange={(e) => setData("judul", e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="mapel"
                        value="Mata Pelajaran"
                    />
                    <TextInput
                        id="mapel"
                        name="mapel"
                        type="text"
                        value={data.mapel}
                        className="w-full ps-5"
                        placeholder="Inputkan Mata Pelajaran"
                        onChange={(e) => setData("mapel", e.target.value)}
                    />
                </div>
                <div className="flex w-full gap-10 mb-5">
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="tahunAjaran"
                            value="Tahun Ajaran"
                        />
                        <TextInput
                            id="tahunAjaran"
                            name="tahunAjaran"
                            type="text"
                            value={data.tahunAjaran}
                            className="w-full ps-5"
                            placeholder="Inputkan Tahun Ajaran"
                            onChange={(e) =>
                                setData("tahunAjaran", e.target.value)
                            }
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="kelas"
                            value="Kelas"
                        />
                        <TextInput
                            id="kelas"
                            name="kelas"
                            type="text"
                            value={data.kelas}
                            className="w-full ps-5"
                            placeholder="Inputkan Kelas"
                            onChange={(e) => setData("kelas", e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="deskripsiUjian"
                        value="Deskripsi Ujian"
                    />
                    <ReactQuill
                        id="deskripsiUjian"
                        name="deskripsiUjian"
                        theme="snow"
                        value={deskripsi}
                        onChange={setDeskripsi}
                    />
                </div>
                <div className="flex w-full mb-5">
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="waktuUjianMulai"
                            value="Waktu Ujian Mulai"
                        />
                        <TextInput
                            id="waktuUjianMulai"
                            name="waktuUjianMulai"
                            type="time"
                            value={data.waktuUjianMulai}
                            className="w-full ps-5"
                            onChange={(e) =>
                                setData("waktuUjianMulai", e.target.value)
                            }
                        />
                    </div>
                    <div className="w-1/6 bg-disable mt-9 flex items-center justify-center">
                        <div className="font-bold">SD</div>
                    </div>
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="waktuUjianSelesai"
                            value="Waktu Ujian Selesai"
                        />
                        <TextInput
                            id="waktuUjianSelesai"
                            name="waktuUjianSelesai"
                            type="time"
                            value={data.waktuUjianSelesai}
                            className="w-full ps-5"
                            onChange={(e) =>
                                setData("waktuUjianSelesai", e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-10">
                    <PrimaryButton className="!px-10">Batal</PrimaryButton>
                    <PrimaryButton
                        className="!px-10 !bg-hijau"
                        disabled={processing}
                    >
                        Simpan
                    </PrimaryButton>
                </div>
            </form>
        </GuruAuthenticatedLayout>
    );
};
export default UjianGuru;
