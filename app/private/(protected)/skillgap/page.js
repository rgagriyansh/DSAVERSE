"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFileUpload, FaClipboardList, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

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
  const [jdFileName, setJdFileName] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");

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
      setJdFileName(file.name);
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
      setResumeFileName(file.name);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
                <div className="relative flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <FaClipboardList className="text-3xl text-white" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">JD vs Resume Analyzer</h1>
                <p className="text-blue-100">Identify skill gaps and focus areas</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* JD Upload */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-200"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FaFileUpload className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Job Description</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload your job description file (.txt, .pdf, .docx)</p>
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={handleJDUpload}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                      Choose File
                    </div>
                  </label>
                  {jdFileName && (
                    <p className="mt-2 text-sm text-gray-600">{jdFileName}</p>
                  )}
                </div>
              </motion.div>

              {/* Resume Upload */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-purple-400 transition-colors duration-200"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <FaFileUpload className="text-2xl text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Resume</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload your resume file (.txt, .pdf, .docx)</p>
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                      Choose File
                    </div>
                  </label>
                  {resumeFileName && (
                    <p className="mt-2 text-sm text-gray-600">{resumeFileName}</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Analyze Button */}
            <div className="text-center mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading || !jdText || !resumeText}
                className={`px-8 py-3 rounded-xl font-medium text-white shadow-lg transition-all duration-200 ${
                  loading || !jdText || !resumeText
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Analyze JD & Resume</span>
                    <BsArrowRight />
                  </div>
                )}
              </motion.button>
            </div>

            {/* Results Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Focus Areas */}
              {focusAreas.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-xl text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Focus Areas</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map((area, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToChecklist(area)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                      >
                        {area}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Skill Gaps */}
              {skillGaps.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <FaExclamationTriangle className="text-xl text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Skill Gaps</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGaps.map((gap, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToChecklist(gap)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm"
                      >
                        {gap}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Prep Checklist */}
            {prepChecklist.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaClipboardList className="text-xl text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Your Prep Checklist</h2>
                </div>
                <ul className="space-y-3">
                  {prepChecklist.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-sm text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skillgap;
