import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import DataTableComponent from "@/Components/DataTableComponent";
const DashboardGuru = () => {
    return (
        <GuruAuthenticatedLayout>
            <div className="flex gap-10 mb-10">
                <CardGuru background="bg-biru_tua" title="Jumlah Ujian Aktif" />
                <CardGuru
                    background="bg-biru_muda"
                    title="Jumlah Ujian Menunggu"
                />
            </div>
            <div className="font-bold flex">
                <p>Daftar Mata pelajaran</p>
                <p className="ms-auto text-primary">More</p>
            </div>
            <DataTableComponent />
        </GuruAuthenticatedLayout>
    );
};
export default DashboardGuru;
