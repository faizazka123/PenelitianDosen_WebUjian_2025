import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import Countdown from "react-countdown";

export default function AuthenticatedLayout({
    header,
    children,
    title,
    countdown = null,
    duration = null
}) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

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
                                        className="block h-9 w-auto fill-current text-gray-800"
                                        alt="Tut Wuri Handayani"
                                    />
                                    <p className="ms-3 font-bold capitalize">
                                        {title}
                                    </p>
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

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="me-2 flex items-center sm:hidden">
                            {countdown ? (
                                <PrimaryButton className="bg-orange">
                                    <Countdown
                                        date={Date.now() + duration}
                                        renderer={countdown}
                                    />
                                </PrimaryButton>
                            ) : (
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
                            )}
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
                                method='post'
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

            <main
                className={`${showingNavigationDropdown ? "blur-sm " : " "} `}
            >
                {children}
            </main>
        </div>
    );
}
