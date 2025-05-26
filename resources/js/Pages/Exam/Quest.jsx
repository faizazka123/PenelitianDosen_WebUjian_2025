import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListSoal from "@/Components/ListSoal";
import PrimaryButton from "@/Components/PrimaryButton";
import Soal from "@/Components/Soal";
import Swal from "sweetalert2";

export default function Quest({ kerja, pertanyaan }) {
    const { jawabanSiswa } = usePage().props;

    const convertToMap = (array) => {
        const map = {};
        array.forEach(item => {
            map[item.pertanyaan_id] = item.jawaban_id;
        });
        return map;
    };

    const [answers, setAnswers] = useState(() => convertToMap(jawabanSiswa || []));

    const [showMenu, setShowMenu] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSoal = pertanyaan.data[currentIndex];


    console.log(kerja.idUjian.durasi)

    // ~~~Timer
    const durasiStr = kerja.idUjian.durasi;

    const durasiKeDetik = (durasiStr) => {
        const [jam, menit, detik] = durasiStr.split(':').map(Number);
        return jam * 3600 + menit * 60 + detik;
    };

    const durasiDetik = durasiKeDetik(durasiStr);

    const key = `ujian_endtime_${kerja.idKerja}`;
    const now = Date.now();
    let endTime = localStorage.getItem(key);

    if (!endTime) {
        endTime = now + durasiDetik * 1000;
        localStorage.setItem(key, endTime);
    } else {
        endTime = parseInt(endTime);
    }


    const handleSelectAnswer = (pertanyaanId, jawabanId) => {
        // Update state lokal
        setAnswers(prev => ({
            ...prev,
            [pertanyaanId]: jawabanId
        }));

        // Kirim ke server
        router.post(route('jawaban.simpan', kerja.idKerja), {
            pertanyaan_id: pertanyaanId,
            jawaban_id: jawabanId,
        }, {
            preserveScroll: true,
            onError: (e) => console.error("Gagal simpan:", e),
        });
    };


    const handleNext = () => {
        if (currentIndex < pertanyaan.data.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleSelectSoal = (index) => {
        setCurrentIndex(index);
        setShowMenu(false);
    };

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
        router.post(route('ujian.selesai', kerja.idKerja), {}, {
            onSuccess: () => {
                localStorage.removeItem(key);
                console.log("Ujian diselesaikan.");
            },
            onError: () => {
                alert("Terjadi kesalahan saat menyelesaikan ujian.");
            }
        });
    };

    const handleFinish = () => {
        router.post(route('ujian.selesai', kerja.idKerja), {}, {
            onSuccess: () => {
                localStorage.removeItem(key);
                console.log("Ujian otomatis diselesaikan.");
            },
            onError: () => {
                alert("Terjadi kesalahan saat menyelesaikan ujian.");
            }
        });
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            handleFinish();
            return <span>Waktu Habis</span>;
        }

        return (
            <span className="text-white">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </span>
        );
    };

    useEffect(() => {
        const blockBack = () => {
            window.history.pushState(null, null, window.location.href);
        };

        // Tambah history state secara berulang
        blockBack();
        window.addEventListener("popstate", blockBack);

        return () => {
            window.removeEventListener("popstate", blockBack);
        };
    }, []);

    // ~~~Logic Cheating

    const [violations, setViolations] = useState(0);

    useEffect(() => {
        const handleBlur = () => {
            setViolations((prev) => {
                const updated = prev + 1;

                if (updated < 2) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Perhatian!',
                        text: 'Anda terdeteksi meninggalkan halaman ujian!',
                        confirmButtonText: 'Saya mengerti',
                        confirmButtonColor: '#3085d6'
                    });
                }

                return updated;
            });
        };

        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    useEffect(() => {
        if (violations >= 2) {
            router.post(route('ujian.caught', kerja.idKerja), {}, {
                onSuccess: () => {
                    localStorage.removeItem(key);
                    console.log("Ujian diselesaikan.");
                },
                onError: () => {
                    alert("Terjadi kesalahan saat menyelesaikan ujian.");
                }
            });
        }
    }, [violations]); // Jalankan efek setiap kali violations berubah

    return (
        <AuthenticatedLayout
            title={kerja.idUjian.judul}
            duration={endTime - now}
            countdown={renderer}
        >
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
                    nomor={currentIndex + 1}
                    soal={{
                        ...currentSoal,
                        selectedAnswer: answers[currentSoal.idPertanyaan] || null,
                    }}
                    kerjaId={kerja.idKerja}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    showPrev={currentIndex > 0}
                    showNext={currentIndex < pertanyaan.data.length - 1}
                    handleSelectAnswer={(jawabanId) =>
                        handleSelectAnswer(currentSoal.idPertanyaan, jawabanId)
                    }

                />
                {/* <Soal/> */}
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
            {showMenu && <ListSoal
                handleToggleMenu={handleToggleMenu}
                questions={pertanyaan}
                currentIndex={currentIndex}
                onQuestionSelect={handleSelectSoal}
            />}

            {showAlert && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white max-w-lg w-5/6 p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <img
                            src="/warning.png"
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
