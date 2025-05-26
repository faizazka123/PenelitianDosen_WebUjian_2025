import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

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

export const columnsTabel3 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            sortable: true,
            filterable: true,
        },
        {
            name: "NIP",
            selector: (row) => row.nip,
            sortable: true,
        },
        {
            name: "Password",
            selector: (row) => row.password,
            sortable: true,
            filterable: true,
        },
        {
            name: "Aksi",
            cell: (row) => {
                const handleDelete = () => {
                    Swal.fire({
                        title: `Apakah yakin ingin menghapus akun ${row.nama}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#D01E1E",
                        cancelButtonColor: "#585858",
                        confirmButtonText: "Iya",
                        cancelButtonText: "Tidak",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.delete(route("guru.guruHapus", row.nip), {
                                onSuccess: () => {
                                    Swal.fire({
                                        title: "Berhasil!",
                                        text: "Akun Guru Berhasil Dihapus",
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton: false,
                                    });
                                },
                            });
                        }
                    });
                };

                return (
                    <div className="flex gap-5">
                        <Link href={route('guru.guruEdit', row.nip)}>
                            <img
                                src={`${window.LARAVEL_URL}/material_edit.png`}
                                width={25}
                            />
                        </Link>
                        <button onClick={handleDelete}>
                            <img
                                src={`${window.LARAVEL_URL}/material_delete.png`}
                                width={25}
                                alt="Hapus"
                            />
                        </button>
                    </div>
                );
            },
        },
    ];
    return columns;
};
export const columnsTabel4 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            sortable: true,
            filterable: true,
        },
        {
            name: "NIS",
            selector: (row) => row.nis,
            sortable: true,
        },
        {
            name: "Kelas",
            selector: (row) => row.kelas,
            sortable: true,
        },
        {
            name: "Password",
            selector: (row) => row.password,
            sortable: true,
            filterable: true,
        },
        {
            name: "Aksi",
            cell: (row) => {
                const handleDelete = () => {
                    Swal.fire({
                        title: `Apakah yakin ingin menghapus akun ${row.nama}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#D01E1E",
                        cancelButtonColor: "#585858",
                        confirmButtonText: "Iya",
                        cancelButtonText: "Tidak",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.delete(route("guru.siswaHapus", row.id), {
                                onSuccess: () => {
                                    Swal.fire({
                                        title: "Berhasil!",
                                        text: "Akun Siswa Berhasil Dihapus",
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton: false,
                                    });
                                },
                            });
                        }
                    });
                };

                return (
                    <div className="flex gap-5">
                        <Link href={route('guru.siswaEdit', row.id)}>
                            <img
                                src={`${window.LARAVEL_URL}/material_edit.png`}
                                width={25}
                            />
                        </Link>
                        <button onClick={handleDelete}>
                            <img
                                src={`${window.LARAVEL_URL}/material_delete.png`}
                                width={25}
                                alt="Hapus"
                            />
                        </button>
                    </div>
                );
            },
        },
    ];
    return columns;
};

export const columnsTabel5 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Mata Pelajaran",
            selector: (row) => row.mp,
            sortable: true,
            filterable: true,
        },
        {
            name: "Judul",
            selector: (row) => row.judul,
            sortable: true,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahunAjaran,
            sortable: true,
        },
        {
            name: "Detail",
            cell: (row) => (
                // console.log(row)
                <a href={route('guru.detail', row.id)}>
                    <button
                        className={`px-4 py-2 rounded-md bg-blue-500 text-white`}
                    >
                        Detail
                    </button>
                </a>
            ),
        },
        {
            name: "Tambah Soal",
            cell: (row) => {
                return (
                    <a href={route('guru.soal', row.id)}>
                        <button
                            className={`px-4 py-2 rounded-md bg-yellow-400 text-white`}
                        >
                            Soal
                        </button>
                    </a>

                )
            },
        },
        {
            name: "Generate Code",
            cell: (row) => {
                return (
                    <a href={route(row.kodeUjian ? 'guru.kode' : 'guru.generate', row.id)}>
                        <button
                            className={`px-4 py-2 rounded-md bg-green-500 text-white`}
                        >
                            Generate
                        </button>
                    </a>
                )
            },
        },
        {
            name: "Aksi",
            cell: (row) => {
                const handleDelete = () => {
                    Swal.fire({
                        title: `Apakah yakin ingin menghapus ujian ini?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#D01E1E",
                        cancelButtonColor: "#585858",
                        confirmButtonText: "Iya",
                        cancelButtonText: "Tidak",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.delete(route("guru.hapusUjian", row.id), {
                                onSuccess: () => {
                                    Swal.fire({
                                        title: "Berhasil!",
                                        text: "Akun Siswa Berhasil Dihapus",
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton: false,
                                    });
                                },
                            });
                        }
                    });
                };

                return (
                    <div className="flex gap-5">
                        <Link href={route('guru.editUjian', row.id)}>
                            <img
                                src={`${window.LARAVEL_URL}/material_edit.png`}
                                width={25}
                            />
                        </Link>
                        <button onClick={handleDelete}>
                            <img
                                src={`${window.LARAVEL_URL}/material_delete.png`}
                                width={25}
                                alt="Hapus"
                            />
                        </button>
                    </div>
                );
            },
        },
    ];
    return columns;
};

export const columnsTabel6 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Mata Pelajaran",
            selector: (row) => row.mp,
            sortable: true,
            filterable: true,
        },
        {
            name: "Judul",
            selector: (row) => row.judul,
            sortable: true,
        },
        {
            name: "Tahun Ajaran",
            selector: (row) => row.tahunAjaran,
            sortable: true,
        },
        {
            name: "Detail Ujian",
            cell: (row) => (
                // console.log(row)
                <a href={route('guru.detail', row.id)}>
                    <button
                        className={`px-4 py-2 rounded-md bg-blue-500 text-white`}
                    >
                        Detail
                    </button>
                </a>
            ),
        },
        {
            name: "Detail Soal",
            cell: (row) => {
                return (
                    <a href={route('guru.detailNilai', row.id)}>
                        <button
                            className={`px-4 py-2 rounded-md bg-yellow-400 text-white`}
                        >
                            Detail
                        </button>
                    </a>

                )
            },
        }
    ];
    return columns;
};

export const columnsTabel7 = () => {
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            sortable: true,
            filterable: true,
        },
        {
            name: "Nilai",
            selector: (row) => row.nilai,
            sortable: true,
            filterable: true,
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