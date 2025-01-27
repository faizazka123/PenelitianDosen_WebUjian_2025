import PrimaryButton from "./PrimaryButton";
const Soal = ({ question, onAnswerChange }) => {
    const handleChange = (answer) => {
        onAnswerChange(question.id, answer);
    };

    const options = [
        question.pilihan1,
        question.pilihan2,
        question.pilihan3,
        question.pilihan4,
        question.pilihan5,
    ];
    return (
        <div className="max-w-lg w-11/12 bg-white border border-gray-200 rounded-lg shadow">
            <div className=" py-5 px-5">
                <span className="text-md font-bold bg-primary text-white px-4 rounded-full py-2">
                    {question.idPertanyaan}
                </span>
            </div>
            <div className="p-5">
                <p className="mb-3 select-none ">
                    {question.pertanyaan}
                </p>
                <div className="border border-black rounded-xl">
                    {options.map((option, index) => (
                        option ? (
                            <div
                                className="flex items-center ps-4 rounded dark:border-gray-700"
                                key={index}
                            >
                                <input
                                    id={`option-${index}`}
                                    type="radio"
                                    name={`question-${question.id}`}
                                    onChange={() => handleChange(option)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`option-${index}`}
                                    className="w-full select-none py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
                                >
                                    {option}
                                </label>
                            </div>
                        ) : null
                    ))}
                </div>
                <div className="flex justify-end mt-5 gap-16">
                    <a href="#" className="w-1/2">
                        <PrimaryButton className="bg-primary !rounded-lg border-2 border-white text-white !py-[0.75rem] w-full">
                            Selanjutnya
                        </PrimaryButton>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Soal;
