import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
const DashboardAdmin = ({jumlahGuru, jumlahSiswa}) => {
    return (
        <AdminAuthenticatedLayout>
            <div className="flex flex-col gap-5 w-11/12">
                <div className="flex flex-col gap-5 w-11/12">
                    <CardGuru background="bg-biru_tua" title="Jumlah Guru" guru={jumlahGuru}/>
                    <CardGuru background="bg-biru_muda" title="Jumlah Siswa" siswa={jumlahSiswa}/>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
};
export default DashboardAdmin;
