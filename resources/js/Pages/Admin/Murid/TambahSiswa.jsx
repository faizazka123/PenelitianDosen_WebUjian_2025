import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import CardGuru from "@/Components/CardGuru";
import CardTambahAkun from "@/Components/CardTambahAkun";
import FormNambahAkun from "@/Components/FormNambahAkun";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const TambahSiswa = ({ }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        password: "",
        konfirmasiPassword: "",
        nis: "",
        kelas: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('guru.siswaStore'))
    };

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
                    <InputError />
                </div>
                <div className="flex w-full gap-10 mb-5">
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="nis"
                            value="NIS"
                        />
                        <TextInput
                            id="nis"
                            name="nis"
                            type="number"
                            value={data.nis}
                            className="w-full ps-5"
                            placeholder="Inputkan NIS"
                            onChange={(e) => setData("nis", e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="kelas"
                            value="Kelas"
                        />
                        <TextInput
                            id="kelas"
                            name="kelas"
                            type="text"
                            value={data.kelas}
                            className="w-full ps-5"
                            placeholder="Inputkan kelas"
                            onChange={(e) =>
                                setData("kelas", e.target.value)
                            }
                        />
                    </div>
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
                        onChange={(e) =>
                            setData("konfirmasiPassword", e.target.value)
                        }
                    />
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



            {/* <form onSubmit={submit}>
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
                <div className="flex w-full gap-10 mb-5">
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="nis"
                            value="NIS"
                        />
                        <TextInput
                            id="nis"
                            name="nis"
                            type="number"
                            value={data.nis}
                            className="w-full ps-5"
                            placeholder="Inputkan NIS"
                            onChange={(e) => setData("nis", e.target.value)}
                        />
                        <InputError message={errors.nis} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            className="!font-bold mb-2 !text-lg"
                            htmlFor="kelas"
                            value="Kelas"
                        />
                        <TextInput
                            id="kelas"
                            name="kelas"
                            type="text"
                            value={data.kelas}
                            className="w-full ps-5"
                            placeholder="Inputkan kelas"
                            onChange={(e) =>
                                setData("kelas", e.target.value)
                            }
                        />
                        <InputError message={errors.kelas} className="mt-2" />
                    </div>
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
                        onChange={(e) =>
                            setData("konfirmasiPassword", e.target.value)
                        }
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
            </form> */}
        </AdminAuthenticatedLayout>
    );
};
export default TambahSiswa;
