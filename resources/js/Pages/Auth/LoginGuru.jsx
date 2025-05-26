import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function LoginGuru({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        NIP: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('loginGuru'), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login Guru/Admin" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="NIP" value="Nomor Induk Pegawai" />

                    <TextInput
                        id="NIP"
                        type="text"
                        name="NIP"
                        value={data.NIP}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("NIP", e.target.value)}
                    />

                    <InputError message={errors.NIP} className="mt-2" />
                </div>

                <div className="mt-7">
                    <InputLabel htmlFor="password" value="password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-7 flex items-center justify-center mb-4">
                    <PrimaryButton
                        className="w-full !bg-primary"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
