import { useEffect, useState } from "react";
import API from "../api";

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await API.get("/api/results");
    setResults(res.data.results);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow">
      <h2 className="text-2xl mb-4">My Results</h2>

      {results.map((r, index) => (
        <div key={index} className="border p-3 mb-3">
          <p><strong>{r.title}</strong></p>
          <p>Score: {r.score}%</p>
          <p>Correct: {r.correct}</p>
          <p>Wrong: {r.wrong}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;