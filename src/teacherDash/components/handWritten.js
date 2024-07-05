import close from "./assets/clos.svg";
import { DatePicker } from "rsuite";
import newwww from "./assets/newww.svg";
import { useState } from "react";
import arr from "./assets/iconArr.svg";

const Handwritten = ({ onCancel }) => {
  const [scheduleAssignment, setScheduleAssignment] = useState(true);
  const [inputAssignments, setInputAssignment] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
  });

  const HandleInputHwQuestions = () => {
    setScheduleAssignment(false);
    setInputAssignment(true);
  };
  const HandleCancelHwQuestions = () => {
    setScheduleAssignment(true);
    setInputAssignment(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: value,
    });
  };

  const handleAddNewQuestion = () => {
    const updatedQuestions = [...questions];
    if (currentQuestionIndex < questions.length) {
      updatedQuestions[currentQuestionIndex] = currentQuestion;
    } else {
      updatedQuestions.push(currentQuestion);
    }

    setQuestions(updatedQuestions);
    setCurrentQuestion({
      question: "",
    });
    setCurrentQuestionIndex(updatedQuestions.length);
  };

  const handleViewPreviousQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(questions[index]);
      setCurrentQuestionIndex(index);
    }
  };

  const handleQuestionNumberChange = (e) => {
    const index = parseInt(e.target.value, 10) - 1;
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(questions[index]);
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <>
      {scheduleAssignment && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className=" w-full  flex justify-center items-center">
            <div className="ml-[20%] bg-[#FFFFFF] h-[420px] p-6 rounded-[15px] w-[400px]">
              <div className=" w-full h-full  overflow-y-auto bg-white ">
                <span className=" w-full flex items-center justify-between">
                  <img src={newwww} alt="" />
                  <img
                    src={close}
                    onClick={() => {
                      setScheduleAssignment(false);
                    }}
                    className=" w-4"
                    alt=""
                  />
                </span>
                <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                  Add new Assignment
                </p>
                <p className=" text-base text-[#5F6D7E] font-normal mt-2 font-Outfit">
                  Handwritten
                </p>
                <div className=" w-full flex flex-row justify-between items-center">
                  <label
                    htmlFor=""
                    className=" w-[49%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Subject
                    <input
                      type="text"
                      name=""
                      placeholder="Biology"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                  <label
                    htmlFor=""
                    className=" w-[49%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Class
                    <input
                      type="text"
                      name=""
                      placeholder="Jss 1"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                </div>
                <label
                  htmlFor=""
                  className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Title
                  <input
                    type="text"
                    name=""
                    placeholder="Enter assignment title"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
                <label
                  htmlFor=""
                  className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Instructions
                  <textarea
                    type="text"
                    name=""
                    placeholder="Enter assignment instructions"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>

                <div className=" w-full grid grid-cols-2 gap-4">
                  <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Schedule time
                    <DatePicker
                      className=" z-[99999] font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                      id=""
                    />
                  </label>
                  <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Schedule date
                    <DatePicker
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                      id=""
                    />
                  </label>
                </div>

                <div className="w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={onCancel}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={HandleInputHwQuestions}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {inputAssignments && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className=" w-full  flex justify-center items-center">
            <div className="ml-[20%] bg-[#FFFFFF] h-[450px] p-6 rounded-[15px] w-[700px]">
              <div className=" w-full h-full  overflow-y-auto bg-white ">
                <span className=" w-full flex items-center justify-between">
                  <img src={newwww} alt="" />
                  <img
                    src={close}
                    onClick={() => {
                      setInputAssignment(false);
                    }}
                    className=" w-4"
                    alt=""
                  />
                </span>
                <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                  Add new Assignment
                </p>
                <p className=" text-base text-[#5F6D7E] font-normal mt-2 font-Outfit">
                  Handwritten
                </p>
                <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                  Question
                  <textarea
                    name="question"
                    placeholder="Enter assignment instructions"
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    value={currentQuestion.question}
                    onChange={handleInputChange}
                  />
                </label>

                <div className="w-full flex items-center justify-center">
                  {questions.length > 0 && (
                    <button
                      onClick={() =>
                        handleViewPreviousQuestion(currentQuestionIndex - 1)
                      }
                      className="py-3 w-1/3 border border-[#DAE0E6] rounded-l-[25px] mt-6 flex justify-center items-center space-x-3"
                      disabled={currentQuestionIndex === 0}
                    >
                      <img src={arr} alt="" className="rotate-180" />
                      <p className="text-[#5F6D7E] font-Outfit text-sm font-medium">
                        Prev. Question
                      </p>
                    </button>
                  )}
                  {questions.length > 0 && (
                    <div className="w-1/3 border-y border-[#DAE0E6] py-3 flex items-center px-3 mt-6 justify-center">
                      <p className="text-[#5F6D7E] font-Outfit text-sm font-medium mr-1">
                        Question
                      </p>
                      <span className="flex items-center space-x-1 text-[#5F6D7E] font-Outfit text-sm font-medium">
                        <input
                          type="number"
                          value={currentQuestionIndex + 1}
                          onChange={handleQuestionNumberChange}
                          className="w-10 h-5 rounded-md text-center bg-[#f8f8f8]"
                          min="1"
                          max={questions.length}
                        />
                        <span>Of</span>
                        <span>{questions.length}</span>
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleAddNewQuestion}
                    className={`py-3 ${
                      questions.length > 0 ? "w-1/3" : "w-full"
                    } border border-[#DAE0E6] ${
                      questions.length > 0
                        ? "rounded-r-[25px]"
                        : "rounded-[25px]"
                    } mt-6 flex justify-center items-center space-x-3`}
                  >
                    <p className="text-[#5F6D7E] font-Outfit text-sm font-medium">
                      Add New Question
                    </p>
                    <img src={arr} alt="" />
                  </button>
                </div>

                <div className="w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={HandleCancelHwQuestions}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base">
                    Save
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

export default Handwritten;
