import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Quest({ }) {
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
        window.location.href = '/dashboard'; // Ubah sesuai rute Anda
    };

    return (
        <>
            <Head title="Ujian Start" />
            <div className='flex flex-col justify-center items-center bg-gray-200 min-h-screen'>
                <div className='max-w-lg w-full mb-2'>
                    <span className='bg-red-900 text-white px-2 py-1 rounded-sm'>
                        01:30:00
                    </span>
                </div>
                <div className="max-w-lg w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex flex-row justify-between items-center border-b-2 border-blue-600 py-5 px-5'>
                        <div className=''>
                            <span className="text-md font-bold bg-blue-500 text-white px-2 rounded-full py-1">1</span>
                        </div>
                        <div>
                            <button
                                onClick={handleToggleMenu}
                                className=' text-blue-600 border-2 border-blue-600 px-4 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                                Buka Soal
                            </button>
                        </div>
                    </div>
                    <div className="p-5">
                        <p className="mb-3 font-bold select-none text-blue-800">Sebuah mobil bergerak dengan kecepatan tetap 60 km/jam. Berapa jarak yang ditempuh mobil tersebut dalam waktu 2 jam?</p>
                        {/* <img src="/img/warning.png" alt="" /> */}
                        <div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-1" className="w-full select-none py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A. 120 km</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-2" className="w-full select-none py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">B. 100 km</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-radio-3" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-3" className="w-full select-none py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">C. 60 km</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-radio-4" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-4" className="w-full select-none py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">D. 30 km</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-radio-5" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-radio-5" className="w-full select-none py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">D. 10 km</label>
                            </div>
                        </div>
                        <div className='flex justify-end mt-5 gap-16'>
                            <a href="#" className='w-1/2'>
                                <button className='w-full bg-blue-700 rounded-lg border-2 border-white hover:bg-blue-800 text-white py-1 px-4'>
                                    Selanjutnya
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='max-w-lg w-full mt-5'>
                    <a href="#" className='w-full'>
                        <button
                            onClick={handleAlert}
                            className='w-full bg-gray-100 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 py-1 px-4'>
                            Selesaikan Ujian
                        </button>
                    </a>
                </div>
            </div>
            {showMenu && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white max-w-lg w-full rounded-lg shadow-lg">
                        <div className='flex flex-row justify-between py-5 px-5 items-center mb-7 border-b-2 border-gray-800'>
                            <h2 className="text-lg font-bold">Pilih Nomor Soal</h2>
                            <button
                                onClick={handleToggleMenu}
                                className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
                            >
                                <img src="/img/close.png" width={13} alt="close" />
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-4 px-5 pb-5">
                            {[...Array(10)].map((_, index) => (
                                <div className='flex justify-center items-center'>
                                    <button
                                        key={index}
                                        className="bg-gray-50 border-2 border-blue-600 text-blue-600 w-10 h-10 rounded-full hover:bg-blue-600 hover:text-white"
                                    >
                                        {index + 1}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white max-w-lg w-full p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Konfirmasi</h2>
                        <p className="text-sm mb-5">Apakah Anda yakin ingin menyelesaikan ujian?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCloseAlert}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={handleConfirmFinish}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                            >
                                Selesaikan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
