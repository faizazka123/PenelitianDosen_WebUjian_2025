import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import DataTableComponent from "@/Components/DataTableComponent";
import PrimaryButton from "@/Components/PrimaryButton";
import * as XLSX from "xlsx";
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { router, useForm, usePage } from "@inertiajs/react";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";

const DaftarUjian = ({ ujians }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col gap-5 w-11/12">
                <TextInput
                    className="w-full bg-abu"
                    placeholder="Cari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="font-bold -mb-5">Daftar Ujian</p>
                <div className="flex justify-end gap-5">
                    <a href={route("guru.ujian")}>
                        <PrimaryButton className="bg-primary !text-sm">
                            + Tambah Ujian
                        </PrimaryButton>
                    </a>
                </div>
                <DataTableComponent
                    page="daftarUjianGuru"
                    dataUjians={ujians}
                    searchTerm={searchTerm}
                />
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default DaftarUjian;
