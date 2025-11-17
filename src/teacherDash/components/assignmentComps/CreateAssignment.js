import React, { useState } from "react";
import close from "./assets/clos.svg";
import newwww from "./assets/newww.svg";
import load from "./assets/load.gif";
import SnackbarUtils from "../../../utils/snackbarUtils";
import { handleCreateAssignment } from "../../../controllers/teacherControllers/assignmentController";
import { ListChecks, FileText } from "lucide-react";

const CreateAssignment = ({
  onCancel,
  onSuccess,
  teacherId,
  classes,
  subjects,
  schoolId,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assignment details state
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const [dueTime, setDueTime] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [mark, setMark] = useState("10");

  // Questions state
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(), // Unique key for react rendering
      type: type,
      question: "",
      correctAnswers: [],
      options: type === "multiple-choice" ? [{ text: "" }, { text: "" }] : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionFieldChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex].text = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length < 4) {
      newQuestions[qIndex].options.push({ text: "" });
      setQuestions(newQuestions);
    } else {
      SnackbarUtils.info("You can have a maximum of 4 options.");
    }
  };

  const removeOption = (qIndex, optIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length > 2) {
      newQuestions[qIndex].options.splice(optIndex, 1);
      setQuestions(newQuestions);
    } else {
      SnackbarUtils.info("You must have at least 2 options.");
    }
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const validateAndSave = async () => {
    // Basic validation
    if (questions.length === 0) {
      SnackbarUtils.error("Please add at least one question.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title,
      instructions,
      scheduleTime: scheduleTime ? new Date(scheduleTime).toUTCString() : null,
      dueTime: dueTime ? new Date(dueTime).toUTCString() : null,
      teacherId,
      subjectId,
      mark,
      type: "everybody",
      classId,
      schoolId,
      totalQuestions: String(questions.length),
      questions: questions.map(
        ({ question, correctAnswers, type, options }) => ({
          question,
          correctAnswers,
          type,
          options: type === "multiple-choice" ? options : [],
        })
      ),
    };

    await handleCreateAssignment(payload, onSuccess, (error) => {
      SnackbarUtils.error(error.message || "Failed to create assignment.");
    }).finally(() => setIsSubmitting(false));
  };

  const renderQuestionInputs = (q, index) => {
    switch (q.type) {
      case "multiple-choice":
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value)
                    }
                    className="font-Outfit text-sm w-full border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                  {q.options.length > 2 && (
                    <button
                      onClick={() => removeOption(index, optIndex)}
                      className="ml-2 text-red-500"
                    >
                      &#x2715;
                    </button>
                  )}
                </div>
              ))}
            </div>
            {q.options.length < 4 && (
              <button
                onClick={() => addOption(index)}
                className="text-sm text-blue-600 mt-2"
              >
                + Add Option
              </button>
            )}
            <select
              value={q.correctAnswers[0] || ""}
              onChange={(e) =>
                handleQuestionFieldChange(index, "correctAnswers", [
                  e.target.value,
                ])
              }
              className="font-Outfit text-sm w-full mt-4 border border-[#DAE0E6] p-2.5 rounded-[5px]"
            >
              <option value="">Select Correct Answer</option>
              {q.options
                .filter((opt) => opt.text.trim() !== "")
                .map((opt, i) => (
                  <option key={i} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
            </select>
          </>
        );
      case "essay":
        return (
          <textarea
            placeholder="Enter the model answer or keywords..."
            value={q.correctAnswers[0] || ""}
            onChange={(e) =>
              handleQuestionFieldChange(index, "correctAnswers", [
                e.target.value,
              ])
            }
            className="font-Outfit text-sm w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1212128d] z-[99999] flex justify-center items-center font-Outfit">
      <div className="bg-white max-h-[90vh] rounded-[15px] w-full max-w-lg lg:max-w-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={newwww} alt="" />
            <div>
              <p className="text-lg text-[#272D37] font-semibold font-Outfit">
                Create New Assignment
              </p>
              <p className="text-sm text-[#5F6D7E] font-normal font-Outfit">
                Step {step} of 2 - {step === 1 ? "Details" : "Questions"}
              </p>
            </div>
          </div>
          <img
            src={close}
            onClick={onCancel}
            className="w-4 h-4 cursor-pointer"
            alt="close"
          />
        </div>

        {/* Toolbar for Step 2 */}
        {step === 2 && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <p className="font-semibold text-sm text-gray-600 my-auto">
                Add Question:
              </p>
              <button
                onClick={() => addQuestion("multiple-choice")}
                className="flex items-center gap-2 py-2 px-4 font-Outfit rounded-lg text-[#0530A1] font-semibold border border-transparent text-sm hover:bg-blue-100 transition-colors"
              >
                <ListChecks className="w-5 h-5" />
                Multiple Choice
              </button>
              <button
                onClick={() => addQuestion("essay")}
                className="flex items-center gap-2 py-2 px-4 font-Outfit rounded-lg text-[#0530A1] font-semibold border border-transparent text-sm hover:bg-blue-100 transition-colors"
              >
                <FileText className="w-5 h-5" />
                Essay
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-medium">
                  Subject
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  >
                    <option value="">Select Subject</option>
                    {subjects?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Class
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  >
                    <option value="">Select Class</option>
                    {classes?.map((cls) => (
                      <option key={cls.classId} value={cls.classId}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="flex flex-col text-sm font-medium">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
              </label>
              <label className="flex flex-col text-sm font-medium">
                Instructions
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col text-sm font-medium">
                  Mark per Question
                  <input
                    type="number"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                    className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Schedule Time
                  <input
                    type="datetime-local"
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Due Time
                  <input
                    type="datetime-local"
                    onChange={(e) => setDueTime(e.target.value)}
                    className="font-Outfit text-sm font-normal w-full mt-1 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="border p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      Question {index + 1} ({q.type})
                    </p>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    placeholder="Enter your question..."
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionFieldChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    className="font-Outfit text-sm w-full border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                  {renderQuestionInputs(q, index)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t mt-auto">
          <div className="flex justify-end items-center gap-4">
            {/* Main Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={onCancel}
                className="py-3 px-6 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  disabled={!title || !classId || !subjectId || !dueTime}
                  className="py-3 px-6 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold text-base disabled:bg-gray-400"
                >
                  Continue
                </button>
              )}
              {step === 2 && (
                <>
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-6 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Back
                  </button>
                  <button
                    onClick={validateAndSave}
                    disabled={isSubmitting}
                    className="py-3 px-6 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold text-base flex items-center disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <img src={load} className="w-6" alt="loading" />
                    ) : (
                      "Save Assignment"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
