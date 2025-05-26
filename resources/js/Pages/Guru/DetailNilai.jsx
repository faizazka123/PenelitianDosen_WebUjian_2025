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

const DetailNilai = ({ kerjas }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // console.log(kerjas);
    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col gap-5 w-11/12">
                <TextInput
                    className="w-full bg-abu"
                    placeholder="Cari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="font-bold -mb-5">Detail Nilai</p>
                <DataTableComponent
                    page="detailNilaiGuru"
                    dataKerjas={kerjas}
                    searchTerm={searchTerm}
                />
            </div>
        </GuruAuthenticatedLayout>
    );
};
export default DetailNilai;
