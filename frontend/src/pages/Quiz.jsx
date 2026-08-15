import { useState } from "react";
import questionsData from "../assets/dummydata";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const [technology, setTechnology] = useState("html");
  const [level, setLevel] = useState("basic");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Start Quiz
  const startQuiz = () => {
    const selected = questionsData[technology]?.[level] || [];

    const shuffled = [...selected].sort(() => 0.5 - Math.random());

    setQuestions(shuffled.slice(0, 5));
    setAnswers({});
  };

  // Save selected OPTION INDEX (IMPORTANT FIX)
  const handleChange = (qIndex, optIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optIndex
    }));
  };

  // Submit Quiz
  const submitQuiz = async () => {
    if (questions.length === 0) return;

    // Check all answered
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    let correct = 0;

    // COMPARE INDEX (MAIN FIX)
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });

    try {
      setLoading(true);

      await API.post("/api/results", {
        title: "Quiz",
        technology,
        level,
        totalQuestions: questions.length,
        correct
      });

      navigate("/results");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl mb-4 font-bold">Select Quiz</h2>

      <div className="mb-4">
        <select
          className="border p-2 mr-3"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>

        <select
          className="border p-2 mr-3"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={startQuiz}
        >
          Start
        </button>
      </div>

      {questions.map((q, index) => (
        <div key={index} className="mt-5">
          <p className="font-semibold mb-2">{q.question}</p>

          {q.options.map((opt, i) => (
            <label key={i} className="block cursor-pointer">
              <input
                type="radio"
                name={`q${index}`}
                checked={answers[index] === i}
                onChange={() => handleChange(index, i)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {questions.length > 0 && (
        <button
          type="button"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 mt-5 rounded disabled:opacity-50"
          onClick={submitQuiz}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      )}
    </div>
  );
}

export default Quiz;