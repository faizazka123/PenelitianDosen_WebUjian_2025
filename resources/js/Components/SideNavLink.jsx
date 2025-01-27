import { Link } from "@inertiajs/react";

const SideNavLink = ({
    active = false,
    className = "",
    children,
    ...props
}) => {
    return (
        <Link
            {...props}
            className={
                "inline-flex rounded-md px-4 py-[0.75rem] items-center text-sm font-bold leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active ? "text-white bg-primary " : "text-black ") +
                className
            }
        >
            {children}
        </Link>
    );
};
export default SideNavLink;
