import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import CardGuru from "@/Components/CardGuru";
import DataTableComponent from "@/Components/DataTableComponent";
const DashboardGuru = () => {
    const user = usePage().props.auth.user;
    return (
        <GuruAuthenticatedLayout>
            <div className="flex items-center gap-3 font-bold mb-4">
                <img src={`${LARAVEL_URL}/profileGuru.png`} />
                Selamat Datang, {user.nama}!
            </div>
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
