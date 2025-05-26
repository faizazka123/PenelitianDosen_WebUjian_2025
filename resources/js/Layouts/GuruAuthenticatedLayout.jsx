import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import SideNavLink from "@/Components/SideNavLink";
import { Icon } from "@iconify/react";

const GuruAuthenticatedLayout = ({ header, children }) => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen">
            <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
                <div className="mx-auto max-w-full ps-8 shadow-xl mb-1">
                    <div className="flex h-12 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('guru.dashboard')} className="flex items-center">
                                    <img
                                        src="/LogoPendidikan.png"
                                        className="block h-9 w-auto fill-current text-gray-800"
                                        alt="Tut Wuri Handayani"
                                    />
                                    <p className="ms-3 font-bold capitalize">
                                        Akun Guru
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <div className="me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className={`${showingNavigationDropdown
                                    ? "rotate-90 "
                                    : ""
                                    } inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-300 ease-in-out`}
                            >
                                <svg
                                    className="h-6 w-6 text-black"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown
                            ? "block absolute me-6 bg-white w-5/12 border shadow-inner rounded-xl right-0 z-10"
                            : "hidden") + " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("nilai")}
                            active={route().current("nilai")}
                        >
                            Nilai Ujian
                        </ResponsiveNavLink>
                        <div className="border-t border-gray-200">
                            <ResponsiveNavLink
                                href={route("logoutGuru")}
                                method="post"
                                active={route().current("logoutGuru")}
                                as="button"
                            >
                                Logout
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <div className="flex gap-5 min-h-screen mt-[3rem]">
                <nav className="w-2/12 flex flex-col pt-8 bg-abu fixed h-full">
                    <div className="flex flex-col gap-3 px-8 flex-grow">
                        <SideNavLink
                            href={route("guru.dashboard")}
                            active={route().current("guru.dashboard")}
                        >
                            <Icon
                                icon="material-symbols:dashboard-outline"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Dashboard
                        </SideNavLink>
                        <SideNavLink
                            href={route("guru.daftar")}
                            active={route().current("guru.daftar")}
                        >
                            <Icon
                                icon="material-symbols:subject"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Ujian
                        </SideNavLink>
                        <SideNavLink
                            href={route("guru.nilai")}
                            active={route().current("guru.nilai")}
                        >
                            <Icon
                                icon="ph:exam-thin"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Laporan Nilai
                        </SideNavLink>
                        <SideNavLink
                            href={route("guru.notifikasi")}
                            active={route().current("guru.notifikasi")}
                        >
                            <Icon
                                icon="mdi:notifications-none"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Notifikasi
                        </SideNavLink>
                    </div>
                    <div className="px-8 mb-[8rem]">
                        <SideNavLink
                            href={route("logoutGuru")}
                            method="post"
                            as="button"
                        >
                            <Icon
                                icon="material-symbols:logout"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Logout
                        </SideNavLink>
                    </div>
                </nav>
                <main
                    className={`ml-[16.6%] ${showingNavigationDropdown ? "blur-sm " : ""
                        } w-9/12 p-10`}
                >
                    <div className="flex items-center gap-3 font-bold mb-4">
                        <img src={`${LARAVEL_URL}/profileGuru.png`} />
                        Selamat Datang, {user.nama}!
                        {/* Selamat Datang, Christelle Rempel! */}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default GuruAuthenticatedLayout;
