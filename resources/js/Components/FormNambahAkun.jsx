import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-quill/dist/quill.snow.css";
import InputError from "./InputError";

const FormNambahAkun = ({ akun = "guru" }) => {
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
        <>
            <Head title="Input Ujian" />
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
                {akun == "guru" && (
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
                    </div>
                )}
                {akun == "siswa" && (
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

                )}
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
        </ >
    );
};
export default FormNambahAkun;
