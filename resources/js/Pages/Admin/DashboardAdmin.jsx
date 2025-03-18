import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
const DashboardAdmin = () => {
    return (
        // <AdminAuthenticatedLayout>
        //     <div className="flex flex-col gap-5 w-11/12">
        //         <CardGuru background="bg-biru_tua" title="Jumlah Guru" />
        //         <CardGuru background="bg-biru_muda" title="Jumlah Siswa" />
        //     </div>
        // </AdminAuthenticatedLayout>
        <CardTambahAkun />
    );
};
export default DashboardAdmin;
