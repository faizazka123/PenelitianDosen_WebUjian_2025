import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DataTableComponent from "@/Components/DataTableComponent";
import PrimaryButton from "@/Components/PrimaryButton";
import * as XLSX from "xlsx";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { router, useForm } from "@inertiajs/react";


const ImportSoal = ({ ujian }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        router.post(`/guru/ujian/${ujian.data.idujian}/soal/import`, formData, {
            onSuccess: () => setMessage('File berhasil diupload!'),
            onError: () => setMessage('Gagal mengupload file.'),
        });
    };

    const handleDownload = () => {
        const fileUrl = '/template/templateSoal.xlsx';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'templateSoal.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <GuruAuthenticatedLayout>
            <div>
                <div className="flex float-right items-center">
                    <Icon icon="vscode-icons:file-type-excel2" width="52" height="52" />
                    <button onClick={handleDownload} className="w-full ms-5 bg-primary font-bold rounded-lg text-white py-1 px-5">
                        Download Template
                    </button>
                </div>
                <div className="border-b-2 border-abu py-5 ps-5">
                    <h5 className="text-xl font-bold tracking-tight">Import Soal</h5>
                </div>
                <div className="mt-5 py-10 px-10 flex flex-col items-center gap-5">
                    <p>Import File Excel</p>
                    <form onSubmit={handleFileUpload} className="w-2/6">
                        <div className="border-[0.1rem] p-2 flex">
                            <label htmlFor="soal" className="block border text-sm font-medium cursor-pointer bg-abu py-1 px-8 rounded-md text-center">
                                Pilih File
                            </label>
                            <input id="soal" name="soal" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileChange} />
                            {fileName && (
                                <p className="mt-1 text-sm text-[#429AE5] font-bold underline ms-1 pe-2">{fileName}</p>
                            )}
                        </div>
                        <div className="flex gap-[5rem] mt-5">
                            <button type="button" className="w-full bg-abu_tua font-bold rounded-lg text-white py-1 px-10" onClick={() => setFile(null)}>
                                Tutup
                            </button>
                            <button type="submit" className="w-full bg-hijau font-bold rounded-lg text-white py-1 px-10">
                                Import
                            </button>
                        </div>
                    </form>
                    {message && <p className="text-green-600">{message}</p>}
                </div>
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default ImportSoal;
