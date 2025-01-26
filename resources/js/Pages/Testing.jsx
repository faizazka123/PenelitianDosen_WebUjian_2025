import React, { useState, useEffect } from "react";

export default function Testing({ }) {

    const [violations, setViolations] = useState(0);

    useEffect(() => {
        const handleBlur = () => {
            setViolations((prev) => prev + 1);
            alert("Cheating detected! Stay focused on the exam page.");
        };

        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("blur", handleBlur);
        };
    }, []);


    return (
        <>
            <div>
                <h1>Online Exam</h1>
                <p>Please do not switch tabs or minimize the browser during the exam.</p>
                <p>Violations detected: {violations}</p>
                {/* Add more exam content here */}
            </div>
        </>
    );
}
