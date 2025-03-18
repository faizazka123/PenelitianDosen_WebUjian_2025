import PrimaryButton from "@/Components/PrimaryButton";
import { Link } from "@inertiajs/react";

export const columnsTabel = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Mata Pelajaran",
            selector: (row) => row.mapel,
            sortable: true,
            filterable: true,
        },
        {
            name: "Judul",
            selector: (row) => row.judulKuis,
            sortable: true,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahunAjaran,
            sortable: true,
            filterable: true,
        },
        {
            name: "Detail",
            cell: (row) => {
                return (
                    <PrimaryButton className="bg-primary px-10 !py-1 w-full">
                        Detail
                    </PrimaryButton>
                );
            },
        },
        {
            name: "Tambah Soal",
            cell: (row) => {
                return (
                    <PrimaryButton className="bg-kuning px-10 !py-1 w-full">
                        Detail
                    </PrimaryButton>
                );
            },
        },
        {
            name: "Generate Code",
            cell: (row) => {
                return (
                    <PrimaryButton className="bg-hijau px-10 !py-1 w-full">
                        Generate
                    </PrimaryButton>
                );
            },
        },
        {
            name: "Aksi",
            cell: (row) => {
                return (
                    <div className="flex gap-5">
                        <Link>
                            <img
                                src={`${window.LARAVEL_URL}/material_edit.png`}
                                width={25}
                            />
                        </Link>
                        <Link>
                            <img
                                src={`${window.LARAVEL_URL}/material_delete.png`}
                                width={25}
                            />
                        </Link>
                    </div>
                );
            },
        },
    ];
    return columns;
};

export const columnsTabel1 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Mata Pelajaran",
            selector: (row) => row.mapel,
            sortable: true,
            filterable: true,
        },
        {
            name: "Jenis",
            selector: (row) => row.jenis,
            sortable: true,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahunAjaran,
            sortable: true,
            filterable: true,
        },
        {
            name: "Detail Ujian",
            cell: (row) => {
                return (
                    <PrimaryButton className="bg-primary px-10 !py-1 w-full">
                        Detail
                    </PrimaryButton>
                );
            },
        },
        {
            name: "Detail Nilai",
            cell: (row) => {
                return (
                    <PrimaryButton className="bg-kuning px-10 !py-1 w-full">
                        Detail
                    </PrimaryButton>
                );
            },
        },
    ];
    return columns;
};

export const columnsTabel2 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Nama Siswa",
            selector: (row) => row.nama,
            sortable: true,
            filterable: true,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai,
            sortable: true,
        },
        {
            name: "Jumlah Benar",
            selector: (row) => row.jumlahBenar,
            sortable: true,
            filterable: true,
        },
        {
            name: "Jumlah Salah",
            selector: (row) => row.jumlahSalah,
            sortable: true,
            filterable: true,
        },
    ];
    return columns;
};
