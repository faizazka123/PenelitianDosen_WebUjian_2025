import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the necessary CSS for Quill editor

function FormNambahSoal({ onSave }) {
    const [questions, setQuestions] = useState([
        {
            number: 1,
            questionDetail: "",
            image: null,
            answers: [
                { text: "", image: null, isCorrect: false, points: 0 },
                { text: "", image: null, isCorrect: false, points: 0 },
                { text: "", image: null, isCorrect: false, points: 0 },
                { text: "", image: null, isCorrect: false, points: 0 },
            ],
        },
    ]);

    const handleSave = () => {
        onSave(questions); // Kirim data soal ke parent component (CardTambahSoal)
    };

    // Handle changes in the question detail (rich text)
    const handleQuestionDetailChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionDetail = value;
        setQuestions(updatedQuestions);
    };

    // Handle changes in the answers (rich text)
    const handleAnswerChange = (qIndex, aIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers[aIndex].text = value;
        setQuestions(updatedQuestions);
    };

    // Handle image uploads for question and answers
    const handleImageUpload = (qIndex, aIndex, e) => {
        const updatedQuestions = [...questions];
        const file = e.target.files[0];
        if (aIndex === "question") {
            updatedQuestions[qIndex].image = file;
        } else {
            updatedQuestions[qIndex].answers[aIndex].image = file;
        }
        setQuestions(updatedQuestions);
    };

    // Handle file name display
    const getFileName = (qIndex, aIndex) => {
        const file =
            aIndex === "question"
                ? questions[qIndex].image
                : questions[qIndex].answers[aIndex].image;
        return file ? file.name : null;
    };

    // Handle correct answer change (checkbox)
    const handleCorrectAnswerChange = (qIndex, aIndex, checked) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers.forEach((answer, index) => {
            if (index === aIndex) {
                answer.isCorrect = checked;
            } else {
                answer.isCorrect = false; // Ensure only one is correct
            }
        });
        setQuestions(updatedQuestions);
    };

    // Handle points change for answers
    const handlePointsChange = (qIndex, aIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers[aIndex].points = value;
        setQuestions(updatedQuestions);
    };

    // Add new question to the form
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                number: questions.length + 1,
                questionDetail: "",
                image: null,
                answers: [
                    { text: "", image: null, isCorrect: false, points: 0 },
                    { text: "", image: null, isCorrect: false, points: 0 },
                    { text: "", image: null, isCorrect: false, points: 0 },
                    { text: "", image: null, isCorrect: false, points: 0 },
                ],
            },
        ]);
    };

    return (
        <div className="container">
            <form>
                <div className="mt-5 mb-3 flex justify-between">
                    <div className="font-bold">Detail Soal</div>
                    <div className="flex justify-between font-bold gap-5">
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="bg-primary text-white px-4 py-1 rounded"
                        >
                            Tambah Nomor Soal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-kuning text-white px-4 py-1 rounded"
                        >
                            Simpan Soal
                        </button>
                    </div>
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-section mb-8">
                        <table className="table-auto w-full border">
                            <tbody>
                                <tr className="border border-abu_tua w-full">
                                    <td className="border border-abu_tua p-2 text-center w-2/12">
                                        No.{question.number}
                                    </td>
                                    <td className="border border-abu_tua p-2">
                                        <div className="react-quill-container">
                                            <ReactQuill
                                                value={question.questionDetail}
                                                onChange={(value) =>
                                                    handleQuestionDetailChange(
                                                        qIndex,
                                                        value
                                                    )
                                                }
                                                className="w-full border p-2"
                                                placeholder="Detail soal"
                                            />
                                        </div>
                                        {/* gambar soal */}
                                        <div className="border-[0.1rem] p-2 flex mt-2">
                                            <label
                                                htmlFor={`soal-${qIndex}`}
                                                className="block border text-sm font-medium cursor-pointer bg-abu py-1 px-8 rounded-md text-center"
                                            >
                                                Pilih File
                                            </label>
                                            <input
                                                id={`soal-${qIndex}`}
                                                name={`soal-${qIndex}`}
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageUpload(
                                                        qIndex,
                                                        "question",
                                                        e
                                                    )
                                                }
                                            />
                                            {question.image && (
                                                <p className="mt-1 text-sm text-[#429AE5] font-bold underline ms-1 pe-2">
                                                    {getFileName(
                                                        qIndex,
                                                        "question"
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                {question.answers.map((answer, aIndex) => (
                                    <tr
                                        key={aIndex}
                                        className="border border-abu_tua"
                                    >
                                        <td className="border border-abu_tua p-2 text-center">{`Jawaban ${String.fromCharCode(
                                            65 + aIndex
                                        )}`}</td>
                                        <td className="p-2">
                                            <div className="react-quill-container">
                                                <ReactQuill
                                                    value={answer.text}
                                                    onChange={(value) =>
                                                        handleAnswerChange(
                                                            qIndex,
                                                            aIndex,
                                                            value
                                                        )
                                                    }
                                                    className="w-full border p-2"
                                                    placeholder={`Jawaban ${String.fromCharCode(
                                                        65 + aIndex
                                                    )}`}
                                                />
                                            </div>
                                            {/* gambar jawaban */}
                                            <div className="border-[0.1rem] p-2 flex mt-2">
                                                <label
                                                    htmlFor={`answer-${qIndex}-${aIndex}`}
                                                    className="block border text-sm font-medium cursor-pointer bg-abu py-1 px-8 rounded-md text-center"
                                                >
                                                    Pilih File
                                                </label>
                                                <input
                                                    id={`answer-${qIndex}-${aIndex}`}
                                                    name={`answer-${qIndex}-${aIndex}`}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleImageUpload(
                                                            qIndex,
                                                            aIndex,
                                                            e
                                                        )
                                                    }
                                                />
                                                {answer.image && (
                                                    <p className="mt-1 text-sm text-[#429AE5] font-bold underline ms-1 pe-2">
                                                        {getFileName(
                                                            qIndex,
                                                            aIndex
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            {/* checkbox */}
                                            <div className="flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleCorrectAnswerChange(
                                                            qIndex,
                                                            aIndex,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Tandai sebagai jawaban benar
                                                <input
                                                    type="number"
                                                    placeholder="Poin"
                                                    value={answer.points}
                                                    onChange={(e) =>
                                                        handlePointsChange(
                                                            qIndex,
                                                            aIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="ml-4 w-16 border p-2"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default FormNambahSoal;
