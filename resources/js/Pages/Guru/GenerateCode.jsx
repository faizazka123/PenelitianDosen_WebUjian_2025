import "react-quill/dist/quill.snow.css";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";

const GenerateCode = ({ ujian }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        kuota: ujian.data.kuota ?? ''
    })

    console.log(ujian)
    const submit = (e) => {
        e.preventDefault();

        if (!data.kuota || data.kuota <= 0) {
            alert("Masukkan kuota yang valid");
            return;
        }

        post(route('guru.storeKode', ujian.data.idujian));
    };

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col justify-center items-center gap-5 px-24">
                <div className="max-w-full w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col border-b-2 border-gray-200 py-5 ps-5">
                        <h5 className="text-xl ps-5 font-bold tracking-tight text-gray-800">
                            Generate Code
                        </h5>
                    </div>
                    <div className="p-5">
                        <form onSubmit={submit}>
                            <div className="mb-5">
                                <InputLabel
                                    className="!font-bold mb-2 !text-lg"
                                    htmlFor="kuota"
                                    value="Kuota Ujian"
                                />
                                <TextInput
                                    id="kuota"
                                    name="kuota"
                                    type="number"
                                    className="w-full ps-5"
                                    placeholder="Inputkan Jumlah Kuota Ujian"
                                    value={data.kuota}
                                    onChange={(e) => setData("kuota", e.target.value)}
                                />
                                <InputError message={errors.judul} className="mt-2" />
                            </div>

                            <div className="flex justify-end gap-10">
                                <a href={route('guru.daftar')}>
                                    <PrimaryButton className="!px-10">Batal</PrimaryButton>
                                </a>

                                <PrimaryButton
                                    className="!px-10 !bg-hijau"
                                    disabled={processing}
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>

                        <div className="mt-5 flex justify-end">

                        </div>
                    </div>
                </div>
            </div>

        </GuruAuthenticatedLayout>
    );
};
export default GenerateCode;
