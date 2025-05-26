import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import SideNavLink from "@/Components/SideNavLink";
import { Icon } from "@iconify/react";

const AdminAuthenticatedLayout = ({ header, children }) => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showingAkunDropdown, setShowingAkunDropdown] = useState(false);

    return (
        <div className="min-h-screen">
            <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
                <div className="mx-auto max-w-full ps-8 shadow-xl mb-1">
                    <div className="flex h-12 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center">
                                    <img
                                        src="/LogoPendidikan.png"
                                        className="block h-9 w-auto fill-current text-gray-800"
                                        alt="Tut Wuri Handayani"
                                    />
                                    <p className="ms-3 font-bold capitalize">
                                        Akun Admin
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
                                className={`${
                                    showingNavigationDropdown
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
                                href={route("logout")}
                                method="post"
                                active={route().current("logout")}
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
                            href={route("guru.admin")}
                            active={route().current("guru.admin")}
                        >
                            <Icon
                                icon="material-symbols:dashboard-outline"
                                width="24"
                                height="24"
                                className="me-5"
                            />
                            Dashboard
                        </SideNavLink>
                        <div className="relative">
                            {/* <button
                                onClick={() =>
                                    setShowingAkunDropdown(!showingAkunDropdown)
                                }
                                className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md ${
                                    route().current("akun") ? "bg-gray-300" : ""
                                }`}
                            > */}
                            <button
                                onClick={() =>
                                    setShowingAkunDropdown(!showingAkunDropdown)
                                }
                                className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md `}
                            >
                                <Icon
                                    icon="icon-park-outline:people"
                                    width="24"
                                    height="24"
                                    className="me-5"
                                />
                                Akun
                                <Icon
                                    icon="mdi:chevron-down"
                                    width="24"
                                    height="24"
                                    className={`ml-auto transition-transform ${
                                        showingAkunDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {showingAkunDropdown && (
                                <ul className="absolute left-0 mt-1 w-full ms-10 list-[circle] list-inside">
                                    <li className="border-b border-gray-200 text-black">
                                        <SideNavLink
                                        className="block px-4 py-2"
                                        href={route("guru.dataGuru")}>
                                            Guru
                                        </SideNavLink>
                                    </li>
                                    <li>
                                        <SideNavLink
                                        className="block px-4 py-2"
                                        href={route("guru.dataSiswa")}>
                                            Siswa
                                        </SideNavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="px-8 mb-[8rem]">
                        <SideNavLink
                            href={route("logout")}
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
                    className={`ml-[16.6%] ${
                        showingNavigationDropdown ? "blur-sm " : ""
                    } w-9/12 p-10`}
                >
                    <div className="flex items-center gap-3 font-bold mb-4">
                        <img src={`${LARAVEL_URL}/profileGuru.png`} />
                        Selamat Datang, Admin!
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminAuthenticatedLayout;
