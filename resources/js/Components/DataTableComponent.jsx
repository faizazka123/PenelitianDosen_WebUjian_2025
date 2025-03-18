import DataTable from "react-data-table-component";
import { columnsTabel, columnsTabel1, columnsTabel2 } from "@/utils/constants";

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
