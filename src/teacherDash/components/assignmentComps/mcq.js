import close from "./assets/clos.svg";
import { useState } from "react";
import SnackbarUtils from "../../../utils/snackbarUtils";
import load from "./assets/load.gif";
import newwww from "./assets/newww.svg";
import { handleCreateAssignment } from "../../../controllers/teacherControllers/assignmentController";

const Mcq = ({ onCancel, onSuccess, teacherId, classes, subjects }) => {
  const [step, setStep] = useState(1); // 1 for details, 2 for questions
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [classId, setClassId] = useState("");
  const [dueTime, setDueTime] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [mark, setMark] = useState(10);

  // Questions state
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    } else {
      SnackbarUtils.error("You must have at least one question.");
    }
  };

  const handleSubjectChange = (e) => {
    const selectedId = e.target.value;
    const selected = subjects?.find((sub) => sub.id === selectedId);
    setSubjectId(selectedId);
    setSubjectName(selected ? selected.name : "");
  };

  const goToQuestions = () => setStep(2);
  const goToDetails = () => setStep(1);

  const handleSaveAssignment = async () => {
    const isAnyQuestionIncomplete = questions.some(
      (q) => !q.question || q.options.some((opt) => !opt) || !q.answer
    );
    if (isAnyQuestionIncomplete) {
      SnackbarUtils.error("Please fill out all fields for all questions.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      teacherId,
      classId,
      subjectId,
      title,
      instructions,
      mark: String(mark),
      totalQuestions: questions.length,
      type: "everybody",
      scheduleTime: scheduleTime.toUTCString(),
      dueTime: dueTime.toUTCString(),
      questions: questions.map(({ question, options, answer }) => ({
        question,
        options: options.map((opt) => ({ text: opt })),
        answer,
      })),
    };

    const onSuccess = () => {
      SnackbarUtils.success("Assignment created successfully!");
      onSuccess(); // Close the modal flow and trigger fetch
    };

    const onError = (error) => {
      SnackbarUtils.error(error.message || "Failed to create assignment.");
    };

    await handleCreateAssignment(payload, onSuccess, onError).finally(() =>
      setIsSubmitting(false)
    );
  };

  return (
    <>
      {step === 1 && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className=" w-full  flex justify-center items-center">
            <div className="ml-[20%] bg-white max-h-[90vh] rounded-[15px] w-[450px] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <span className="w-full flex items-center justify-between">
                  <img src={newwww} alt="" />
                  <img src={close} onClick={onCancel} className=" w-4" alt="" />
                </span>
                <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                  Add new Assignment
                </p>
                <p className="text-base text-[#5F6D7E] font-normal mt-2 font-Outfit">
                  MCQ Assignment - Details
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto">
                <div className="w-full flex flex-row justify-between items-center">
                  <label
                    htmlFor=""
                    className="w-[49%] flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Subject
                    <select
                      value={subjectId}
                      onChange={handleSubjectChange}
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    >
                      <option value="">Select Subject</option>
                      {subjects?.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label
                    htmlFor=""
                    className="w-[49%] flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Class
                    <select
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
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
                <label
                  htmlFor=""
                  className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Title
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter assignment title"
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>
                <label
                  htmlFor=""
                  className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Instructions
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Enter assignment instructions"
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>

                <div className="w-full grid gap-4">
                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Mark
                    <input
                      type="number"
                      value={mark}
                      onChange={(e) => setMark(e.target.value)}
                      placeholder="e.g., 10"
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    />
                  </label>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Due Time
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        setDueTime(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Schedule Time
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        setScheduleTime(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t">
                <div className="w-full grid grid-cols-2 gap-4">
                  <button
                    onClick={onCancel}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={goToQuestions}
                    disabled={
                      !title ||
                      !classId ||
                      !subjectId ||
                      !dueTime ||
                      !scheduleTime
                    }
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base disabled:bg-gray-400"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className=" w-full  flex justify-center items-center">
            <div className="ml-[20%] bg-white max-h-[90vh] rounded-[15px] w-[700px] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <span className="w-full flex items-center justify-between">
                  <img src={newwww} alt="" />
                  <img src={close} onClick={onCancel} className=" w-4" alt="" />
                </span>
                <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                  Add new Assignment
                </p>
                <p className="text-base text-[#5F6D7E] font-normal mt-2 font-Outfit">
                  MCQ Assignment - Questions
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto">
                {questions.map((q, index) => (
                  <div key={index} className="my-4 border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold font-Outfit">
                        Question {index + 1}
                      </p>
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      placeholder="Enter your question"
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(index, "question", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {q.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          placeholder={`Option ${String.fromCharCode(
                            65 + optIndex
                          )}`}
                          className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(index, optIndex, e.target.value)
                          }
                        />
                      ))}
                    </div>
                    <select
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-4 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    >
                      <option value="">Select Correct Answer</option>
                      {q.options
                        .filter((opt) => opt.trim() !== "")
                        .map((opt, optIndex) => (
                          <option key={optIndex} value={opt}>
                            {`Option ${String.fromCharCode(
                              65 + optIndex
                            )}: ${opt}`}
                          </option>
                        ))}
                    </select>
                  </div>
                ))}

                <button
                  onClick={addQuestion}
                  className="w-full py-3 font-Outfit rounded-md text-[#0530A1] font-semibold border border-[#0530A1] text-base"
                >
                  Add Another Question
                </button>
              </div>

              {/* Footer */}
              <div className="p-6 border-t">
                <div className="w-full grid grid-cols-2 gap-4">
                  <button
                    onClick={goToDetails}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSaveAssignment}
                    disabled={isSubmitting}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base flex justify-center items-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <img src={load} className="w-6" alt="loading" />
                    ) : (
                      "Save Assignment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mcq;
