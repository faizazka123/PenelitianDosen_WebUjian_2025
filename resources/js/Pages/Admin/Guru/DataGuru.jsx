import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import DataTableComponent from "@/Components/DataTableComponent";
import PrimaryButton from "@/Components/PrimaryButton";
import * as XLSX from "xlsx";
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { router, useForm, usePage } from "@inertiajs/react";

const DataGuru = ({ gurus }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        NIP: '',
        password: '',
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.successGuruImport) {
            Swal.fire({
                title: "Berhasil!",
                text: flash.successGuruImport,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }, [flash.successGuruImport]);

    const [searchTerm, setSearchTerm] = useState("");
    const [opsiTambahSoal, setOpsiTambahSoal] = useState(null);
    const [fileName, setFileName] = useState("");
    const [soal, setSoal] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (soal.length === 0) return;

        console.log(soal)

        router.post(route("guru.importGuru"), {
            guruList: soal,
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            onSuccess: () => {
                setOpsiTambahSoal(null); // kembali ke daftar
                setSoal([]);                 // reset soal
                setFileName("");             // reset file
            },
            preserveScroll: true,
            onError: (err) => {
                console.log("Error:", err);
            },
        });
    };

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

    const handleDownload = () => {
        const fileUrl = "/template/tambahGuru.xlsx"; // URL ke file di public/
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "templateGuru.xlsx"); // Nama file saat didownload
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AdminAuthenticatedLayout>
            {opsiTambahSoal == "excel" && (
                <div>
                    <div className="flex float-right items-center">
                        <Icon
                            icon="vscode-icons:file-type-excel2"
                            width="52"
                            height="52"
                        />
                        <button
                            onClick={handleDownload}
                            className="w-full ms-5 bg-primary font-bold rounded-lg text-white py-1 px-5"
                        >
                            Download Template
                        </button>
                    </div>
                    <div className="border-b-2 border-abu py-5 ps-5">
                        <h5 className="text-xl font-bold tracking-tight">
                            Import Akun
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

            {opsiTambahSoal == null && (
                <div className="flex flex-col gap-5 w-11/12">
                    <TextInput
                        className="w-full bg-abu"
                        placeholder="Cari..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <p className="font-bold -mb-5">Akun Guru</p>
                    <div className="flex justify-end gap-5">
                        <a href={route("guru.tambahGuru")}>
                            <PrimaryButton className="bg-primary !text-sm">
                                Tambah Akun
                            </PrimaryButton>
                        </a>
                        <PrimaryButton className="bg-kuning !text-sm"
                            onClick={() => setOpsiTambahSoal("excel")}>
                            Import Akun
                        </PrimaryButton>
                    </div>
                    <DataTableComponent
                        page="adminGuru"
                        dataGurus={gurus}
                        searchTerm={searchTerm}
                    />
                </div>
            )}
        </AdminAuthenticatedLayout>
    );
};
export default DataGuru;
