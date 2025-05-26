import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Field,
    Input,
    Label,
} from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";

export default forwardRef(function KodeInputForm(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, errors, reset } = useForm({
        kodeUjian: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kerjas.store"), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)} // Membuka dialog
                className={`${className} px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500`}
            >
                + Masuk Ujian
            </button>

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex">
                                    <div className="min-w-full sm:mt-0 sm:text-left">
                                        <div className="flex justify-between items-center">
                                            <DialogTitle
                                                as="h3"
                                                className="text-sm font-semibold text-gray-900 "
                                            >
                                                Kode Ujian
                                            </DialogTitle>
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="text-2xl font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <hr className="my-2 border-t border-gray-200" />
                                        <Field>
                                            <form onSubmit={handleSubmit}>
                                                <Label className="text-sm/6 font-medium">
                                                    Inputkan Kode Ujian
                                                </Label>
                                                <div className="mt-2">
                                                    <Input
                                                        name="full_name"
                                                        value={data.kodeUjian}
                                                        onChange={(e) =>
                                                            setData(
                                                                "kodeUjian",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="rounded-lg w-full"
                                                    />
                                                    {errors.kodeUjian && (
                                                        <p className="text-sm text-red-500 mt-1">
                                                            {errors.kodeUjian}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="py-3 sm:flex sm:flex-row-reverse sm:px-0">
                                                    <PrimaryButton
                                                        type="submit"
                                                        className="w-full !bg-primary"
                                                    >
                                                        Kirim
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
});
