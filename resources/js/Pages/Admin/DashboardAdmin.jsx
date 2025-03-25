import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
import TextInput from "@/Components/TextInput";
import DataTableComponent from "@/Components/DataTableComponent";
import PrimaryButton from "@/Components/PrimaryButton";
const DashboardAdmin = () => {
    return (
        // <AdminAuthenticatedLayout>
        //     <div className="flex flex-col gap-5 w-11/12">
        //         <CardGuru background="bg-biru_tua" title="Jumlah Guru" />
        //         <CardGuru background="bg-biru_muda" title="Jumlah Siswa" />
        //     </div>
        // </AdminAuthenticatedLayout>
        // <CardTambahAkun />
        <>
            <div className="mt-10 mb-10">
                <TextInput className="w-full bg-abu" placeholder="Cari..." />
            </div>
            <p className="font-bold -mb-5">Akun Guru</p>
            <div className="flex justify-end gap-5">
                <PrimaryButton className="bg-primary !text-sm">
                    Tambah Akun
                </PrimaryButton>
                <PrimaryButton className="bg-kuning !text-sm">
                    Import Akun
                </PrimaryButton>
            </div>
            <DataTableComponent page="adminGuru" />
            <DataTableComponent page="adminSiswa" />
        </>
    );
};
export default DashboardAdmin;
