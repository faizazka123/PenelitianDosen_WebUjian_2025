const ListSoal = ({ questions, onQuestionSelect, handleToggleMenu }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white max-w-lg w-full rounded-lg shadow-lg fixed bottom-0 left-0">
                <div className="flex flex-row justify-between py-5 px-5 items-center mb-7 border-b-2 border-gray-800">
                    <h2 className="text-lg font-bold">Nomor Soal</h2>
                    <button
                        onClick={handleToggleMenu}
                        className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
                    >
                        <img src="/img/close.png" width={13} alt="close" />
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-4 px-5 pb-5">
                    {questions.data.map((_, index) => (
                        <div
                            className="flex justify-center items-center"
                            key={index}
                        >
                            <button
                                onClick={() => {
                                    onQuestionSelect(index);
                                    handleToggleMenu();
                                }}
                                className="bg-gray-50 border-2 border-blue-600 text-blue-600 w-11 h-10 rounded-full hover:bg-blue-600 hover:text-white"
                            >
                                {index + 1}
                            </button>
                        </div>
                    ))}
                    {/* {[...Array(10)].map((_, index) => (
                        <div
                            className="flex justify-center items-center"
                            key={index}
                        >
                            <button
                                key={index}
                                className="bg-gray-50 border-2 border-blue-600 text-blue-600 w-11 h-10 rounded-full hover:bg-blue-600 hover:text-white"
                            >
                                {index + 1}
                            </button>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
};
export default ListSoal;
