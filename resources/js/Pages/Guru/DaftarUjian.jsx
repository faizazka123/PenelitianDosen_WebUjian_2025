import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DataTableComponent from "@/Components/DataTableComponent";
import TextInput from "@/Components/TextInput";
import DaftarUjianCard from "@/Components/DaftarUjianCard";
import Notifikasi from "./Notifikasi";

const DaftarUjian = () => {
    return (
        <GuruAuthenticatedLayout>
            <div className="mt-10 mb-10">
                <TextInput className="w-full bg-abu" placeholder="Cari..." />
            </div>
            <p className="font-bold -mb-5">Daftar Ujian</p>
            <DataTableComponent />
            {/* <DaftarUjianCard />
            <Notifikasi /> */}
        </GuruAuthenticatedLayout>
    );
};
export default DaftarUjian;
