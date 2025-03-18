import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import DataTableComponent from "@/Components/DataTableComponent";
import TextInput from "@/Components/TextInput";

const LaporanNilai = () => {
    return (
        <GuruAuthenticatedLayout>
            <div className="mt-10 mb-10">
                <TextInput className="w-full bg-abu" placeholder="Cari..." />
            </div>
            <p className="font-bold -mb-5">Laporan Nilai</p>
            <DataTableComponent page="laporanNilai" />
            <DataTableComponent page="NilaiMurid" />
        </GuruAuthenticatedLayout>
    );
};
export default LaporanNilai;
