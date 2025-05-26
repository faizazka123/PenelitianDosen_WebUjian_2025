import GuruAuthenticatedLayout from "@/Layouts/GuruAuthenticatedLayout";
import { router } from "@inertiajs/react";

const Notifikasi = ({ notifs }) => {

    console.log(notifs);

    return (
        <GuruAuthenticatedLayout>
            <div className="flex flex-col gap-5 w-11/12">
                <p className="font-bold mt-5 mb-5">Notifikasi</p>

                {notifs.data.map((notif, index) => (
                    <div
                        key={notif.id}
                        className={`flex items-center gap-5 px-5 py-1 ${index % 2 === 0 ? "bg-notif1" : "bg-notif2"
                            }`}
                    >
                        {notif.status === 1 ? (
                            // success icon
                            <svg width="34px" height="34px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-1">
                                <path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17 24L22 29L32 19" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            // danger icon
                            <svg width="40px" height="40px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(3.7200000000000006,3.7200000000000006), scale(0.69)">
                                    <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#D01E1E" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0" />
                                </g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.192" />

                                <g id="SVGRepo_iconCarrier"> <path d="M12 7V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" /> <circle cx="12" cy="16" r="1" fill="#000000" /> <path d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z" stroke="#000000" strokeWidth="1.5" /> </g>

                            </svg>
                        )}
                        <span>{notif.content}</span>
                    </div>
                ))}

                {/* Pagination */}

                {(!notifs || notifs.data.length === 0) ? (
                    < div className="flex flex-col items-center">
                        <span className="text-md text-gray-700 dark:text-gray-400">
                            Belum ada Notifikasi Masuk.
                        </span>
                    </div>
                ) : (
                    < div className="flex flex-col items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {notifs.meta.from}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {notifs.meta.to}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {notifs.meta.total}
                            </span>{" "}
                            Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            {/* Tombol Prev */}
                            <button
                                onClick={() => {
                                    if (notifs.links.prev) router.get(notifs.links.prev);
                                }}
                                disabled={!notifs.links.prev}
                                className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white rounded-s ${notifs.links.prev
                                    ? "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    : "bg-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Prev
                            </button>

                            {/* Tombol Next */}
                            <button
                                onClick={() => {
                                    if (notifs.links.next) router.get(notifs.links.next);
                                }}
                                disabled={!notifs.links.next}
                                className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white border-0 border-s rounded-e ${notifs.links.next
                                    ? "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    : "bg-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </GuruAuthenticatedLayout >
    );
};
export default Notifikasi;
