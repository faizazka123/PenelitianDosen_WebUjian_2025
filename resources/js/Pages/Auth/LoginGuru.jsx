import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function LoginGuru({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nip: "",
        password: "",
        rememberMe: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
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
                    <TextInput
                        id="nip"
                        type="text"
                        name="nip"
                        value={data.nip}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="Nip...."
                        onChange={(e) => setData("nip", e.target.value)}
                    />

                    <InputError message={errors.nip} className="mt-2" />
                </div>

                <div className="mt-7">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        placeholder="Password..."
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-7 flex gap-2">
                    <TextInput
                        id="rememberMe"
                        type="checkbox"
                        name="rememberMe"
                        value={data.rememberMe}
                        className="mt-[0.2rem] block bg-abu_tua"
                        autoComplete="current-password"
                        onChange={(e) => setData("rememberMe", e.target.value)}
                    />
                    <InputLabel htmlFor="rememberMe" value="Ingat Saya" />

                    <InputError message={errors.rememberMe} className="mt-2" />
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
