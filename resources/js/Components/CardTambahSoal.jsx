import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useForm } from "@inertiajs/react";
import FormNambahSoal from "./FormNambahSoal";
import Swal from "sweetalert2";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

export default function CardTambahSoal({ idSoal }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: idSoal,
        soal: [],
    });

    const [soal, setSoal] = useState([]);
    const [fileName, setFileName] = useState("");
    const [opsiTambahSoal, setOpsiTambahSoal] = useState(null);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const abuf = e.target.result;
                const wb = XLSX.read(abuf, { type: "array" });
                const sheet = wb.Sheets[wb.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Menyimpan data ke state
                setSoal(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleManualSubmit = (manualSoal) => {
        setSoal(manualSoal); // Simpan soal dari FormNambahSoal
        setData("soal", manualSoal);
        console.log("Data soal manual:", manualSoal);
        setShouldSubmit(true);
    };

    const handleSubmit = () => {
        if (soal.length === 0) return; // Hindari submit tanpa data soal

        let payload = {
            ...data,
            soal,
        };

        console.log("Submitting data:", payload);
        setIsModalOpen(true);
        // post(route("#"), payload);
    };

    useEffect(() => {
        if (shouldSubmit) {
            handleSubmit();
            setShouldSubmit(false);
        }
    }, [shouldSubmit]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.href = "/guru/dashboard";
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div
                className={`w-full bg-white ${
                    opsiTambahSoal != "manual"
                        ? "border border-gray-200 rounded-lg shadow"
                        : ""
                } `}
            >
                {opsiTambahSoal == null && (
                    <div>
                        <div className="border-b-2 border-abu py-5 ps-5">
                            <h5 className="text-xl font-bold tracking-tight">
                                Soal
                            </h5>
                        </div>
                        <div className="mt-5 py-10 px-10 flex gap-5">
                            <button
                                className="py-5 flex flex-col items-center w-full border border-primary rounded-xl"
                                onClick={() => setOpsiTambahSoal("manual")}
                            >
                                <img src="/iconTambahSoal.png" width={80} />
                                <p>Tambah Soal</p>
                            </button>
                            <button
                                className="py-5 flex flex-col items-center w-full border border-primary rounded-xl"
                                onClick={() => setOpsiTambahSoal("excel")}
                            >
                                <img src="/iconImportSoal.png" width={80} />
                                <p>Import Soal</p>
                            </button>
                        </div>
                    </div>
                )}
                {opsiTambahSoal == "excel" && (
                    <div>
                        <div className="border-b-2 border-abu py-5 ps-5">
                            <h5 className="text-xl font-bold tracking-tight">
                                Import Soal
                            </h5>
                        </div>
                        <div className="mt-5 py-10 px-10 flex flex-col items-center gap-5">
                            <p>Import File Excel</p>
                            <form onSubmit={handleSubmit} className="w-2/6">
                                <div className="border-[0.1rem] p-2 flex">
                                    <label
                                        htmlFor="soal"
                                        className="block border text-sm font-medium cursor-pointer bg-abu py-1 px-8 rounded-md text-center"
                                    >
                                        Pilih File
                                    </label>
                                    <input
                                        id="soal"
                                        name="soal"
                                        type="file"
                                        className="hidden"
                                        accept=".xlsx"
                                        onChange={handleFileUpload}
                                    />
                                    {fileName && (
                                        <p className="mt-1 text-sm text-[#429AE5] font-bold underline ms-1 pe-2 ">
                                            {fileName}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-[5rem] mt-5">
                                    <button
                                        className="w-full bg-abu_tua font-bold rounded-lg text-white py-1 px-10"
                                        onClick={() => setOpsiTambahSoal(null)}
                                    >
                                        Tutup
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full bg-hijau font-bold rounded-lg text-white py-1 px-10"
                                    >
                                        Import
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {opsiTambahSoal == "manual" && (
                    <FormNambahSoal onSave={handleManualSubmit} />
                )}
            </div>
            <Modal maxWidth="md" show={isModalOpen}>
                <div className="p-6 flex flex-col items-center">
                    <Icon
                        icon="icons8:checked"
                        width="100"
                        height="100"
                        className="text-hijau"
                    />
                    <h2 className="text-xl text-center">
                        Soal Berhasil Tersimpan
                    </h2>
                    <div className="mt-5">
                        <button
                            onClick={handleCloseModal}
                            className="bg-abu_tua text-white font-bold py-2 px-10 rounded"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
