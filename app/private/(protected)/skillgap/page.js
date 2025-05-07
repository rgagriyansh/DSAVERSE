"use client";
import React, { useState } from "react";

const analyzeJDandResume = async (jdText, resumeText) => {
  const response = await fetch("/api/skillgap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd: jdText, resume: resumeText }),
  });

  const data = await response.json();
  return data;
};

const Skillgap = () => {
  const [focusAreas, setFocusAreas] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [prepChecklist, setPrepChecklist] = useState([]);
  const [loading, setLoading] = useState(false);

  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleAddToChecklist = (skill) => {
    setPrepChecklist((prev) => (prev.includes(skill) ? prev : [...prev, skill]));
  };

  const readFileAsText = (file) =>
    new Promise((resolve, reject) => {
      if (file.size > 200 * 1024) {
        reject("File too large. Please upload a file under 200KB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject("Error reading file.");
      reader.readAsText(file);
    });

  const handleJDUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      setJdText(text);
    } catch (err) {
      alert(err);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      setResumeText(text);
    } catch (err) {
      alert(err);
    }
  };

  const handleAnalyze = async () => {
    if (!jdText || !resumeText) {
      alert("Please upload both JD and Resume files.");
      return;
    }

    setLoading(true);
    const result = await analyzeJDandResume(jdText, resumeText);
    setFocusAreas(result.focusAreas || []);
    setSkillGaps(result.skillGaps || []);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen container my-10 mx-auto px-4">
      <div className="border-2 border-slate-300 rounded-xl w-full min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img height={45} width={45} src="/wired-lineal-966-privacy-policy-in-reveal.gif" alt="jd" />
          <h1 className="font-bold text-3xl">JD vs Resume Analyzer</h1>
        </div>
        <hr />

        <div className="flex items-center justify-center gap-10 flex-wrap">
          {/* Upload JD */}
          <div className="mb-6 mt-5 flex flex-col justify-center items-center">
            <span className="mb-2 font-bold">Upload Your JD</span>
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={handleJDUpload}
              className="border-2 text-center bg-blue-400 text-white border-gray-300 p-2 rounded-md cursor-pointer"
            />
          </div>

          {/* Upload Resume */}
          <div className="mb-6 mt-5 flex flex-col justify-center items-center">
            <span className="mb-2 font-bold">Upload Your Resume</span>
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={handleResumeUpload}
              className="border-2 text-center bg-blue-400 text-white border-gray-300 p-2 rounded-md cursor-pointer"
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center my-6">
          <button
            onClick={handleAnalyze}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Analyze JD & Resume
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-500 my-4">Analyzing...</p>}

        {/* Focus Areas */}
        {focusAreas.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-2">Focus Areas:</h2>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area, index) => (
                <button
                  key={index}
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md"
                  onClick={() => handleAddToChecklist(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Skill Gaps */}
        {skillGaps.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-2">Skill Gaps:</h2>
            <div className="flex flex-wrap gap-2">
              {skillGaps.map((gap, index) => (
                <button
                  key={index}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md"
                  onClick={() => handleAddToChecklist(gap)}
                >
                  {gap}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Prep Checklist */}
        {prepChecklist.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-xl">Your Prep Checklist:</h2>
            <ul className="list-disc pl-6">
              {prepChecklist.map((item, index) => (
                <li key={index} className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skillgap;
