import PrimaryButton from "./PrimaryButton";
const Soal = ({ nomor, soal, onNext, onPrev, showNext, showPrev, handleSelectAnswer }) => {

    return (
        <div className="max-w-lg w-11/12 bg-white border border-gray-200 rounded-lg shadow">
            <div className=" py-5 px-5">
                <span className="text-md font-bold bg-primary text-white px-4 rounded-full py-2">
                    {/* Nomor Soal */}
                    {nomor}
                </span>
            </div>
            <div className="p-5">
                <p className="mb-3 select-none " dangerouslySetInnerHTML={{ __html: soal.pertanyaan }}>

                    {/* Pertanyaan */}
                    {/* {soal.pertanyaan} */}
                </p>
                <div className="mb-3">
                    <img src={`http://127.0.0.1:8000/storage/${soal.image}`} alt="" />
                </div>
                <div className="border border-black rounded-xl">

                    {/* Jawaban */}
                    {soal.jawabans.map((jawaban, index) => (
                        <div key={index} className="flex items-center ps-4 rounded dark:border-gray-700">
                            {/* {console.log(jawaban.id)} */}
                            <input
                                type="radio"
                                name={`soal-${nomor}`}
                                value={jawaban.id}
                                checked={soal.selectedAnswer === jawaban.id}
                                onChange={() => handleSelectAnswer(jawaban.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex flex-col ms-3">
                                <label className={`w-full select-none ${jawaban.image ? "pt-4 pb-2" : "py-4"} ms-2 text-sm text-gray-900 dark:text-gray-300`} dangerouslySetInnerHTML={{ __html: jawaban.text }}>
                                    {/* {jawaban.text} */}
                                </label>
                                <img className="lg:max-w-64" src={`http://127.0.0.1:8000/storage/${jawaban.image}`} alt="" />

                            </div>
                        </div>
                    ))}

                </div>
                <div className="flex justify-end mt-5 gap-5">
                    {showPrev && (
                        <a className="w-1/2" onClick={onPrev}>
                            <PrimaryButton className="bg-primary !rounded-lg border-2 border-white text-white !py-[0.75rem] w-full">
                                Sebelumnya
                            </PrimaryButton>
                        </a>
                    )}
                    {showNext && (
                        <a className="w-1/2" onClick={onNext}>
                            <PrimaryButton className="bg-primary !rounded-lg border-2 border-white text-white !py-[0.75rem] w-full">
                                Selanjutnya
                            </PrimaryButton>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Soal;
