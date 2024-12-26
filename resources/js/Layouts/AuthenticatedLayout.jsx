import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Hamburger from "@/Components/Design/Hamburger";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const kapitalPertama = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center">
                                    <img
                                        src="/LogoPendidikan.png"
                                        className="block h-9 w-auto fill-current text-gray-800 me-5"
                                        alt="Tut Wuri Handayani"
                                    />
                                    <h1 className="font-bold">
                                        {kapitalPertama(route().current())}
                                    </h1>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("nilai")}
                                    active={route().current("nilai")}
                                >
                                    Nilai Ujian
                                </NavLink>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className={`${
                                    showingNavigationDropdown
                                        ? "rotate-90 "
                                        : " "
                                }inline-flex items-center justify-center rounded-md p-2 text-black transition duration-150 ease-in-out hover:text-black focus:text-black focus:outline-none`}
                            >
                                <Hamburger />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown
                            ? "bg-primary block "
                            : "hidden") + " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-7 pt-4">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("logout")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("logout")}
                        >
                            Logout
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            <main
                className={`${showingNavigationDropdown ? "blur-sm " : " "} `}
            >
                {children}
            </main>
        </div>
    );
}
