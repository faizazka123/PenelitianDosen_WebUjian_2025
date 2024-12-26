export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-2 py-2 text-xs font-bold tracking-widest text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 active:bg-blue ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
