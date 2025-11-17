import React, { useState, useEffect } from "react";
import close from "./assets/clos.svg";
import load from "./assets/load.gif";
import {
  handleUpdateGrade,
  handleGetSubjects,
} from "../../../controllers/teacherControllers/gradesController";
import SnackbarUtils from "../../../utils/snackbarUtils";

const EditRecord = ({ classItem, record, setEditRecord, triggerFetch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectId, setSubjectId] = useState(record?.subjectId?._id || "");
  const [name, setName] = useState(record?.name || "");
  const [category, setCategory] = useState(record?.category || "");
  const [totalScore, setTotalScore] = useState(record?.totalScore || "");
  const [score, setScore] = useState(record?.score || "");
  const [errors, setErrors] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const categories = ["TEST", "EXAM"];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const data = await handleGetSubjects();
        if (data) {
          setSubjects(data);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!subjectId) newErrors.subjectId = "Please select a subject.";
    if (!name.trim()) newErrors.name = "Assessment name is required.";
    if (!category) newErrors.category = "Category is required.";
    if (totalScore === "" || totalScore <= 0)
      newErrors.totalScore = "Total score must be a positive number.";
    if (score === "" || score < 0 || Number(score) > Number(totalScore))
      newErrors.score = `Score must be between 0 and ${totalScore}.`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    const recordData = {
      subjectId,
      name,
      category,
      totalScore: Number(totalScore),
      score: Number(score),
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      triggerFetch();
      setEditRecord(null);
      SnackbarUtils.success("Record updated successfully!");
    };

    const onError = (error) => {
      setIsSubmitting(false);
      SnackbarUtils.error(
        error.message || "Failed to update record. Please try again."
      );
    };

    await handleUpdateGrade(record._id, recordData, onSuccess, onError);
  };

  return (
    <div className="w-full h-full bg-[#1212128d] z-[99999] fixed top-0 left-0 p-6 flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-Outfit text-lg font-semibold text-[#272D37]">
              Edit Record for {record?.studentId?.name}
            </h3>
            <img
              src={close}
              alt="close"
              className="w-4 cursor-pointer"
              onClick={() => setEditRecord(null)}
            />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="font-Outfit text-sm font-medium text-[#272D37]">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full mt-2 p-2.5 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
                disabled={loadingSubjects}
              >
                <option value="">
                  {loadingSubjects ? "Loading subjects..." : "Select a subject"}
                </option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {errors.subjectId && (
                <p className="text-red-500 text-xs mt-1">{errors.subjectId}</p>
              )}
            </div>

            <div>
              <label className="font-Outfit text-sm font-medium text-[#272D37]">
                Assessment Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., First C.A. Test"
                className="w-full mt-2 p-2.5 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="font-Outfit text-sm font-medium text-[#272D37]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-2.5 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-Outfit text-sm font-medium text-[#272D37]">
                  Total Score
                </label>
                <input
                  type="number"
                  value={totalScore}
                  onChange={(e) => setTotalScore(e.target.value)}
                  placeholder="e.g., 100"
                  className="w-full mt-2 p-2.5 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
                />
                {errors.totalScore && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.totalScore}
                  </p>
                )}
              </div>
              <div>
                <label className="font-Outfit text-sm font-medium text-[#272D37]">
                  Student Score
                </label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g., 60"
                  className="w-full mt-2 p-2.5 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
                />
                {errors.score && (
                  <p className="text-red-500 text-xs mt-1">{errors.score}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => setEditRecord(null)}
              className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold flex justify-center items-center text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <img src={load} className="w-6" alt="loading" />
              ) : (
                "Update Record"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
