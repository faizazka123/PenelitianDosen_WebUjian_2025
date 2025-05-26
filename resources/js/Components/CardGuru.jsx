const CardGuru = ({ background, title , guru, siswa}) => {
    return (
        <div className={`w-full flex flex-col gap-1 text-white`}>
            <div
                className={`${background} flex flex-col rounded-2xl items-center py-10`}
            >
                <img src={`${LARAVEL_URL}/chalkboard.png`} width={100} />
                {title === "Jumlah Guru" ? guru : siswa}
            </div>
            <div
                className={`${background} rounded-2xl flex items-center flex-col py-3`}
            >
                {title}
            </div>
        </div>
    );
};
export default CardGuru;
