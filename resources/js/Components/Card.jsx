import iconPeringatan from "../../../public/iconPeringatan.png";
const Card = ({ type, props }) => {
    return (
        <div
            className={`flex items-center text-white ${
                type == "profile" ? "bg-secondary" : "bg-kuning"
            } mt-4 rounded-xl p-3 w-11/12 m-auto`}
        >
            {type == "profile" ? (
                <>
                    <img
                        src="/userProfile.png"
                        className="block h-auto w-[4rem] fill-current me-5 "
                        alt="Gambar Profile"
                    />
                    <div>
                        <h1 className="font-bold ">Halo, {props.user.nama}</h1>
                        <p>NIS : {props.user.nis}</p>
                        <p>Kelas : {props.user.kelas}</p>
                    </div>
                </>
            ) : (
                <>
                    <img
                        src={iconPeringatan}
                        className="block h-auto w-[4rem] fill-current me-5 "
                        alt="Gambar Profile"
                    />
                    <div className="text-black leading-5 text-sm">
                        Pastikan mengerjakan ujian dengan{" "}
                        <span className="font-extrabold">jujur.</span> Jangan
                        berpindah halaman ujian, jika halaman hilang fokus maka
                        ujian dianggap{" "}
                        <span className="font-extrabold">selesai!</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
