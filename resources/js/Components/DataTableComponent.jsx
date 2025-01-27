import DataTable from "react-data-table-component";
import { columnsTabel } from "@/utils/constants";

const DataTableComponent = () => {
    const customStyles = {
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#202124",
            },
        },
    };
    const columns = columnsTabel();

    const data = [
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
