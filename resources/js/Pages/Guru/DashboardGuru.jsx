import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import DataTableComponent from "@/Components/DataTableComponent";
import { Link } from "@inertiajs/react";
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
                <Link href="#" className="ms-auto text-primary">
                    More
                </Link>
            </div>
            <DataTableComponent />
        </GuruAuthenticatedLayout>
    );
};
export default DashboardGuru;
