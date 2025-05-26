import DataTable from "react-data-table-component";
import {
    columnsTabel,
    columnsTabel1,
    columnsTabel2,
    columnsTabel3,
    columnsTabel4,
    columnsTabel5,
    columnsTabel6,
    columnsTabel7,
} from "@/utils/constants";

const DataTableComponent = ({ page = "daftarUjian", dataGurus, dataMurids, dataUjians, dataKerjas, searchTerm = "" }) => {
    const customStyles = {
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#202124",
            },
        },
    };
    let columns, data;
    if (page == "daftarUjian") {
        columns = columnsTabel();

        data = [
            {
                mapel: "Matematika",
                judulKuis: "Algebra dan Kalkulus",
                tahunAjaran: "2023/2024",
            },
            {
                mapel: "Fisika",
                judulKuis: "Fisika Dasar",
                tahunAjaran: "2022/2023",
            },
        ];
    } else if (page == "laporanNilai") {
        columns = columnsTabel1();

        data = [
            {
                mapel: "Matematika",
                jenis: "Kuis",
                tahunAjaran: "2023/2024",
            },
            {
                mapel: "Fisika",
                jenis: "UTS",
                tahunAjaran: "2022/2023",
            },
        ];
    } else if (page == "adminGuru") {
        columns = columnsTabel3();

        const allData = dataGurus?.data?.map((guru) => ({
            nama: guru.nama,
            nip: guru.NIP,
            password: 'password',
        })) || [];

        data = allData.filter((guru) =>
            guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guru.nip.toLowerCase().includes(searchTerm.toLowerCase())
        );

    } else if (page == "adminSiswa") {
        columns = columnsTabel4();

        const allData = dataMurids?.data?.map((murid) => ({
            id: murid.id,
            nama: murid.nama,
            nis: murid.nis,
            kelas: murid.kelas,
            password: murid.password,
        })) || [];

        data = allData.filter((murid) =>
            murid.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            murid.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            murid.kelas.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else if (page == "daftarUjianGuru") {
        columns = columnsTabel5();

        const allData = dataUjians?.data?.map((ujian) => ({
            id: ujian.idujian,
            mp: ujian.idMapel.nama,
            judul: ujian.judul,
            kodeUjian: ujian.kodeUjian,
            tahunAjaran: ujian.tahunAjaran,
        })) || [];

        data = allData.filter((ujian) =>
            ujian.mp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ujian.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ujian.tahunAjaran.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else if (page == "daftarNilaiGuru") {
        columns = columnsTabel6();

        const allData = dataUjians?.data?.map((ujian) => ({
            id: ujian.idujian,
            mp: ujian.idMapel.nama,
            judul: ujian.judul,
            kodeUjian: ujian.kodeUjian,
            tahunAjaran: ujian.tahunAjaran,
        })) || [];

        data = allData.filter((ujian) =>
            ujian.mp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ujian.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ujian.tahunAjaran.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log(data);
    } else if (page == "detailNilaiGuru") {
        columns = columnsTabel7();

        const allData = dataKerjas?.data?.map((kerja) => ({
            nama: kerja.idMurid.nama,
            nilai: kerja.nilai,
            jumlahBenar: kerja.jawaban_benar,
            jumlahSalah: kerja.jawaban_salah,
        })) || [];


        data = allData.filter((kerja) =>
            kerja.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(kerja.nilai).toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(kerja.jumlahBenar).toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(kerja.jumlahSalah).toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(data);

    } else {
        columns = columnsTabel2();

        data = [
            {
                nama: "Siapa",
                nilai: 90,
                jumlahBenar: 80,
                jumlahSalah: 76,
            },
            {
                nama: "Siapa",
                nilai: 90,
                jumlahBenar: 80,
                jumlahSalah: 76,
            },
        ];
    }

    return (
        <div className="mt-10 border-1 shadow-xl">
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="320px"
            />
        </div>
    );
};

export default DataTableComponent;
