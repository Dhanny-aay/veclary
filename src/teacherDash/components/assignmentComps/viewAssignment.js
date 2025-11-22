import React, { useState, useEffect } from "react";
import { handleGetAssignmentById } from "../../../controllers/teacherControllers/assignmentController";
import close from "./assets/clos.svg";
import newwww from "./assets/newww.svg"; // Assuming this is your assignment icon
import {
  FileText,
  ListChecks,
  Check,
  X,
  Calendar,
  Clock,
  Tag,
  Book,
  Users,
  AlertCircle,
} from "lucide-react";

const ViewAssignment = ({ assignment, onBack }) => {
  const [fullAssignment, setFullAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!assignment?._id) return;
      setLoading(true);
      try {
        const response = await handleGetAssignmentById(assignment._id);
        if (response?.assignment) {
          setFullAssignment(response.assignment);
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch assignment details:", error);
        setError("Could not load assignment details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [assignment]);

  const renderQuestion = (q, index) => {
    const isMCQ = q.type === "multiple-choice" || q.type === "single-choice";
    const isEssay = q.type === "essay" || !q.type; // Default to essay if type is missing

    return (
      <div key={q._id || index} className="border p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-gray-800">Question {index + 1}</p>
          <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
            {isMCQ ? (
              <ListChecks className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            {q.type}
          </span>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{q.question}</p>

        {isMCQ && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-gray-500">Options:</p>
            {q.options?.map((opt, optIndex) => {
              // Handle both `correctAnswers` array and single `answer` string
              const isCorrect =
                q.correctAnswers?.includes(opt.text) || q.answer === opt.text;
              return (
                <div
                  key={opt._id || optIndex}
                  className={`flex items-center gap-3 p-2 rounded-md text-sm ${
                    isCorrect
                      ? "bg-green-50 text-green-800"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {isCorrect ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{opt.text}</span>
                </div>
              );
            })}
          </div>
        )}

        {isEssay && q.correctAnswers?.length > 0 && (
          <div className="pt-2">
            <p className="text-xs font-semibold text-gray-500">Model Answer:</p>
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md mt-1 whitespace-pre-wrap">
              {q.correctAnswers[0]}
            </p>
          </div>
        )}
      </div>
    );
  };

  const DetailItem = ({ label, value, className = "" }) => (
    <div className={className}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800 capitalize">{value}</p>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-[#1212128d] z-[99999] flex justify-center items-center font-Outfit">
      <div className="bg-white max-h-[90vh] rounded-[15px] w-full max-w-lg lg:max-w-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={newwww} alt="View Assignment" />
            <div>
              <p className="text-lg text-[#272D37] font-semibold font-Outfit">
                View Assignment
              </p>
              <p className="text-sm text-[#5F6D7E] font-normal font-Outfit capitalize">
                {fullAssignment?.title || "Loading..."}
              </p>
            </div>
          </div>
          <img
            src={close}
            onClick={onBack}
            className="w-4 h-4 cursor-pointer"
            alt="close"
          />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <p>Loading assignment details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : fullAssignment ? (
            <div className="space-y-6">
              {/* Metadata Section */}
              <div className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                <div className="flex justify-between items-start">
                  <DetailItem
                    label="Subject"
                    value={fullAssignment.subjectId?.name || "N/A"}
                  />
                  <DetailItem
                    label="Class"
                    value={
                      fullAssignment.classId?.name ||
                      fullAssignment.classId?._id
                    }
                    className="text-right"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <DetailItem
                    label="Scheduled"
                    value={formatDate(fullAssignment.scheduleTime)}
                  />
                  <DetailItem
                    label="Due"
                    value={formatDate(fullAssignment.dueTime)}
                    className="text-right"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <DetailItem label="Marks" value={fullAssignment.mark} />
                  <DetailItem
                    label="Status"
                    value={fullAssignment.status}
                    className="text-right"
                  />
                </div>
              </div>

              {/* Instructions */}
              {fullAssignment.instructions && (
                <div>
                  <h3 className="font-semibold text-gray-800">Instructions</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                    {fullAssignment.instructions}
                  </p>
                </div>
              )}

              {/* Questions */}
              {fullAssignment.questions?.length > 0 ? (
                <div className="space-y-4">
                  {fullAssignment.questions.map(renderQuestion)}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No questions found for this assignment.
                </p>
              )}
            </div>
          ) : (
            <p>No assignment details available.</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t mt-auto flex justify-end">
          <button
            onClick={onBack}
            className="py-2 px-6 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
