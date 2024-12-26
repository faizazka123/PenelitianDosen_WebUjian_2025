import PrimaryButton from "./PrimaryButton";
import Calendar from "./Design/Calender";
const CardList = () => {
    return (
        <div className="flex items-center py-2 px-3 bg-white rounded-md drop-shadow-lg mb-4">
            <div className="flex flex-col text-primary font-semibold">
                <div>UTS IPA</div>
                <div className="flex items-center mt-2">
                    <Calendar />
                    <div className="flex flex-col ms-3 font-normal">
                        <p>hari ini</p>
                        <p>08:00 - 09:00</p>
                    </div>
                </div>
            </div>
            <PrimaryButton className="!text-sm px-5 h-[2rem] rounded-xl">
                Mulai
            </PrimaryButton>
        </div>
    );
};
export default CardList;
