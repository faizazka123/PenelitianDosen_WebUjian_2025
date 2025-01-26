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
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 text-text-active ${
                active ? "border-transparent" : "border-transparent "
            } text-base font-medium transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
