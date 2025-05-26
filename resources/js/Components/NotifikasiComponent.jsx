import { Icon } from "@iconify/react";
const NotifikasiComponent = ({
    nama = "dharma",
    jenis_matpel = "Kuis Fisika",
    curang = true,
}) => {
    return (
        <div className="mt-5">
            {!curang && (
                <div className="flex gap-3 bg-[#DCE5F6] p-2">
                    <Icon
                        icon="icon-park:success"
                        width="24"
                        height="24"
                        className="ms-5"
                    />
                    <p>
                        {nama} menyelesaikan {jenis_matpel}.
                    </p>
                </div>
            )}
            {curang && (
                <div className="flex gap-3 bg-[#DCE5F6] p-2">
                    <Icon
                        icon="mynaui:danger-waves-solid"
                        width="24"
                        height="24"
                        style={{ color: "#D01E1E" }}
                    />
                    <p>{nama} melakukan kecurangan.</p>
                </div>
            )}
        </div>
    );
};

export default NotifikasiComponent;
