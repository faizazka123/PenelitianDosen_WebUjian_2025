import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
import FormNambahAkun from "@/Components/FormNambahAkun";
import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const EditGuru = ({ guru }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        nama: guru.data.nama || '',
        NIP: guru.data.NIP || '',
        password: '',
        konfirmasiPassword: '',
    })

    const submit = (e) => {
        e.preventDefault();

        put(route('guru.guruUpdate', guru.data.NIP))
    }

    return (
        <AdminAuthenticatedLayout>
            <form onSubmit={submit}>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="nama"
                        value="Nama"
                    />
                    <TextInput
                        id="nama"
                        name="nama"
                        type="text"
                        value={data.nama}
                        className="w-full ps-5"
                        placeholder="Inputkan Nama"
                        onChange={(e) => setData("nama", e.target.value)}
                    />
                    <InputError message={errors.nama} className="mt-2" />
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="nip"
                        value="NIP"
                    />
                    <TextInput
                        id="nip"
                        name="nip"
                        type="number"
                        value={data.NIP}
                        className="w-full ps-5"
                        placeholder="Inputkan NIP"
                        onChange={(e) => setData("NIP", e.target.value)}
                    />
                    <InputError message={errors.NIP} className="mt-2" />
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="password"
                        value="Password"
                    />
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        className="w-full ps-5"
                        placeholder="Inputkan password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mb-5">
                    <InputLabel
                        className="!font-bold mb-2 !text-lg"
                        htmlFor="konfirmasiPassword"
                        value="Konfirmasi Password"
                    />
                    <TextInput
                        id="konfirmasiPassword"
                        name="konfirmasiPassword"
                        type="password"
                        value={data.konfirmasiPassword}
                        className="w-full ps-5"
                        placeholder="Inputkan password kembali"
                        onChange={(e) => setData("konfirmasiPassword", e.target.value)}
                    />
                    <InputError message={errors.konfirmasiPassword} className="mt-2" />
                </div>
                <div className="flex justify-end gap-10">
                    <PrimaryButton className="!px-10">Batal</PrimaryButton>

                    <PrimaryButton
                        className="!px-10 !bg-hijau"
                        disabled={processing}
                    >
                        Simpan
                    </PrimaryButton>
                </div>
            </form>
        </AdminAuthenticatedLayout>
    );
};
export default EditGuru;
