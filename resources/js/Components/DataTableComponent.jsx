import DataTable from "react-data-table-component";
import {
    columnsTabel,
    columnsTabel1,
    columnsTabel2,
    columnsTabel3,
    columnsTabel4,
} from "@/utils/constants";

const DataTableComponent = ({ page = "daftarUjian" }) => {
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

        data = [
            {
                nama: "Dharma",
                nip: "22424323",
                password: "apaya",
            },
            {
                nama: "apa",
                nip: "341231",
                password: "apayaaa",
            },
        ];
    } else if (page == "adminSiswa") {
        columns = columnsTabel4();

        data = [
            {
                nama: "Dharma",
                nis: "22424323",
                kelas: "3TIF",
                password: "apaya",
            },
            {
                nama: "apa",
                nis: "341231",
                kelas: "3TIF",
                password: "apayaaa",
            },
        ];
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
