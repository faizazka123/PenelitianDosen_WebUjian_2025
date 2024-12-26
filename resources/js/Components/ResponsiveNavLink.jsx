import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex justify-items-center w-5/6 items-start py-[0.25rem] pe-4 ps-3 bg-white rounded-md m-auto text-sm ${
                active ? "font-semibold " : "border-transparent "
            } font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
