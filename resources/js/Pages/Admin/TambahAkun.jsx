import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
import FormNambahAkun from "@/Components/FormNambahAkun";
const TambahAkun = ({ utk }) => {
    return (
        <AdminAuthenticatedLayout>
            <FormNambahAkun akun={utk}/>
        </AdminAuthenticatedLayout>
    );
};
export default TambahAkun;
