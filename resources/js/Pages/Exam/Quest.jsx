import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListSoal from "@/Components/ListSoal";
import PrimaryButton from "@/Components/PrimaryButton";
import Soal from "@/Components/Soal";
import Countdown from "react-countdown";

export default function Quest({}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleConfirmFinish = () => {
        // Arahkan ke halaman selanjutnya (misalnya ke dashboard)
        window.location.href = "/dashboard"; // Ubah sesuai rute Anda
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            handleConfirmFinish();
        } else {
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    return (
        <AuthenticatedLayout countdown={renderer}>
            <Head title="Ujian Start" />
            <div className=" bg-gray-200 min-h-screen flex flex-col items-center">
                <div className="py-8 me-10 w-full flex justify-end">
                    <PrimaryButton
                        onClick={handleToggleMenu}
                        className="!text-primary border-2 !border-primary px-6 py-1 !rounded-lg bg-white !font-bold"
                    >
                        Nomor Soal
                    </PrimaryButton>
                </div>
                {/* <div className="max-w-lg w-full mb-2">
                    <span className="bg-red-900 text-white px-2 py-1 rounded-sm">
                        01:30:00
                    </span>
                </div> */}
                <Soal handleAlert={handleAlert} />
                <div className="mt-5 w-11/12">
                    <a href="#" className="w-full">
                        <PrimaryButton
                            onClick={handleAlert}
                            className="rounded-lg py-1 px-4 bg-primary w-full"
                        >
                            Selesaikan Ujian
                        </PrimaryButton>
                    </a>
                </div>
            </div>
            {showMenu && <ListSoal handleToggleMenu={handleToggleMenu} />}

            {showAlert && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white max-w-lg w-5/6 p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <img
                            src="warning.png"
                            className="text-lg font-bold mb-7 mt-5"
                            width={100}
                        ></img>
                        <p className="text-sm mb-5 font-semibold">
                            Apakah Anda yakin ingin menyelesaikan ujian?
                        </p>
                        <div className="flex justify-between gap-5 w-full mt-2">
                            <PrimaryButton
                                onClick={handleCloseAlert}
                                className="px-4 py-2 bg-gray-500 rounded-lg w-5/6"
                            >
                                Tidak
                            </PrimaryButton>
                            <PrimaryButton
                                onClick={handleConfirmFinish}
                                className="px-4 py-2 bg-blue-600 rounded-lg w-5/6 bg-secondary"
                            >
                                Iya
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
