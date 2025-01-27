import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListSoal from "@/Components/ListSoal";
import PrimaryButton from "@/Components/PrimaryButton";
import Soal from "@/Components/Soal";

export default function Quest({ kerja, pertanyaan }) {
    console.log(`${window.LARAVEL_URL}/warning.png`);
    const [showMenu, setShowMenu] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleConfirmFinish = async () => {
        // Submit answers to the server
        await fetch(route("kerjas.submit", { id: kerja.idKerja }), {
            method: "POST",
            body: JSON.stringify(answers),
            headers: { "Content-Type": "application/json" },
        });
        alert("Exam submitted!");
        window.location.href = route("dashboard");
    };

    const parseDurationToMilliseconds = (duration) => {
        const [hours, minutes, seconds] = duration.split(":").map(Number);
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    };

    const durationInMilliseconds = useRef(
        parseDurationToMilliseconds(kerja.idUjian.durasi)
    );

    // Calculate the remaining time on page load
    const getRemainingTime = () => {
        const storedStartTime = localStorage.getItem("examStartTime");
        if (storedStartTime) {
            const startTime = parseInt(storedStartTime, 10);
            const currentTime = Date.now();
            const timeElapsed = currentTime - startTime;
            return Math.max(durationInMilliseconds.current - timeElapsed, 0); // Prevent negative time
        } else {
            // If no start time exists, it's the first time the user is loading the page, so set the start time now.
            localStorage.setItem("examStartTime", Date.now().toString());
            return durationInMilliseconds.current; // Full duration
        }
    };

    const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            handleConfirmFinish();
        } else {
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    // useEffect(() => {
    //     const handleBlur = () => {
    //         setViolations((prev) => prev + 1);
    //         alert('Cheating detected! Stay focused on the exam page.');
    //     };

    //     window.addEventListener('blur', handleBlur);

    //     return () => {
    //         window.removeEventListener('blur', handleBlur);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (violations >= 3) {
    //         alert('You have exceeded the cheating limit. Redirecting to dashboard...');
    //         window.location.href = route('dashboard');
    //     }
    // }, [violations]);

    return (
        <AuthenticatedLayout countdown={renderer} duration={remainingTime}>
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
                <Soal
                    handleAlert={handleAlert}
                    question={pertanyaan.data[currentQuestion]}
                    onAnswerChange={handleAnswerChange}
                />
                <div className="mt-5 w-11/12">
                    <div className="w-full">
                        <PrimaryButton
                            onClick={handleAlert}
                            className="rounded-lg py-1 px-4 bg-primary w-full"
                        >
                            Selesaikan Ujian
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            {showMenu && (
                <ListSoal
                    handleToggleMenu={handleToggleMenu}
                    questions={pertanyaan}
                    onQuestionSelect={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                />
            )}

            {showAlert && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white max-w-lg w-5/6 p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <img
                            src={`${window.LARAVEL_URL}/warning.png`}
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
