import "react-quill/dist/quill.snow.css";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import ReactQuill from "react-quill";

const TambahUjian = ({ mapels }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        idMapel: "",
        kelas: "",
        tahunAjaran: "",
        deskripsi: "",
        jamAwal: "",
        jamAkhir: "",
    })

    const submit = (e) => {
        e.preventDefault();

        if (data.jamAkhir <= data.jamAwal) {
            alert("Jam akhir harus lebih besar dari jam awal");
            return;
        }

        if (!data.judul || !data.idMapel) {
            alert("Mohon pilih judul ujian dan mata pelajaran terlebih dahulu.");
            return;
        }

        post(route('guru.storeUjian'))
    }

    return (
        <GuruAuthenticatedLayout>
            <form onSubmit={submit}>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="judul"
                        value="Judul Ujian"
                    />
                    <select
                        id="judul"
                        name="judul"
                        value={data.judul}
                        onChange={(e) => setData("judul", e.target.value)}
                        className={`w-full ps-5 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                            ${data.judul === "" ? "text-gray-500" : "text-black"}`}
                    >
                        <option value="" hidden>
                            Pilih jenis ujian
                        </option>
                        <option value="Kuis">Kuis</option>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
                    </select>
                    <InputError message={errors.judul} className="mt-2" />
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="idMapel"
                        value="Mata Pelajaran"
                    />
                    <select
                        id="idMapel"
                        name="idMapel"
                        value={data.idMapel}
                        onChange={(e) => setData("idMapel", e.target.value)}
                        className={`w-full ps-5 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                            ${data.idMapel === "" ? "text-gray-500" : "text-black"}`}
                    >
                        <option value="" hidden>Pilih Mata Pelajaran</option>
                        {mapels.data.map((mapel) => (
                            <option key={mapel.idMapel} value={mapel.idMapel}>
                                {mapel.nama}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.idMapel} className="mt-2" />
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
                            placeholder="Contoh: 2024/2025"
                            onChange={(e) => setData("tahunAjaran", e.target.value)}
                        />
                        <InputError message={errors.tahunAjaran} className="mt-2" />

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
                            onChange={(e) =>
                                setData("kelas", e.target.value)
                            }
                        />
                        <InputError message={errors.kelas} className="mt-2" />
                    </div>
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="deskripsi"
                        value="Deskripsi Ujian"
                    />
                    <div className="rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-indigo-500 bg-white">
                        <ReactQuill
                            id="deskripsi"
                            theme="snow"
                            value={data.deskripsi}
                            onChange={(value) => setData("deskripsi", value)}
                            placeholder="Inputkan deskripsi ujian"
                            className="bg-white"
                        />
                    </div>
                    <InputError message={errors.deskripsi} className="mt-2" />
                </div>
                <div className="w-full">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        value="Waktu Ujian"
                    />
                    <div className="flex focus:border-indigo-500 focus:ring-indigo-500 w-full items-center border-gray-300 shadow-sm rounded-md border overflow-hidden mb-5">
                        <input
                            type="time"
                            id="jamAwal"
                            name="jamAwal"
                            value={data.jamAwal}
                            onChange={(e) => setData("jamAwal", e.target.value)}
                            className="w-full text-center py-2 border-none focus:outline-none"
                        />

                        <div className="w-24 text-center font-bold bg-gray-200 py-2">
                            SD
                        </div>

                        <input
                            type="time"
                            id="jamAkhir"
                            name="jamAkhir"
                            value={data.jamAkhir}
                            onChange={(e) => setData("jamAkhir", e.target.value)}
                            className="w-full text-center py-2 border-none focus:outline-none"
                            placeholder="Jam selesai"
                        />
                    </div>
                    <InputError message={errors.jamAwal} className="mt-2" />
                    <InputError message={errors.jamAkhir} className="mt-2" />
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
export default TambahUjian;
